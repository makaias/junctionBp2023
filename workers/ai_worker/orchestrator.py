from worker_base.orchestrator_base import OrchestratorBase
from .modules.module_ai import AIModule
from .modules.module_eval import EvalModule


class Orchestrator(OrchestratorBase):
    def __init__(self):
        super().__init__()

    def execute(self, handler):
        completion = AIModule(
            modelName="mistral-7B-instruct",
            handler=handler)

        evaluation = EvalModule(
            modelName="mistral-7B-instruct",
            handler=handler
        )

        content = completion.execute()

        player = completion.get_player_dict()

        handler.add_message(role="assistant", content=player['first_message'])

        while handler.game_details()["turns_remaining"] > 0:
            # Ask for user input/message
            handler.add_message(role="user", content=input(
                "Type your arguments here:"))

            # End for break message
            if handler.messages()[-1]["content"] == "END":
                break

            # Send message to model
            completion.execute(skip_system_prompt=True)

            # Evaluate user response
            evaluation.evaluate()
            handler.end_message()
