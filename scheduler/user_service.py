import logging

import eventlet
import socketio
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


class UserService:
    def __init__(self, executor_service, port=5000):
        self.port = port
        self.executor_service = executor_service
        self.sio = socketio.Server(cors_allowed_origins="*", async_mode="eventlet")
        self.app = socketio.WSGIApp(self.sio, static_files=STATIC_FILES)
        self.__setup_sio()

    def __setup_sio(self):
        sio = self.sio
        sio.on("connect", self.__sio_connect)
        sio.on("disconnect", self.__sio_disconnect)
        sio.on("execute", self.__sio_execute)

    def __sio_connect(self, sid, *args):
        logging.info(f"User {sid} connected")

    def __sio_disconnect(self, sid):
        logging.info(f"User {sid} disconnected")

    def __sio_execute(self, sid, request):
        logging.info(f"Recieved execution request from user({sid}) request {request}")
        user_sio = SocketWrapper(self.sio, sid)
        self.executor_service.request_execution(user_sio, request)

    def start(self):
        def start_app(app, port):
            eventlet.wsgi.server(eventlet.listen(("", port)), app, log=logging)

        # Start threads
        app_thread = eventlet.spawn(start_app, self.app, self.port)
        app_thread.wait()
