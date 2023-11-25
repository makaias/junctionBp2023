from worker_base.orchestrator_base import OrchestratorBase
from .modules.module_ai import AIModule


class Orchestrator(OrchestratorBase):
    def __init__(self):
        super().__init__()

    def execute(self, handler):
        completion = AIModule(
            modelName="mistral-7B-instruct",
            handler=handler)

        completion.execute()

        while handler.game_details()["turns_remaining"] > 0:
            # Ask for user input/message
            handler.add_message()

            # End for break message
            if handler.messages()[-1]["content"] == "END":
                break

            # Send message to model
            completion.execute()
