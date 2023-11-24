from queue import Queue
from uuid import uuid4

import socketio
from executor import Executor
from socket_wrapper import SocketWrapper

STATIC_FILES = {
    "/": "../frontend/build/index.html",
    "/static": "../frontend/build/static",
}

taskQueue = Queue()

executors = {}


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


sio = socketio.Server()
app = socketio.WSGIApp(sio)
routes(sio)
