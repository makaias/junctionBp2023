import logging
import time
import uuid
from typing import Any, List, Union

from .model_handler import ModelHandler


class SocketModelHandler(ModelHandler):
    def __init__(self, execuiton, sio):
        super().__init__()
        self.__execution = execuiton
        self.__sio = sio
        self.is_finalized = False

    def send_text(self, text):
        exid = self.__execution["id"]
        logging.info(f"Sending text {exid} {text}")
        self.__sio.emit("send_text", {"id": exid, "text": text})

    def send_asset(self, type: str, asset: Any):
        id = str(uuid.uuid4())
        filename = f"{id}.{type}"
        logging.info(f"Sending {filename} {asset}")
        self.__sio.emit("send_asset", {"id": id, "type": type, "asset": asset})
        return f"<asset:{type}:{id}.{type}>"

    def finalize(self):
        exid = self.__execution["id"]
        logging.info(f"Finalizing {exid}")
        time.sleep(0.5)
        self.__sio.emit("finalize", {"id": self.__execution["id"]})
        self.is_finalized = True

    def messages(self) -> List[str]:
        return self.__execution["request"]["messages"]

    def update_status_message(self, status: str) -> None:
        exid = self.__execution["id"]
        logging.info(f"Updating status message {exid} {status}")
        self.__sio.emit(
            "update_status_message", {"id": self.__execution["id"], "status": status}
        )

    def update_progress_bar(self, progress: Union[int, None]) -> None:
        exid = self.__execution["id"]
        logging.info(f"Updating status progress {exid} {progress}")
        self.__sio.emit(
            "update_status_progress",
            {"id": self.__execution["id"], "progress": progress},
        )

    def send_debug_thoughts(self, thought: str) -> None:
        exid = self.__execution["id"]
        logging.info(f"Sending debug thought {exid} {thought}")
        self.__sio.emit(
            "send_debug_thought", {"id": self.__execution["id"], "thought": thought}
        )
        pass
