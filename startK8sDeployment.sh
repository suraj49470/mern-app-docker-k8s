#!/bin/sh
echo "test"
kubectl apply -f ./k8s/ingress-controller.yml
kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=180s
# Apply the namespace and Kubernetes manifests
kubectl apply -f ./k8s/poll-namespace.yml
kubectl config set-context --current --namespace=poll
sleep 3
kubectl apply -f ./k8s
echo "waiting for mongo primary and secondary db"
kubectl wait --namespace poll --for=condition=ready pod --selector=role=mongo-primary
kubectl wait --namespace poll --for=condition=ready pod --selector=role=mongo-secondary
echo "mongo primary and secondary db setup completed"
echo "configuring replicaset on primary mongo pod"
is_replication_done==$(kubectl exec -it pod/poll-statefulset-primary-0 -- mongosh --eval 'rs.status().ok')
if [ "$is_replication_done" != 1 ]; then
    kubectl exec -it pod/poll-statefulset-primary-0 -- sh -x rs-scripts/rs-init.sh
fi
kubectl get all -o wide

