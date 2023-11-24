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
        logging.info(f"Sending text {self.__execution.id} {text}")
        self.__sio.emit("send_text", self.__execution.id, text)

    def send_asset(self, type: str, asset: Any):
        id = str(uuid.uuid4())
        filename = f"{id}.{type}"
        logging.info(f"Sending {filename} {asset}")
        self.__sio.emit("send_asset", {"id": id, "type": type, "asset": asset})
        return f"<asset:{type}:{id}.{type}>"

    def finalize(self):
        logging.info(f"Finalizing {self.__execution.id}")
        time.sleep(0.5)
        self.__sio.emit("finalize", self.__execution.id)
        self.is_finalized = True

    def messages(self) -> List[str]:
        return self.__execution["request"]["messages"]

    def update_status_message(self, status: str) -> None:
        logging.info(f"Updating status message {self.__execution.id} {status}")
        self.__sio.emit("update_status_message", self.__execution.id, status)

    def update_progress_bar(self, progress: Union[int, None]) -> None:
        logging.info(f"Updating status progress {self.__execution.id} {progress}")
        self.__sio.emit("update_status_progress", self.__execution.id, progress)

    def send_debug_thoughts(self, thought: str) -> None:
        logging.info(f"Sending debug thought {self.__execution.id} {thought}")
        self.__sio.emit("send_debug_thought", self.__execution.id, thought)
        pass
