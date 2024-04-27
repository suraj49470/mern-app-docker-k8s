# Polling Voting App features
1. User can create polls
2. User can list polls
3. User can vote to selected polls
4. once voting is done,show link to user to navigate to Polling result app

# Polling Voting Result App features
1. User can list polls only
2. User can see polling result only of selected poll


### Docker run poll-voting-ui
-   docker build -t poll-voting-ui:<version> ./poll-voting-ui
-   docker run -d -p 3000:80 --rm --name poll-voting-ui-1 poll-voting-ui:<version>

### Docker run poll-voting-result-ui
-   docker build -t poll-voting-result-ui:<version> ./poll-voting-result-ui
-   docker run -d -p 3001:80 --rm --name poll-voting-result-ui-1 poll-voting-result-ui:<version>

### Docker run poll-voting-service
-   docker build -t poll-voting-service:<version> ./poll-voting-service
-   docker run -d -p 5000:5000 --rm --name poll-voting-service-1 poll-voting-service:<version>

### Docker run poll-voting-result-service
-   docker build -t poll-voting-result-service:<version> ./poll-voting-result-service
-   docker run -d -p 5001:5001 --rm --name poll-voting-result-service-1 poll-voting-result-service:<version>

docker build -t poll-voting-ui:v1 ./poll-voting-ui
docker build -t poll-voting-result-ui:v1 ./poll-voting-result-ui
docker build -t poll-voting-service:v1 ./poll-voting-service
docker build -t poll-voting-result-service:v1 ./poll-voting-result-service
docker run -d -p 3000:80 --rm --name poll-voting-ui-1 poll-voting-ui:v1
docker run -d -p 3001:80 --rm --name poll-voting-result-ui-1 poll-voting-result-ui:v1
docker run -d -p 5000:5000 -e MONGO_URL=mongodb://mongo:27017/vote -e PORT=5000 --rm  --name poll-voting-service-1 poll-voting-service:v1
docker run -d -p 5001:5001 -e MONGO_URL=mongodb://mongo:27017/vote -e PORT=5000 --rm --name poll-voting-result-service-1 poll-voting-result-service:v1

