import logging
import sys
import traceback

import socketio
from worker_base import SocketModelHandler

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)


module_name = sys.argv[1] if len(sys.argv) > 1 else "demo_worker.orchestrator"
bff_url = sys.argv[2] if len(sys.argv) > 2 else "http://localhost:5001"

module_import = __import__(module_name, fromlist=["Orchestrator"])

print("Loading orchestrator")
orchestrator = module_import.Orchestrator()

print("Starting app in socket mode")
sio = socketio.Client()


@sio.event
def execute(data):
    print(f"execution requested {data}")
    handler = SocketModelHandler(data, sio)
    try:
        orchestrator.execute(handler)
    except Exception as e:
        print(f"Error occured s{type(e)}")
        traceback.print_exc()
        handler.send_text("<asset:error:>")
        handler.finalize()
    finally:
        if not handler.is_finalized:
            handler.finalize()


@sio.event
def connect():
    print("Connected to executor service")


@sio.on("*")
def handle_messages(event, *args):
    print(f"Recieved message {event} {args}")


@sio.event
def disconnect():
    print("Disconnected from executor service")


sio.connect(bff_url)
# sio.connect("https://ecogen-botnet.apisc.host/")
sio.wait()
