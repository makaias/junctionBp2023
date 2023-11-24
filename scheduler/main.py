import eventlet
import executor_service
import user_service

eventlet.monkey_patch()


def start_app(app, port):
    eventlet.wsgi.server(eventlet.listen(("", port)), app)


th1 = eventlet.spawn(start_app, user_service.app, 5000)
th2 = eventlet.spawn(start_app, executor_service.app, 5001)

th1.wait()
th2.wait()
