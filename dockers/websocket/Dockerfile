FROM ubuntu:latest
WORKDIR /
RUN apt-get update
RUN mkdir log
COPY *.exe .
EXPOSE 5000
CMD find . -name "*.exe" -exec chmod +x {} \; -exec {} 5050 \;