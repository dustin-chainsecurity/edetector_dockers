FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log   
CMD wget -O "parser_${PARSER_VERSION}.exe" "http://${API_HOST}:${API_PORT}/server_file/parser/parser_${PARSER_VERSION}.exe" && \
    chmod +x parser_${PARSER_VERSION}.exe && \
    ./parser_${PARSER_VERSION}.exe
