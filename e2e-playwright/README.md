# Running end to end tests

Run the E2E tests with the following command.

```
docker compose up 
-->
docker compose run --entrypoint=npx e2e-playwright playwright test
```