import logging
from llama_cpp import Llama
from openai import OpenAI
from dotenv import load_dotenv

from .module_base import BaseModule
from ..custom_config import *

class AIModule(BaseModule):
    def __init__(self, 
        modelName: str,
        handler: any):
        super().__init__(handler)
        self.__modelName = modelName
        self.stream = True
        self.temperature = 0.5

        # Set up OpenAI API
        if self.__modelName in openai_models:
            load_dotenv()
            client = OpenAI()
            self.__textGenerator = client.chat.completions.create
        
        # Set up local model:
        elif self.__modelName in local_models:
            self.context = 4096
            self.n_gpu_layers = 128
            self.__model = Llama(
                model_path=models[modelName],
                n_gpu_layers=self.n_gpu_layers,
                n_ctx=self.context)
            self.__textGenerator = self.__model.create_chat_completion

        else:
            raise ValueError(f"Model name {self.__modelName} is not supported yet.")

    def execute(self, handler):
        # Send messages
        messages = handler.messages()

        completion = self.__textGenerator(
            messages,
            stream=self.stream,
            temperature=self.temperature
        )

        # Stream response
        result = []
        for output in responseStream:
            if output["choices"][0]["finish_reason"] is None:
                try:
                    word = output["choices"][0]["delta"]["content"]
                    self.__modelHandler.send_text(word)
                    result.append(word)

                except KeyError as e:
                    logging.info(
                        f"Key Error encountered for model output stream {e}")

        logging.info(f"Character response generated: {result.join('')}")

        return

