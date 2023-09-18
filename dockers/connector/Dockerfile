FROM golang:alpine
WORKDIR /
RUN go mod download
RUN go build -o connector.exe cmd/connector/connector.go
CMD ["/connector.exe"]