# eDetector Dockers

## Description
This repository deploys the following services :
- Maria DB
- Redis
- Graylog (with Mongo and Elasticsearch)
- API
- Websocket
- Task Handler
- Working Server
- DB Parser
- Tree Builder
- Connector
- Frontend App

## Prerequisites
Have the following installed:
- Docker version 24.0.5
- Docker Compose version 2.20.2

## Getting Started
The following steps will run a local instance of the eDetector Server:

1. Clone this repository.
    ```console
    git clone https://github.com/yu-niverse/edetector_dockers.git
    ```
2. Setup environment
    ```console
    cd edetector_dockers
    chmod +x install.sh
    ./install.sh
    ```
    ```console
    # version check
    docker --version
    docker compose version
    ```
    Or you can setup the following versions of Docker & Docker Compose manually
    - Docker version 24.0.5
    - Docker Compose version 2.20.2 
    
    <br/>

3. Run the following commands to launch the microservices
    ```console
    sudo docker compose --env-file ./config/app.env up -d
    ```

4. Check service healthiness (should not be restarting)
    ```console
    # check status
    sudo docker compose --env-file ./config/app.env ps
    # check logs from stdout
    sudo docker compose --env-file ./config/app.env logs <service_name>
    ```
    Or you can view logger info from Graylog interface `<your_ip>:9000` or under `.volumes`