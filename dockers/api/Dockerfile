FROM ubuntu:latest
WORKDIR /
RUN apt-get update
COPY ./api_0.0.1.exe ./
RUN mkdir log
EXPOSE 5000
RUN chmod +x ./api_0.0.1.exe
CMD ["/api_0.0.1.exe", "5000"]