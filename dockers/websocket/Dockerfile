FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log
EXPOSE 5050
CMD wget -O "websocket_1.0.0.exe" "http://api:5000/server_file/websocket_1.0.0.exe" && \
    chmod +x websocket_1.0.0.exe && \
    ./websocket_1.0.0.exe 5050