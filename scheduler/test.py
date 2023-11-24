import socketio

sio = socketio.Client()


@sio.on("connect")
def connect():
    sio.emit(
        "execute",
        [
            {"role": "system", "content": "Hello"},
            {"role": "user", "content": "World"},
        ],
    )



@sio.on("*")
def handle_messages(event, *args):
    print(f"{event} {args}")

    if event == "finalize":
        sio.disconnect()
        exit(0)


sio.connect("http://localhost:5000")
sio.wait()
