FROM ubuntu:latest
WORKDIR /
RUN apt-get update && apt-get install -y wget
RUN mkdir log
CMD wget -O "treebuilder_${TREEBUILDER_VERSION}.exe" "http://api:5000/server_file/treebuilder/treebuilder_${TREEBUILDER_VERSION}.exe" && \
    chmod +x treebuilder_${TREEBUILDER_VERSION}.exe && \
    ./treebuilder_${TREEBUILDER_VERSION}.exe