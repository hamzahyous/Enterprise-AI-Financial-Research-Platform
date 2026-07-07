FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    git \
    bash-completion

WORKDIR /workspace/backend

COPY backend/requirements.txt /tmp/backend-requirements.txt
COPY ml_service/requirements.txt /tmp/ml-requirements.txt
RUN pip install --upgrade pip \
    && pip install -r /tmp/backend-requirements.txt \
    && pip install -r /tmp/ml-requirements.txt

# terminal branch naming convention baked into image workspace <branch-name>$...
RUN cat <<'EOF' >> /root/.bashrc

parse_git_branch() {
    git branch 2>/dev/null | sed -n '/\* /s///p'
}

PS1='\[\e[32m\]\u@\h\[\e[0m\]:\[\e[34m\]\w\[\e[0m\] \[\e[90m\](\[\e[33m\]$(parse_git_branch)\[\e[90m\])\[\e[0m\]\$ '

EOF
