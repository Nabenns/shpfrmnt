FROM python:3.12-slim

WORKDIR /app

# Install dependencies sistem untuk Scrapling (browser automation)
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

ENV CHROME_BIN=/usr/bin/chromium
ENV CHROMEDRIVER_PATH=/usr/bin/chromedriver

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Scrapling browsers
RUN python -m scrapling install

COPY . .

CMD ["python", "main.py"]
