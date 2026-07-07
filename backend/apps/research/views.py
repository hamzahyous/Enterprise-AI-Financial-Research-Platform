from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import ResearchQuerySerializer
from .services.retrieval_service import run_research_query


@api_view(["GET"])
def health(request):
    return Response({
        "status": "ok",
        "service": "research"
    })


@api_view(["POST"])
def query_research(request):
    serializer = ResearchQuerySerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    try:
        result = run_research_query(serializer.validated_data)
    except RuntimeError as exc:
        return Response(
            {"detail": str(exc)},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    return Response(result)
