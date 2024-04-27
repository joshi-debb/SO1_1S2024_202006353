para eliminar todo de un namespace

    kubectl delete all --all -n <namespace>

para ver todo lo que esta dentro de un namespace

    kubectl get all -n kafka

para crear un deploy y service dentro de un namespace

    kubectl apply -f <archivo.yaml> -n <namespace>

para eliminar un namespace

    kubectl delete ns <namespace>

