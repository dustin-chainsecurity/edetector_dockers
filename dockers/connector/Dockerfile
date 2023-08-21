FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log
RUN wget -O "connector_1.0.0.exe" "api:5000/server_file/connector_1.0.0.exe"
RUN chmod +x connector_1.0.0.exe
CMD ["/connector_1.0.0.exe"]