FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log
CMD wget -O "connector_1.0.0.exe" "http://api:5000/server_file/connector_1.0.0.exe" && \
    chmod +x connector_1.0.0.exe && \
    ./connector_1.0.0.exe