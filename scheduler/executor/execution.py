class Execution:
    def __init__(self, id, sio, request):
        self.id = id
        self.sio = sio
        self.request = request
        self.status = "created"
        self.progress = -1

    def data(self):
        return {
            "id": self.id,
            "request": self.request,
            "status": self.status,
            "progress": self.progress,
        }
