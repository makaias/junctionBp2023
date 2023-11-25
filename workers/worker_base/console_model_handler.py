import logging
import uuid
from typing import Union

from .model_handler import ModelHandler


class ConsoleModelHandler(ModelHandler):
    def __init__(self):
        super().__init__()
        self.__messages = None
        self.__finalized = False

    def send_text(self, text):
        logging.info(f"Sending text {text}")

    def end_message(self):
        logging.info(f"Ending message")
        self.is_finalized = True

    def messages(self):
        if self.__messages is None:
            logging.info("No messages found! Asking for message...")
            self.__messages = [
                {"role": "user", "content": input(
                    "Please type an input prompt: ")}
            ]
        return self.__messages

    def game_details(self) -> dict:
        # return self.__execution["request"]["details"]
        return {"game_type": "ROBERT", "hp": 100}

    def send_damage(self, damage: int) -> None:
        logging.info(f"Sending damage {damage} for execution")

    def send_end_game(self):
        logging.info(f"Sending end game for execution ")
        self.is_finalized = True
