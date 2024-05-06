#!/bin/sh


kubectl apply --filename https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml
kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=180s
# Apply the namespace and Kubernetes manifests
kubectl apply -f ./poll-namespace.yml
kubectl config set-context --current --namespace=poll
sleep 3
kubectl apply -f ./k8s

# Get the initial status of the pod
pod_status=$(kubectl get pod/poll-statefulset-primary-0 -o jsonpath='{.status.phase}')
echo "$pod_status"

# Define the while loop condition
while [ "$pod_status" != "Running" ]; do
    # Get the status of the pod again
    pod_status=$(kubectl get pod/poll-statefulset-primary-0 -o jsonpath='{.status.phase}')
    echo "pod status is $pod_status,wating for running state ..."
    sleep 3 # Optionally, you can add a delay to avoid overwhelming the Kubernetes API server
done
echo "*****************************************"
echo "****** check mongodb replication ********"
echo "*****************************************"

kubectl exec -it pod/poll-statefulset-primary-0 -- sh -x "/rs-scripts/rs-init.sh"


