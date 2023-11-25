import logging
import uuid
from typing import Union

from .model_handler import ModelHandler


class ConsoleModelHandler(ModelHandler):
    def __init__(self):
        super().__init__()
        self.__messages = []
        self.__finalized = False
        self.turns_remaining = 10

    def send_text(self, text):
        logging.info(f"Sending text {text}")

    def end_message(self):
        logging.info(f"Ending message")
        self.is_finalized = True
        self.turns_remaining -= 1

    def messages(self):
        return self.__messages

    def game_details(self) -> dict:
        # return self.__execution["request"]["details"]
        return {"game_type": "ROBERT", "hp": 100, "turns_remaining": self.turns_remaining}

    def send_damage(self, damage: int) -> None:
        logging.info(f"Sending damage {damage} for execution")

    def send_end_game(self):
        logging.info(f"Sending end game for execution ")
        self.is_finalized = True

    def add_message(self):
        logging.info("Asking for message")
        self.__messages.append(
            {"role": "user", "content": input(
                "Type your message here: ")}
        )
