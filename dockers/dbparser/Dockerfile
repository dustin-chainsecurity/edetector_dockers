FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log   
RUN wget -O "parser_1.0.0.exe" "api:5000/server_file/parser_1.0.0.exe"
RUN chmod +x parser_1.0.0.exe
CMD ["/parser_1.0.0.exe"]
