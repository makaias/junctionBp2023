FROM python:3.11

WORKDIR /app

# Copy requirement files
COPY requirements.txt .
COPY demo_worker/requirements.txt demo_worker/

# Install requirements
RUN pip install -r requirements.txt
RUN pip install -r demo_worker/requirements.txt

# Copy app files
COPY socket_app.py .
COPY worker_base/ worker_base/
COPY demo_worker/ demo_worker/

# Run app
CMD ["python", "socket_app.py", "demo_worker"]


