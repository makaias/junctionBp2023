from worker_base.orchestrator_base import OrchestratorBase
from .modules.module_openai_trial import AIModule
from .modules.module_local_mistral import LocalAIModule


class Orchestrator(OrchestratorBase):
    def __init__(self):
        super().__init__()

    def execute(self, handler):
        completion = LocalAIModule(modelName="mistral-7B-instruct")
        retval = completion.execute(handler=handler)

        print(retval)
