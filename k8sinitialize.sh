#!/bin/sh


kubectl apply --filename https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml
kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=180s
# Apply the namespace and Kubernetes manifests
kubectl apply -f ./poll-namespace.yml
kubectl config set-context --current --namespace=poll
sleep 3
kubectl apply -f ./k8s
echo "wating for mongo primary and secondary db"
kubectl wait --namespace poll --for=condition=ready pod --selector=role=mongo-primary --timeout=180s
kubectl wait --namespace poll --for=condition=ready pod --selector=role=mongo-secondary --timeout=180s
echo "mongo primary and secondary db setup completed"
echo "configuring replicaset on primary mongo pod"
kubectl exec -it pod/poll-statefulset-primary-0 -- sh -x rs-scripts/rs-init.sh
kubectl get all -o wide

