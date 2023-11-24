from worker_base import ConsoleModelHandler
import sys

def main():
    module_name = sys.argv[1]
    module_import = __import__(module_name, fromlist=["Orchestrator"])

    orchestrator = module_import.Orchestrator()

    print("Starting app in console mode")
    handler = ConsoleModelHandler()
    orchestrator.execute(handler)
    print("App finished")


main()
