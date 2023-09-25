FROM ubuntu:latest
WORKDIR /
RUN apt-get update
RUN mkdir log
COPY *.exe .
EXPOSE 5055 1988 1989 1990
CMD find . -maxdepth 1 -type f -name "*.exe" -exec chmod +x {} \; -exec sh -c './{}' \;