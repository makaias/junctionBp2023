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

        if len(handler.messages()) == 0:
            player = completion.get_player_dict()
            handler.send_text(player['first_message'])
            handler.end_message()
            return

        if handler.game_details()["hp"] <= 0:
            handler.send_text("Congratulations! You won!")
            handler.send_end_game()
            handler.end_message()
            return

        if handler.game_details()["turns_remaining"] <= 0:
            handler.send_text("You ran out of turns!")
            handler.send_end_game()
            handler.end_message()
            return

        # Send message to model
        answer = completion.execute()

        # Evaluate user response
        score = evaluation.evaluate()
        handler.send_damage(score)

        # Add message
        handler.end_message()
