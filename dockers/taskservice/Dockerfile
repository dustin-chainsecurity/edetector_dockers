FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log
CMD wget -O "taskservice_${TASK_VERSION}.exe" "http://${API_HOST}:${API_PORT}/server_file/taskservice/taskservice_${TASK_VERSION}.exe" && \
    chmod +x taskservice_${TASK_VERSION}.exe && \
    ./taskservice_${TASK_VERSION}.exe