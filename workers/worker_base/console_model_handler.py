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
        logging.info(f"Frontend message received: |{text}|")

    def send_asset(self, type, asset) -> str:
        id = str(uuid.uuid4())
        filename = f"{id}.{type}"
        print(f"Sending {filename} {asset}")
        return f"<asset:{type}:{id}.{type}>"

    def finalize(self):
        self.__finalized = True
        print("Final output sent")

    def messages(self):
        if self.__messages is None:
            logging.info("No messages found! Asking for message...")
            self.__messages = [
                {"role": "user", "content": input("Please type an input prompt: ")}
            ]
        logging.info(f"Current messages: {self.__messages}")
        return self.__messages

    def update_status_message(self, status: str) -> None:
        print(status)
        pass

    def update_progress_bar(self, progress: Union[int, None]) -> None:
        print(progress)
        pass

    def send_debug_thoughts(self, thought: str) -> None:
        print(thought)
        pass
