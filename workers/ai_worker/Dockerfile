FROM python:3.11

workdir /app

# Copy requirement files
COPY requirements.txt .
COPY ai_worker/requirements.txt ai_worker/

# Install requirements
RUN pip install -r requirements.txt
RUN pip install -r ai_worker/requirements.txt

# Copy app files
COPY socket_app.py .
COPY worker_base/ worker_base/
COPY ai_worker/ ai_worker/

# Run app
CMD ["python", "socket_app.py", "ai_worker"]


