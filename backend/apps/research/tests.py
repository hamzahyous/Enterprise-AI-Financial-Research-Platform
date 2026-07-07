from unittest.mock import patch

from rest_framework import status
from rest_framework.test import APITestCase

from .services.retrieval_service import normalize_retrieval_response


class ResearchQueryAPITests(APITestCase):
    def test_query_endpoint_returns_research_result(self):
        fake_result = {
            "query": "What are NVIDIA's biggest risks?",
            "ticker": "NVDA",
            "company": "NVIDIA",
            "risks": [
                {
                    "category": "regulatory risks",
                    "impact": "High",
                    "explanation": "Export controls may affect sales.",
                    "source": {
                        "chunk_id": 65,
                        "section": "Risk Factors",
                        "filing": "10-K",
                    },
                }
            ],
            "citations": [
                {
                    "chunk_id": 65,
                    "section": "Risk Factors",
                    "filing": "10-K",
                    "text": "Export controls may affect sales.",
                }
            ],
            "metadata": {
                "documents": ["10-K"],
                "confidence": 0.48,
                "citation_count": 1,
                "retrieved_chunk_count": 1,
            },
        }

        with patch("apps.research.views.run_research_query", return_value=fake_result) as mock_service:
            response = self.client.post(
                "/api/research/query/",
                {
                    "query": "What are NVIDIA's biggest risks?",
                    "ticker": "NVDA",
                    "documents": ["10-K"],
                },
                format="json",
            )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, fake_result)
        mock_service.assert_called_once()

    def test_query_endpoint_requires_query(self):
        response = self.client.post(
            "/api/research/query/",
            {
                "ticker": "NVDA",
                "documents": ["10-K"],
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("query", response.data)


class RetrievalResponseNormalizationTests(APITestCase):
    def test_normalizes_raw_ml_response_to_app_response(self):
        raw_agent_result = {
            "company": "NVIDIA",
            "question": "What are NVIDIA's biggest risks?",
            "confidence": 0.48,
            "risks": [
                {
                    "category": "regulatory risks",
                    "impact": "High",
                    "explanation": "Export controls may affect sales.",
                    "source": {
                        "chunk_id": 65,
                        "section": "Risk Factors",
                        "filing": "10-K",
                    },
                }
            ],
            "retrieved_chunks": [
                {
                    "chunk_id": 65,
                    "section": "Risk Factors",
                    "filing": "10-K",
                    "text": "Export controls may affect sales.",
                },
                {
                    "chunk_id": 65,
                    "section": "Risk Factors",
                    "filing": "10-K",
                    "text": "Duplicate chunk should not become a second citation.",
                },
            ],
        }

        result = normalize_retrieval_response(
            agent_result=raw_agent_result,
            query="What are NVIDIA's biggest risks?",
            ticker="NVDA",
            documents=["10-K"],
        )

        self.assertEqual(result["query"], "What are NVIDIA's biggest risks?")
        self.assertEqual(result["ticker"], "NVDA")
        self.assertEqual(result["company"], "NVIDIA")
        self.assertEqual(len(result["risks"]), 1)
        self.assertEqual(result["risks"][0]["source"]["chunk_id"], 65)
        self.assertEqual(len(result["citations"]), 1)
        self.assertEqual(result["citations"][0]["text"], "Export controls may affect sales.")
        self.assertEqual(result["metadata"]["documents"], ["10-K"])
        self.assertEqual(result["metadata"]["confidence"], 0.48)
        self.assertEqual(result["metadata"]["citation_count"], 1)
        self.assertEqual(result["metadata"]["retrieved_chunk_count"], 2)
