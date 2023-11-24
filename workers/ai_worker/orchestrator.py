from worker_base.orchestrator_base import OrchestratorBase
from .modules.module_openai_trial import AIModule

class Orchestrator(OrchestratorBase):
    def __init__(self):
        super().__init__()

    def execute(self, handler):
        completion = AIModule(modelName="gpt-3.5-turbo")
        retval = completion.execute(handler=handler)

        print(retval)

