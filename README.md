# Homepage

Personal homepage for shiels.net.au.

## Debugging

1. Install the project dependencies.

```
npm install
```

2. Build and watch the project in debug mode.

```
npm run watch
```

3. Run the reverse proxy to host the site on http://localhost:8080.

```
docker compose up
```

## Deploying

1. Build the project in release mode.

```
npm run build
```

2. Initialise and apply the Terraform resources.

```
terraform init
terraform apply
```
