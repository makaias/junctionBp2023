import logging
import os
from queue import Queue
from uuid import uuid4

import eventlet
import socketio
from socket_wrapper import SocketWrapper

from .execution import Execution
from .executor import Executor


class ExecutorService:
    def __init__(self, port=5001):
        self.executionQueue = Queue()
        self.port = port
        self.sio = socketio.Server(cors_allowed_origins="*", async_mode="eventlet")
        self.app = socketio.WSGIApp(self.sio)
        self.executors = {}
        self.__setup_sio()

    def __setup_sio(self):
        sio = self.sio
        sio.on("connect", self.__sio_connect)
        sio.on("disconnect", self.__sio_disconnect)
        sio.on("end_message", self.__sio_end_message)
        sio.on("register", self.__sio_register)
        sio.on("*", self.__sio_handle_messages)

    def __sio_connect(self, sid, *args):
        logging.info(f"Executor connected {sid}, have {len(self.executors)} executors")

    def __sio_register(self, sid, data):
        executor_sio = SocketWrapper(self.sio, sid)
        executor = Executor(
            sid, executor_sio, parallelism=data["parallelism"], type=data["type"]
        )
        self.executors[sid] = executor
        logging.info(f"Executor registered {sid}, have {len(self.executors)} executors")

    def __sio_disconnect(self, sid):
        try:
            logging.info(f"Executor disconnecting {sid}")
            executor = self.executors[sid]

            for execution in list(executor.executions.values()):
                execution.sio.emit("error", execution.id)
            self.__sio_finalize(sid, {"id": execution.id})
        except:
            logging.error(f"Unable to handle disconnection {sid}")
        self.executors.pop(sid)
        logging.info(
            f"Executor disconnected {sid}, have {len(self.executors)} executors"
        )

    def __sio_handle_messages(self, event, sid, data, *args):
        exid = data["id"]
        logging.info(f"Recieved message from executor({sid}) {event} {data}")
        executor = self.__get_executor_for_execution(exid)
        if not executor:
            logging.error(f"Unable to handle message {event} {args}")
            return
        execution = executor.executions[exid]
        logging.info(f"Sending message for execution({exid}) {event} {data}")
        if event == "send_text":
            execution.sio.emit("text_received", data)
        elif event == "send_debug_thought":
            self.user_sio.emit(
                "debug_thought_received",
                {"id": data["id"], "thought": data["thought"]},
            )
        elif event == "send_asset":
            type = data["type"]
            asset = data["asset"]
            id = data["id"]

            # Saving the asset
            filename = f".temp/outfiles/{id}.{type}"
            os.makedirs(os.path.dirname(filename), exist_ok=True)
            f = open(filename, "w")
            f.write(asset)
            f.close()

            self.user_sio.emit(
                "asset_received",
                {"id": data["id"], "type": type, "filename": f"{id}.{type}"},
            )

        elif event == "update_status_message":
            execution.status = data["status"]
            self.user_sio.emit("execution_updated", self.execution.data())

        elif event == "update_status_progress":
            execution.progress = data["progress"]
            self.user_sio.emit("execution_updated", self.execution.data())
        else:
            execution.sio.emit(event, data)

    def __sio_end_message(self, sid, data):
        exid = data["id"]
        logging.info(f"Finalizing execution {exid}")
        executor = self.__get_executor_for_execution(exid)
        if not executor:
            logging.error(f"Unable to finalize execution {exid}")
            return

        execution = executor.executions[exid]
        execution.progress = None
        execution.status = "finished"
        execution.sio.emit("execution_updated", execution.data())
        execution.sio.emit("end_message", exid)
        executor.finalize(exid)

    def __get_available_executor(self):
        for executor in self.executors.values():
            if executor.is_available():
                return executor
        return None

    def __get_executor_for_execution(self, execution):
        for executor in self.executors.values():
            if executor.has_execution(execution):
                return executor
        return None

    def request_execution(self, user_sio, request):
        execution_id = str(uuid4())
        logging.info(f"Requesting execution({execution_id}) {request}")
        request["id"] = execution_id
        execution = Execution(execution_id, user_sio, request)
        self.executionQueue.put(execution)
        user_sio.emit("execution_created", execution.data())
        user_sio.emit("execution_updated", execution.data())

    def __run_scheduler(self):
        while True:
            execution = self.executionQueue.get()
            executor = self.__get_available_executor()
            while not executor:
                eventlet.sleep(0.1)
                executor = self.__get_available_executor()

            # Start execution
            executor.execute(execution)

    def start(self):
        def start_app(app, port):
            eventlet.wsgi.server(eventlet.listen(("", port)), app, log=logging)

        # Start threads
        app_thread = eventlet.spawn(start_app, self.app, self.port)
        scheduler_thread = eventlet.spawn(self.__run_scheduler)

        app_thread.wait()
        scheduler_thread.wait()
