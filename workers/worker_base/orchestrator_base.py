from .model_handler import ModelHandler


class OrchestratorBase:
    def __init__(self, parallelism=1):
        # Set orchestrator parameters
        self.parallelism = parallelism

        # Set up models
        self.models = {}

    def execute(self, handler: ModelHandler):
        pass
