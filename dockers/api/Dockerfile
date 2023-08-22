FROM ubuntu:latest
WORKDIR /
RUN apt-get update
RUN mkdir log api api/server_files
COPY server_files ./api/server_files
EXPOSE 5000
CMD chmod +x api/server_files/api/api_${API_VERSION}.exe && \
    ./api/server_files/api/api_${API_VERSION}.exe 5000
