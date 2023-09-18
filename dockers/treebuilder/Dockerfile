FROM golang:alpine
WORKDIR /
RUN go mod download
RUN go build -o treebuilder.exe cmd/builder/builder.go
CMD ["/builder.exe"]