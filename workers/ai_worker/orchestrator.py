from worker_base.orchestrator_base import OrchestratorBase
from .modules.module_ai import AIModule
from .modules.module_eval import EvalModule


class Orchestrator(OrchestratorBase):
    def __init__(self):
        super().__init__()

    def execute(self, handler):
        completion = AIModule(
            modelName="gpt-3.5-turbo",
            handler=handler)

        evaluation = EvalModule(
            modelName="gpt-3.5-turbo",
            handler=handler
        )

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
            answer = completion.execute()

            # Evaluate user response
            evaluation.evaluate()
            handler.add_message(role="assistant", content=answer)
            handler.end_message()
