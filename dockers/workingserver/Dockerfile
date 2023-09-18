FROM golang:alpine
WORKDIR /
RUN apk update && apk add --no-cache gcc musl-dev g++
RUN go mod download
RUN go build -o workingserver.exe cmd/server/server.go
CMD ["/workingserver.exe"]