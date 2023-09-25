FROM ubuntu:latest
WORKDIR /
RUN apt-get update
RUN mkdir log
COPY *.exe .
CMD find . -maxdepth 1 -type f -name "*.exe" -exec chmod +x {} \; -exec sh -c './{}' \;