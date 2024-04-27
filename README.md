# Polling Voting App features
1. User can create polls
2. User can list polls
3. User can vote to selected polls
4. once voting is done,show link to user to navigate to Polling result app

# Polling Voting Result App features
1. User can list polls only
2. User can see polling result only of selected poll


### Docker run poll-voting-ui
-   cd poll-voting-ui
-   docker build -t poll-voting-ui:<version> .
-   docker run -d -p 3000:80 --rm --name poll-voting-ui-1 poll-voting-ui:<version>

### Docker run poll-voting-result-ui
-   cd poll-voting-result-ui
-   docker build -t poll-voting-result-ui:<version> .
-   docker run -d -p 3001:80 --rm --name poll-voting-result-ui-1 poll-voting-result-ui:<version>