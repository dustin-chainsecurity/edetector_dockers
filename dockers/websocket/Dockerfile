FROM golang:alpine
WORKDIR /
RUN apk update && apk add --no-cache git
RUN apk add --no-cache openssh
RUN mkdir /root/.ssh/
ADD id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts
RUN git clone --branch qa git@github.com:yu-niverse/edetector_api.git
WORKDIR /edetector_api
RUN go mod download
RUN go build -o websocket.exe cmd/websocket/websocket.go
EXPOSE 5050
CMD ["/edetector_api/websocket.exe", "5050"]