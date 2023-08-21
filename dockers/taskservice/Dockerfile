FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log
CMD wget -O "taskservice_1.0.0.exe" "http://api:5000/server_file/taskservice_1.0.0.exe" && \
    chmod +x taskservice_1.0.0.exe && \
    ./taskservice_1.0.0.exe