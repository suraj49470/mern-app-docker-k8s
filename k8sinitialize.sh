#!/bin/sh
kubectl apply -f ./poll-namespace.yml
kubectl apply -f ./k8s
pod_status=k get pod/poll-statefulset-primary-0 -o jsonpath='{.status.phase}'
echo $pod_status