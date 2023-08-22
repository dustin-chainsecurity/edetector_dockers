FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log
CMD wget -O "treebuilder_1.0.0.exe" "http://api:5000/server_file/treebuilder_1.0.0.exe" && \
    chmod +x treebuilder_1.0.0.exe && \
    ./treebuilder_1.0.0.exe