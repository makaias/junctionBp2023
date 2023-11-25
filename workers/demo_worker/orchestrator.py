import time
from worker_base import OrchestratorBase

DEMO_TEXT = """
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Donec euismod, nisl eget ultricies ultricies, nunc nisl
ultricies nunc, quis aliqua
"""


class Orchestrator(OrchestratorBase):
    def __init__(self):
        super().__init__(
            parallelism=1
        )

    def execute(self, handler):
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

        tokens = DEMO_TEXT.split(" ")
        for token in tokens:
            handler.send_text(token + " ")
            time.sleep(.1)

        handler.send_damage(34)
        handler.end_message()
