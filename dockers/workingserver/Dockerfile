FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log
EXPOSE 5055 1988 1989 1990
CMD wget -O "server_${SERVER_VERSION}.exe" "http://${API_HOST}:${API_PORT}/server_file/server/server_${SERVER_VERSION}.exe" && \
    chmod +x server_${SERVER_VERSION}.exe && \
    ./server_${SERVER_VERSION}.exe