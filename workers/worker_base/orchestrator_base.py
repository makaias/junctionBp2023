from .model_handler import ModelHandler


class OrchestratorBase:
    def __init__(self):
        self.models = {}
        # self.planner = PlannerModule(args...)

    def execute(self, handler: ModelHandler):
        pass
