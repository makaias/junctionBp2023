import socketio
from executor_service import request_execution
from socket_wrapper import SocketWrapper

STATIC_FILES = {
    "": "./frontend/dist/index.html",
    "/": "./frontend/dist/index.html",
    "/assets": "./frontend/dist/assets",
    "/vite.svg": "./frontend/dist/vite.svg",
    "/icon.ico": "./frontend/dist/icon.ico",
    "/manifest.json": "./frontend/dist/manifest.json",
    "/logo.png": "./frontend/dist/logo.png",
    "/outfiles": ".temp/outfiles",
}


def routes(sio):
    @sio.on("connect")
    def connect(sid, environ):
        print(f"User {sid} connected")

    @sio.event
    def execute(sid, messages):
        print(f"User requested execution {messages} ")
        user_sio = SocketWrapper(sio, sid)
        request_execution(messages, user_sio)

    pass


sio = socketio.Server(cors_allowed_origins="*", async_mode="eventlet")
app = socketio.WSGIApp(sio, static_files=STATIC_FILES)

routes(sio)
