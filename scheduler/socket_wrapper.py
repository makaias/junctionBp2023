class SocketWrapper:
    def __init__(self, sio, sid):
        self.__sio = sio
        self.sid = sid

    def emit(self, event, data):
        self.__sio.emit(event, data, room=self.sid)
