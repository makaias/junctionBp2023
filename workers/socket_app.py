import logging
import os
import sys
import traceback

import socketio
import time
from worker_base import SocketModelHandler

time.sleep(1)

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)


module_name = sys.argv[1] if len(sys.argv) > 1 else "demo_worker.orchestrator"
bff_url = (
    sys.argv[2]
    if len(sys.argv) > 2
    else os.environ.get("SCHEDULER_URL", "http://localhost:5001")
)

module_import = __import__(module_name, fromlist=["Orchestrator"])

logging.info("Loading orchestrator")
orchestrator = module_import.Orchestrator()

logging.info("Starting app in socket mode")
sio = socketio.Client()


@sio.event
def execute(data):
    logging.info(f"execution requested {data}")
    handler = SocketModelHandler(data, sio)
    try:
        orchestrator.execute(handler)
    except Exception as e:
        logging.info(f"Error occured s{type(e)}")
        traceback.logging.info_exc()
        handler.send_text("<asset:error:>")
        handler.finalize()
    finally:
        if not handler.is_finalized:
            handler.finalize()


@sio.event
def connect():
    logging.info("Connected to executor service")
    sio.emit("register", {"type": module_name, "parallelism": orchestrator.parallelism})


@sio.on("*")
def handle_messages(event, *args):
    logging.info(f"Recieved message {event} {args}")


@sio.event
def disconnect():
    logging.info("Disconnected from executor service")


sio.connect(bff_url)
# sio.connect("https://ecogen-botnet.apisc.host/")
sio.wait()
