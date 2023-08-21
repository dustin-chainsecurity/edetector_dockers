FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
EXPOSE 5055 1988 1989 1990
RUN wget -O "server_1.0.1.exe" "192.168.200.142:5000/server_file/server_1.0.1.exe"
RUN chmod +x server_1.0.1.exe
CMD ["/server_1.0.1.exe"]