
import socketio

# socket client
sio = socketio.Client()

sio.event


@sio.event
def connect():
    print("connected to server")
    sio.emit("execute", {
        "messages": [],
        "details": {
            "game": "ROBERT",
            "hp": 100
        }
    })


@sio.event
def disconnect():
    print("disconnected from server")


@sio.event
def end_message(data):
    print(f"Received end message {data}")
    exit(0)


@sio.on("*")
def handle_message(event, data):
    print(f"Received event {event} with data {data}")

sio.connect("http://localhost:5000")
sio.wait()
