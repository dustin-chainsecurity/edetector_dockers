FROM ubuntu:latest
WORKDIR /
RUN apt-get update
RUN mkdir log
COPY *.exe .
CMD find . -name "*.exe" -exec chmod +x {} \; -exec {}