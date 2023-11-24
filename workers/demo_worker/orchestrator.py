from worker_base import OrchestratorBase


class Orchestrator(OrchestratorBase):
    def __init__(self):
        super().__init__()

    def execute(self, handler):
        handler.send_text("Hello from orchestrator")
        handler.finalize()
