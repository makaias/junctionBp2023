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
        tokens = DEMO_TEXT.split(" ")

        for token in tokens:
            handler.send_text(token + " ")
            time.sleep(.5)

        handler.send_damage(10)
        handler.end_message()
