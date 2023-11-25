import logging


class Executor:
    def __init__(
        self,
        sid,
        sio,
        parallelism=1,
        type="",
    ):
        self.id = sid
        self.sio = sio
        self.executions = {}
        self.parallelism = parallelism
        self.__stopped = False

    def is_available(self):
        has_capacity = self.parallelism <= 0 or len(self.executions) < self.parallelism
        return has_capacity and not self.__stopped

    def has_execution(self, exid):
        return exid in self.executions

    def execute(self, execution):
        logging.info(f"Starting execution {execution.id} on executor {self.id}")
        self.executions[execution.id] = execution
        self.sio.emit("execute", execution.request)
        pass

    def finalize(self, exid):
        self.executions.pop(exid)
        pass

    def stop(self):
        self.__stopped = True
