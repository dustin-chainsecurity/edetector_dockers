FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log
EXPOSE 5055 1988 1989 1990
CMD wget -O "server_1.0.1.exe" "http://api:5000/server_file/server_1.0.1.exe" && \
    chmod +x server_1.0.1.exe && \
    ./server_1.0.1.exe