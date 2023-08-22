FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log
CMD wget -O "connector_${CONNECTOR_VERSION}.exe" "http://api:5000/server_file/connector/connector_${CONNECTOR_VERSION}.exe" && \
    chmod +x connector_${CONNECTOR_VERSION}.exe && \
    ./connector_${CONNECTOR_VERSION}.exe