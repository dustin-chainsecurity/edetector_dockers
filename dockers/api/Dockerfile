FROM golang:alpine
WORKDIR /
RUN go mod download
RUN go build -o api.exe cmd/api/api.go
EXPOSE 5000
CMD ["/api.exe", "5000"]

