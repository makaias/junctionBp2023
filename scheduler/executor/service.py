from uuid import uuid4

import eventlet
import socketio
import logging
from executor import Executor
from socket_wrapper import SocketWrapper


class ExecutorService:
    def __init__(self, executionQueue, port=5001):
        self.executionQueue = executionQueue
        self.port = port
        self.sio = socketio.Server()
        self.app = socketio.WSGIApp(self.sio)
        self.executors = {}

    def __setup_sio(self):
        sio = self.sio
        sio.on("connect", self.__sio_connect)

    def __sio_connect(self, sid):
        executor_sio = SocketWrapper(self.sio, sid)
        executor_id = str(uuid4())
        executor = Executor(executor_sio, self.executionQueue)
        self.executors[executor_id] = executor
        logging.info("executor connected {executor_id}")

    def __sio_finalize(self, sid, exid):
        executor = self.get_executor_for_execution(exid)
        if not executor:
            logging.error(f"Unable to finalize execution {exid}")
            return

        executor.finalize(exid)

    def start(self):
        def start_app(app, port):
            eventlet.wsgi.server(eventlet.listen(("", port)), app)
        # Start threads
        app_thread = eventlet.spawn(start_app, self.app, 5001)
        scheduler_thread = eventlet.spawn(self.run_scheduler)
        # Wait for threads to finish
        app_thread.wait()
        scheduler_thread.wait()

    def get_available_executor(self):
        for executor in self.executors.values():
            if executor.is_available():
                return executor
        return None

    def get_executor_for_execution(self, execution):
        for executor in self.executors.values():
            if executor.has_execution(execution):
                return executor
        return None

    def run_scheduler(self):
        while True:
            execution = self.executionQueue.get()
            executor = self.get_available_executor()
            while not executor:
                eventlet.sleep(0.1)
                executor = self.get_available_executor()

            executor.execute(execution)


def routes(sio):
    @sio.on("connect")
    def connect(sid, environ):
        print(f"Connecting executor {sid}")
        executor_sio = SocketWrapper(sio, sid)
        executor = Executor(executor_sio, taskQueue)
        executors[sid] = executor
        executor.start()

    @sio.on("disconnect")
    def disconnect(sid):
        print(f"Disconnecting executor {sid}")
        executor = executors[sid]
        if not executor:
            print(
                f"unable to handle disconnection, because there is no registered executor for it {sid}"
            )
            return

        execution = executor.execution
        user_sio = executor.user_sio

        executor.stop()
        executors[sid] = None

        if execution and user_sio:
            try:
                execution["status"] = "failed"
                execution["progress"] = None
                user_sio.emit("execution_updated", execution)
                user_sio.emit(
                    "text_received", {"id": execution["id"], "text": "<asset:error:>"}
                )
                user_sio.emit("finalize", execution)
            except:
                print("Unable to notify user about failed execution")
                pass

    @sio.on("*")
    def handle_messages(event, sid, *args):
        executor = executors[sid]
        if not executor:
            print(
                f"unable to handle message, because there is no registered executor for it {event} {args}"
            )
            return
        executor.recieve(event, *args)


def request_execution(messages, user_sio):
    execution_id = str(uuid4())
    execution = {
        "id": execution_id,
        "request": messages,
        "status": "requested",
        "progress": -1,
    }
    taskQueue.put({"execution": execution, "user_sio": user_sio})
    user_sio.emit("execution_created", execution)
