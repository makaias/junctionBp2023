import logging
from llama_cpp import Llama
from openai import OpenAI
from dotenv import load_dotenv
import copy

from .module_base import BaseModule
from ..custom_config import *


class AIModule(BaseModule):
    def __init__(self,
                 modelName: str,
                 handler: any):
        super().__init__(handler)
        self.__modelName = modelName
        self.stream = True
        self.temperature = 0.2
        self.__modelHandler = handler

        # Set up OpenAI API
        if self.__modelName in OPENAI_MODELS:
            load_dotenv()
            client = OpenAI()
            self.__textGenerator = client.chat.completions.create

        # Set up local model:
        elif self.__modelName in LOCAL_MODELS:
            self.context = 4096
            self.n_gpu_layers = 128
            self.__model = Llama(
                model_path=MODELS[modelName],
                n_gpu_layers=self.n_gpu_layers,
                n_ctx=self.context)
            self.__textGenerator = self.__model.create_chat_completion

        else:
            raise ValueError(
                f"Model name {self.__modelName} is not supported yet.")

    def execute(self, skip_system_prompt=False, score=0):
        if not skip_system_prompt:
            # Insert system prompt at beginnging of messages
            messages = copy.deepcopy(self.__modelHandler.messages())
            messages.insert(0, self.setup_system_prompt())

        else:
            messages = self.__modelHandler.messages()

        attitude = self.__modelHandler.game_details()["hp"] + score
        messages[-1]["content"] += f'''\nAttitude:
        {attitude}\nAttitude change: {score}'''

        responseStream = self.__textGenerator(
            model=self.__modelName,
            messages=messages,
            stream=self.stream,
            temperature=self.temperature,
            seed=42,
        )

        # Stream response
        result = []
        if self.__modelName in LOCAL_MODELS:
            for output in responseStream:
                if output["choices"][0]["finish_reason"] is None:
                    try:
                        word = output["choices"][0]["delta"]["content"]
                        self.__modelHandler.send_text(word)
                        result.append(word)

                    except KeyError as e:
                        logging.info(
                            f"Key Error encountered for model output stream {e}")

        else:
            for output in responseStream:
                if output.choices[0].finish_reason is None:
                    try:
                        word = output.choices[0].delta.content
                        self.__modelHandler.send_text(word)
                        result.append(word)

                    except KeyError as e:
                        logging.info(
                            f"Key Error encountered for model output stream {e}")

        logging.info(f"Character response generated: {''.join(result)}")

        return ''.join(result)
