FROM golang:alpine
WORKDIR /
RUN go mod download
RUN go build -o dbparser.exe cmd/parser/parser.go
EXPOSE 5000
CMD ["/parser.exe", "5000"]
