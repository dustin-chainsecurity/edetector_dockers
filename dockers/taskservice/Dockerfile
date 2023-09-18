FROM golang:alpine
WORKDIR /
RUN go mod download
RUN go build -o taskservice.exe cmd/taskservice/taskservice.go
CMD ["/taskservice.exe"]