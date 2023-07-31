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
RUN go build -o taskservice.exe cmd/taskservice/taskservice.go
CMD ["/edetector_api/taskservice.exe"]