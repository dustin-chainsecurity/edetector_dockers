FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log
EXPOSE 5050
RUN wget -O "websocket_1.0.0.exe" "api:5000/server_file/websocket_1.0.0.exe"
RUN chmod +x websocket_1.0.0.exe
CMD ["/websocket_1.0.0.exe", "5050"]