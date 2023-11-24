from python:3.11

WORKDIR /app

# Copy requirement files
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy app files
COPY . .

CMD ["python", "main.py"]

