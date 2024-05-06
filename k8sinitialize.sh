#!/bin/sh

# Apply the namespace and Kubernetes manifests
kubectl apply -f ./poll-namespace.yml
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


