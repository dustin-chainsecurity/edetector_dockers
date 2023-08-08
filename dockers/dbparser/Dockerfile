FROM golang:alpine
WORKDIR /
RUN apk update && apk add --no-cache git openssh gcc musl-dev g++
RUN apk add --no-cache openssh
RUN mkdir /root/.ssh/
ADD id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts
RUN git clone --branch qa_new_scan_agent git@github.com:jimmyatintel/edetector_go.git
WORKDIR /edetector_go
RUN go mod download
RUN go build -o dbparser.exe cmd/parser/parser.go
CMD ["/edetector_go/dbparser.exe"]