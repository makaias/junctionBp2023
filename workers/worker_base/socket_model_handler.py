import logging
import time
from typing import List

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

    def end_message(self):
        exid = self.__execution["id"]
        logging.info(f"Ending message {exid}")
        time.sleep(0.5)
        self.__sio.emit("end_message", {"id": self.__execution["id"]})
        self.is_finalized = True

    def messages(self) -> List[str]:
        return self.__execution["request"]["messages"]

    def game_details(self) -> dict:
        return self.__execution["request"]["details"]

    def send_damage(self, damage: int) -> None:
        logging.info(f"Sending damage {damage} for execution {self.__execution['id']}")
        self.__sio.emit("send_damage", {"id": self.__execution["id"], "damage": damage})

    def send_end_game(self):
        logging.info(f"Sending end game for execution {self.__execution['id']}")
        self.__sio.emit("send_end_game", {"id": self.__execution["id"]})
        self.is_finalized = True
