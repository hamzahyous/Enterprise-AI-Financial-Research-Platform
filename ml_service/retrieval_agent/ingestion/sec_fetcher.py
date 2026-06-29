
from sec_edgar_downloader import Downloader


def download_10k(ticker):

    dl = Downloader(
        "data",
        "fake_email@gmail.com"
        )

    dl.get(
        "10-K",
        ticker,
        limit=1
    )

    print(f"Downloaded latest 10-K for {ticker}")

    