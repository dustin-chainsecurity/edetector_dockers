FROM ubuntu:latest
WORKDIR /
RUN apt-get update
RUN mkdir log
COPY *.exe .
CMD find . -type f -name "*.exe" -exec chmod +x {} \;