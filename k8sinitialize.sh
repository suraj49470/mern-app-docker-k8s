#!/bin/sh


kubectl apply --filename https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml
kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=180s
# Apply the namespace and Kubernetes manifests
kubectl apply -f ./poll-namespace.yml
kubectl config set-context --current --namespace=poll
sleep 3
kubectl apply -f ./k8s


