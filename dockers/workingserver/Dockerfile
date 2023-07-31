FROM golang:alpine
WORKDIR /
RUN apk update && apk add --no-cache git git openssh gcc musl-dev g++
RUN mkdir /root/.ssh/
ADD id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts
RUN git clone --branch qa git@github.com:jimmyatintel/edetector_go.git
WORKDIR /edetector_go
RUN go env -w CGO_ENABLED="1"
RUN go mod download
RUN go build -o workingserver.exe cmd/server/working_server.go
EXPOSE 5055
CMD ["/edetector_go/workingserver.exe"]