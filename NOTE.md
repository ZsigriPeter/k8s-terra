# Topics from today:

## Kubernetes
- **EKS terraform:**
    - You need two resources
- **Pod Identity:**
    - Kuberentes has these so called **service accounts** that **pods** can use to grant extra permissions
    - AWS has **IAM Roles** to grant permissions for software
    - Pod identity can link a service account and an IAM Role together
    - If a Pod uses a service account then it automatically gets the permissions of the linked IAM Role
    - In the background a **Pod Identity Agent** is working as a middle man to allow these links
    - We don't have to manually change or access this agent but we should know that it exists
    - The agent lives under the **kube-system** namespace
- **EBS-CSI:**
    - Like most AWS resource related feature, EBS and other volumes are created through a controller pod, the EBS-CSI driver has it's controller pod in the kube-system namespace
    - In our current configuration EBS-CSI uses Pod Identity in the background to authenticate itself with AWS when you would like to create new Volumes from your yaml files

## Architectures
- **Monolithic Architecture:**
    - Every functionality and feature is bundled into one server called a Monolith, these giant servers can usually handle authentication and every other logical functionality and they usually use the same database
    - The server monoliths can be scaled but they will always depend on a single database and this database can become a bottle neck unless even with the usage of an in-memory database like Reddis and Valkey
    - Probably the cheapest option in terms of costs
- **Microservices Architecture:**
    - We split the software to multiple Microservices
    - A Microservice usually contains servers and a dedicated database
    - Each Microservice has it's own database and by this we eliminate the common database bottle neck that we experience in Monolithic setups
    - The Microservices can be scaled individually both horizontally and vertically
    - The Microservices may depend on each other, for example many other service may depend on an authetication service
    - The Microservices commonly cumminucate with each other through REST API or gRPC
    - Probably the most expensive option in terms of costs
- **Self Contained Services Architecture:**
    - The base idea is the same as the Microservices Architecture but we aim to cut the communication between services
    - We usually split the app into self container services but we also bundle common functionality to each service like authentication
    - We still use separate databases for these services
    





## Microservices Exercise
- There are 2 microservices:
    - **web_app** (/resources/web_app) scale: 5 pods
    - **auth_api** (/resources/auth_api) scale: 3 pods
- Scale each microservice horizontally
- Dockerize the two microservice servers (mongoose version coming soon)
- Use the AWS ECR service to store your Docker images and upload the Docker images to your ECR repository
- Create a Mongoose Database for each microservice
- Use namespaces, each micro service goes to a dedicated namespace, better for organization purposes
- For now you can use  Deployment Kuberentes object for databases but we will change these later for Statefulset
- Use kubectl to run commands in a specific pod and use curl to access a different microservice from the entered pod
- Use the DNS name when you curl for a micro service
- [Note] Pay attention to how EKS scales, you should be seeing new Worker Nodes (EC2 instances) being created dynamically as you increase the number of replicas for the deployments
- [Note] At this point you can get away with creating the following Kuberentes objects:
    - Deployment
    - Service
    - Namespace

- [Level-Medium] Replace the database Deployments with Statefulsets and use a PersistentVolumeClaim to request an EBS volume for the database
    - As you are creating these colume claims keep checking your volume claims and check their behavior when you delete the database: `kubectl get pvc -n the_namespace`
    - I recommend you to pre-create a StorageClass kuberentes object and use it when you are about to use PersistentVolumeClaim
    - You may have to do a tiny bit of research about how these Objects look like but they should work out of the box because the EBS-CSI is already installed to do the background heavy lifting
- [Level-Medium] Use a Kubernetes Secret to store the username and password for the databases, at this time it's enough if you base64 encode them
- [Level-Medium] Store the connection string for the database in the Kuberentes Secret as well, you can just base64 encode them for now and pass it to your server nodes as environmental variables
- [Note] Keep the related Kuberentes Objects in the same Namespace for better organization, namespaces DO NOT provide network isolation :)

---
THIS TASK IS TO BE EXTENDED IN THE FUTURE AND CAN POTENTIALLY BE A CV PROJECT AS IT GROES

