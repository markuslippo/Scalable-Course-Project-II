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