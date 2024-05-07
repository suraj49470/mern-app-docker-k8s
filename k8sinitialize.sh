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
pod_status_1=$(kubectl get pod/poll-statefulset-primary-1 -o jsonpath='{.status.phase}')
echo "$pod_status"
echo "$pod_status_1"

# Define the while loop condition
while [ "$pod_status" != "Running" ]; do
    # Get the status of the pod again
    pod_status=$(kubectl get pod/poll-statefulset-primary-0 -o jsonpath='{.status.phase}')
    echo "pod 1 status is $pod_status,wating for running state ..."
    sleep 1 # Optionally, you can add a delay to avoid overwhelming the Kubernetes API server
done
while [ "$pod_status_1" != "Running" ]; do
    # Get the status of the pod again
    pod_status_1=$(kubectl get pod/poll-statefulset-primary-1 -o jsonpath='{.status.phase}')
    echo "pod 2 status is $pod_status_1,wating for running state ..."
    sleep 1 # Optionally, you can add a delay to avoid overwhelming the Kubernetes API server
done
echo "*****************************************"
echo "****** apply mongodb replication ********"
echo "*****************************************"

kubectl exec -it pod/poll-statefulset-primary-0 -- sh -x "/rs-scripts/rs-init.sh"
kubectl get all -o wide


