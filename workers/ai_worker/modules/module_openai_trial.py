from .module_base import BaseModule
from openai import OpenAI
import logging
from dotenv import load_dotenv

PROMPT = [
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."}
]


class AIModule(BaseModule):
    def __init__(self, 
        modelName: str = "gpt-3.5-turbo"):
        super().__init__()
        self._modelName = modelName

    def execute(self, handler):
        load_dotenv()
        client = OpenAI()
        message = handler.messages()
        PROMPT.append(message)
        logging.info(f"Feeding model {self._modelName} input prompt: {PROMPT}")
        completion = client.chat.completions.create(
        model=self._modelName,
        messages=PROMPT
        )

        logging.info(f"Response returned: {completion.choices[0].message}")

        return completion
