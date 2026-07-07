from rest_framework import serializers


class ResearchQuerySerializer(serializers.Serializer):
    query = serializers.CharField()
    ticker = serializers.CharField(required=False, allow_blank=True)
    documents = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        default=list,
    )
