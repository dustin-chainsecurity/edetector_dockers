FROM ubuntu:latest
WORKDIR /
RUN apt-get update
RUN mkdir log
COPY *.exe .
EXPOSE 5050
CMD find . -name "*.exe" -exec chmod +x {} \; -exec {} 5050 \;