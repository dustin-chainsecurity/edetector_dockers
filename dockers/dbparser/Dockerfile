FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log   
CMD wget -O "parser_1.0.0.exe" "http://api:5000/server_file/parser_1.0.0.exe" && \
    chmod +x parser_1.0.0.exe && \
    ./parser_1.0.0.exe
