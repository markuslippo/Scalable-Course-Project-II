# Running instructions

First, 
  -  cd qa-ui
  -  npm install


Then to run in development mode:
  -   docker compose up

Or production mode:
  -  docker compose --profile migrate --profile pgadmin -f docker-compose.prod.yml up


Then, on the browser, navigate to    http://localhost:7800


To run tests on a running development mode:
  -  docker compose run --rm --entrypoint npx e2e-playwright playwright test


Unfortunately I was not able to get the nginx ingress working, perhaps another reviewer could tell how it should have been done?  
In essence, the steps for starting the application in kubernetes would be:


  First build the necessary images: 

  cd qa-ui
  minikube image build -t qa-ui -f /Dockerfile .

  cd qa-api
  minikube image build -t qa-api -f /Dockerfile .

  cd llm-api
  minikube image build -t llm-api -f /Dockerfile .

  cd flyway
  minikube image build -t qa-api-database-migrations -f /Dockerfile .



  Then, apply the .yaml files: 
  cd kubernetes
  kubectl apply -f qa-ui.yaml
  kubectl apply -f qa-api.yaml
  kubectl apply -f llm-api.yaml

  kubectl apply -f qa-api-deployment-hpa.yaml

  kubectl apply -f qa-api-database-cluster.yaml
  kubectl apply -f qa-api-database-migration-job.yaml

  kubectl apply -f nginx.yaml


  But because I can't get the application to work, I don't have further steps.