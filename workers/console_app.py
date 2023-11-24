from worker_base import ConsoleModelHandler
import logging
import sys

logging.basicConfig(
    level=logging.INFO, 
    format='[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)

def main():
    module_name = sys.argv[1]
    module_import = __import__(module_name, fromlist=["Orchestrator"])

    orchestrator = module_import.Orchestrator()

    print("Starting app in console mode")
    handler = ConsoleModelHandler()
    orchestrator.execute(handler)
    print("App finished")


main()
