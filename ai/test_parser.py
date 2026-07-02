from job_parser import parse_job_description

jd = """
We are hiring a Senior Python Backend Engineer.

Requirements:

Python
FastAPI
Docker
Kubernetes
AWS

Minimum Experience: 5 years

Preferred Skills:

Redis
CI/CD
"""

print(parse_job_description(jd))