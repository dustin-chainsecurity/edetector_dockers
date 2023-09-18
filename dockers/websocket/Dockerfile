FROM golang:alpine
WORKDIR /
RUN go mod download
RUN go build -o websocket.exe cmd/websocket/websocket.go
EXPOSE 5050
CMD ["/websocket.exe", "5050"]