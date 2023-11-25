import logging
import sys

import eventlet
from executor import ExecutorService
from user_service import UserService

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
eventlet.monkey_patch()

executor_service = ExecutorService(port=5001)
user_service = UserService(executor_service, port=5000)

th1 = eventlet.spawn(executor_service.start)
th2 = eventlet.spawn(user_service.start)

th1.wait()
th2.wait()
