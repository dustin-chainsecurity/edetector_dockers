FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN wget -O "parser_1.0.0.exe" "192.168.200.142:5000/server_file/parser_1.0.0.exe"
RUN chmod +x parser_1.0.0.exe
CMD ["/parser_1.0.0.exe"]
