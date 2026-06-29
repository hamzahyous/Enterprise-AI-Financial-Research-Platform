
from typing import Optional

from pydantic import BaseModel

class Source(BaseModel):

    chunk_id:int
    section:str
    filing:str


class Risk(BaseModel):

    category:str
    impact:str
    explanation:str
    source:Source


class RiskReport(BaseModel):

    company:str
    question:str
    confidence: Optional[float] = None  
    risks:list[Risk] 

