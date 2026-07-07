from django.db import models


# So we can track and save generated reports for future use
class ResearchReport(models.Model): 
    class Status(models.TextChoices):
        COMPLETED = "completed", "Completed"
        FAILED = "failed", "Failed"

    
    query = models.TextField()
    ticker = models.CharField(max_length=16, blank=True)
    company = models.CharField(max_length=255, blank=True)
    documents = models.JSONField(default=list, blank=True)
    risks = models.JSONField(default=list, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    confidence = models.FloatField(null=True, blank=True)
    status = models.CharField(
        max_length=32,
        choices=Status.choices,
        default=Status.COMPLETED,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        label = self.ticker or self.company or "Research report"
        return f"{label}: {self.query[:80]}"


# For Citation querying purposes (query all citations for a report, see if citations overlap across reports, etc)
class Citation(models.Model):
    report = models.ForeignKey(
        ResearchReport,
        related_name="citations",
        on_delete=models.CASCADE,
    )
    chunk_id = models.IntegerField(null=True, blank=True)
    section = models.CharField(max_length=255, blank=True)
    filing = models.CharField(max_length=64, blank=True)
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.filing} {self.section} chunk {self.chunk_id}"
