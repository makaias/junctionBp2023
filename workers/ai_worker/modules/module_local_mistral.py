from .module_base import BaseModule
import logging
from llama_cpp import Llama
import custom_config as cfg

PROMPT = [
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."}
]


class LocalAIModule(BaseModule):
    def __init__(self,
                 modelName: str = "mistral-7B-instruct"
                 ):

        super().__init__()
        self.context = 4096
        self.temperature = 0.5
        self.top_p = 50
        self.n_gpu_layers = 40
        self.n_batch = 4
        self.modelName = modelName
        self.stream = True
        self.__model = Llama(
            model_path=cfg.models[modelName], n_gpu_layers=128, n_ctx=self.maxOutputTokens)

        logging.info(f"Initialized model {modelName}")

    def execute(self, handler):

        self.__modelHandler = handler
        messages = self.__modelHandler.messages()
        PROMPT.append(messages)
        logging.info(f"Feeding model {self._modelName} input prompt: {PROMPT}")

        # Generate response
        responseStream = self.__model.create_chat_completion(
            messages,
            max_tokens=1024,
            stream=self.stream,
            temperature=self.temperature,
        )
        result = []
        for output in responseStream:
            if output["choices"][0]["finish_reason"] is None:
                try:
                    word = output["choices"][0]["delta"]["content"]
                    self.__modelHandler.send_text(word)
                    result.append(word)

                except KeyError as e:
                    logging.info(
                        f"Key error encountered for model output stream {e}")

        logging.info(f"Character response generated: {result}")

        return result
