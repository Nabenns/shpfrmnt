"""
Scraper worker — polling Redis queue untuk job scraping harga kompetitor.

Queue key: scraper:jobs (Redis List)
Job format: {"competitor_product_id": "...", "url": "...", "product_id": "..."}

Setelah scraping, kirim hasil ke API via HTTP.
"""

import json
import os
import signal
import time

import httpx
import redis
from dotenv import load_dotenv
from loguru import logger

from scraper import CompetitorScraper

load_dotenv()

REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')
API_URL = os.getenv('API_URL', 'http://localhost:4000')
QUEUE_KEY = 'scraper:jobs'
RESULT_KEY = 'scraper:results'

running = True


def handle_signal(sig, frame):
    global running
    logger.info("Shutdown signal received, stopping worker...")
    running = False


signal.signal(signal.SIGTERM, handle_signal)
signal.signal(signal.SIGINT, handle_signal)


def process_job(r: redis.Redis, scraper: CompetitorScraper, client: httpx.Client):
    """Ambil 1 job dari queue dan proses."""
    raw = r.blpop(QUEUE_KEY, timeout=5)
    if raw is None:
        return  # Timeout, queue kosong

    _, job_bytes = raw
    job = json.loads(job_bytes)

    logger.info(f"Processing job: {job}")
    result = scraper.scrape_shopee_price(job['url'])

    if result is None:
        logger.warning(f"No result for job {job.get('competitor_product_id')}")
        return

    # Kirim hasil ke API
    payload = {
        'competitor_product_id': job.get('competitor_product_id'),
        'product_id': job.get('product_id'),
        'price': result['price'],
        'title': result['title'],
        'url': result['url'],
        'scraped_at': result['scraped_at'],
    }

    try:
        resp = client.post(
            f"{API_URL}/api/pricing/competitor-result",
            json=payload,
            timeout=10,
        )
        if resp.status_code == 200:
            logger.info(f"Result sent: {payload['price']} for {payload['url']}")
        else:
            logger.warning(f"API returned {resp.status_code}: {resp.text}")
    except httpx.RequestError as e:
        logger.error(f"Failed to send result to API: {e}")


def main():
    logger.info("🕷️  Scraper worker starting...")

    r = redis.from_url(REDIS_URL, decode_responses=True)
    r.ping()
    logger.info("✅ Redis connected")

    scraper = CompetitorScraper()

    with httpx.Client() as client:
        while running:
            try:
                process_job(r, scraper, client)
            except Exception as e:
                logger.error(f"Unexpected error in worker loop: {e}")
                time.sleep(5)

    logger.info("Worker stopped.")


if __name__ == '__main__':
    main()
