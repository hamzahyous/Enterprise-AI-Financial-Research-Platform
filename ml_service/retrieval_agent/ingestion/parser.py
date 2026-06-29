
import re
from bs4 import BeautifulSoup


def read_filing(filepath):

    with open(filepath, "r", encoding="utf-8") as file:

        text = file.read()

    return text


def clean_sec_text(raw_text):

    if "</SEC-HEADER>" in raw_text:
        raw_text = raw_text.split("</SEC-HEADER>")[-1]

    soup = BeautifulSoup(raw_text, "html.parser")

    text = soup.get_text(separator=" ")

    text = re.sub(r"\s+", " ", text)

    return text.strip()

