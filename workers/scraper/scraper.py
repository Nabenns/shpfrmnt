"""
Shopee competitor price scraper menggunakan Scrapling.
Berjalan sebagai background worker, ambil job dari Redis queue.
"""

import json
import random
import time
from typing import Optional

import httpx
from loguru import logger
from scrapling import Fetcher


class CompetitorScraper:
    def __init__(self):
        self.fetcher = Fetcher(auto_match=True)

    def scrape_shopee_price(self, url: str) -> Optional[dict]:
        """Scrape harga produk dari URL Shopee."""
        try:
            # Random delay biar tidak terlalu agresif (30-90 detik antar request)
            delay = random.uniform(30, 90)
            logger.info(f"Waiting {delay:.0f}s before scraping {url}")
            time.sleep(delay)

            page = self.fetcher.get(url, stealthy_headers=True)

            if page is None:
                logger.warning(f"Failed to fetch {url}")
                return None

            # Coba ambil harga dari berbagai selector Shopee
            price = None

            # Selector utama harga Shopee
            price_el = page.find('.pqTWkA')  # class harga Shopee (bisa berubah)
            if price_el:
                price_text = price_el.text.strip()
                price = self._parse_price(price_text)

            if price is None:
                # Fallback: cari via meta tag
                meta_price = page.find('meta[property="product:price:amount"]')
                if meta_price:
                    price = float(meta_price.attrib.get('content', 0))

            if price is None:
                logger.warning(f"Could not extract price from {url}")
                return None

            # Ambil nama produk
            title_el = page.find('h1')
            title = title_el.text.strip() if title_el else 'Unknown'

            return {
                'url': url,
                'title': title,
                'price': price,
                'currency': 'IDR',
                'scraped_at': time.time(),
            }

        except Exception as e:
            logger.error(f"Error scraping {url}: {e}")
            return None

    def _parse_price(self, text: str) -> Optional[float]:
        """Parse string harga seperti 'Rp 125.000' → 125000.0"""
        try:
            cleaned = text.replace('Rp', '').replace('.', '').replace(',', '.').strip()
            # Handle range harga (ambil yang terendah)
            if '-' in cleaned:
                cleaned = cleaned.split('-')[0].strip()
            return float(cleaned)
        except (ValueError, AttributeError):
            return None
