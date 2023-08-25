FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log
EXPOSE 5050
CMD wget -O "websocket_${WS_VERSION}.exe" "http://${API_HOST}:${API_PORT}/server_file/websocket/websocket_${WS_VERSION}.exe" && \
    chmod +x websocket_${WS_VERSION}.exe && \
    ./websocket_${WS_VERSION}.exe 5050