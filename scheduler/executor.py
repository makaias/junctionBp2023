import eventlet
import os

# standard Python


class Executor:
    def __init__(self, sio, taskQueue):
        self.executor_sio = sio
        self.taskQueue = taskQueue
        self.execution = None
        self.user_sio = None
        self.__stopped = False

    def run(self):
        while True:
            if self.__stopped:
                print(f"Executor({self.executor_sio.sid}) Stopped")
                break

            task = None
            try:
                task = self.taskQueue.get(timeout=1)
            except:
                continue

            print(f"Executor({self.executor_sio.sid}) Got task {task}")

            self.execution = task["execution"]
            self.user_sio = task["user_sio"]

            self.execution["status"] = "sceduled"
            self.executor_sio.emit("execute", self.execution)
            self.user_sio.emit("execution_updated", self.execution)

            while True:
                print(
                    f"Executor({self.executor_sio.sid}) Waiting for execution to finish"
                )
                eventlet.sleep(3)
                if not self.execution or self.__stopped:
                    break

    def start(self):
        eventlet.spawn(self.run)

    def recieve(self, event, *data):
        print(f"Executor({self.executor_sio.sid}) Event {event} recieved {data}")
        if event == "finalize":
            print(f"Executor({self.executor_sio.sid}) Finalizing execution")
            self.execution["status"] = "completed"
            self.execution["progress"] = None
            self.user_sio.emit("execution_updated", self.execution)
            self.user_sio.emit("finalize", self.execution)
            self.user_sio = None
            self.execution = None
        elif event == "send_text":
            self.user_sio.emit(
                "text_received", {"id": self.execution["id"], "text": data[0]}
            )
        elif event == "send_debug_thought":
            print(f"Executor({self.executor_sio.sid}) Recieved debug thought {data[0]}")
            self.user_sio.emit(
                "debug_thought_received",
                {"id": self.execution["id"], "text": data[0]},
            )
        elif event == "send_asset":
            type = data[0]["type"]
            asset = data[0]["asset"]
            id = data[0]["id"]

            # Saving the asset
            filename = f".temp/outfiles/{id}.{type}"
            os.makedirs(os.path.dirname(filename), exist_ok=True)
            f = open(filename, "w")
            f.write(asset)
            f.close()

            print(f"Executor({self.executor_sio.sid}) Recieved asset {data[0]}, saved to {filename}")
            self.user_sio.emit(
                "asset_received",
                {"id": self.execution["id"], "type": type, "filename": f"{id}.{type}"},
            )

        elif event == "update_status_message":
            self.execution["status"] = data[0] if len(data) > 0 else None
            self.user_sio.emit("execution_updated", self.execution)

        elif event == "update_status_progress":
            self.execution["progress"] = data[0] if len(data) > 0 else None
            self.user_sio.emit("execution_updated", self.execution)

    def stop(self):
        self.__stopped = True
        self.execution = None
        self.user_sio = None
