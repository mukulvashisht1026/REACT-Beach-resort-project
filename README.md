This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Beach Resort: a React (Create React App) site for browsing and filtering resort rooms.

## Status and TODO

Runs as-is. Quick start: `make deploy` (Docker, http://localhost:8087), or `npm install && npm start` (http://localhost:3000).

- Mock data: rooms come from the local `src/data.js` unless both `REACT_APP_API_SPACE` and `REACT_APP_ACCESS_TOKEN` are set. Then they're loaded from Contentful (`src/Contentful.js`).
- TODO: there is no booking flow; the rooms are browse-only.
- TODO: the rest of this README is the Create React App boilerplate.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Docker build and deployment

Run these commands from this repository's root. Requirements: Docker Engine or
Docker Desktop running, Docker Compose v2 with `--wait` support, and Make.
The first build needs internet access to download base images and dependencies.

### One-command build and run

```bash
make deploy
```

Open **http://localhost:8087**. This builds the image(s), starts containers in
the background, and waits for their health checks. Deployment targets your current
Docker context (normally your local machine); it does not create a cloud server.

```bash
make build      # Build without starting containers
make up         # Start previously built or loaded images
make status     # Show container health and ports
make logs       # Follow logs; Ctrl+C stops following logs
make stop       # Stop and remove this project's containers/network
```

Without Make, use `docker compose up -d --build --wait`.

### Port, architecture, and image name

```bash
make deploy PORT=9000
make deploy DOCKER_PLATFORM=linux/arm64
make deploy IMAGE_PREFIX=my-account IMAGE_TAG=v1
```

Default image: `mukul-local/beach-resort:latest`. Default platform: `linux/amd64`.
Use `linux/arm64` for ARM servers or native Apple Silicon execution. Keep the same
platform, prefix, tag, and port overrides when running later Make commands.
The website listens on port 8080 inside its container.

### Copy images to another Docker server

After a successful build, export this project's image(s):

```bash
make export IMAGE_ARCHIVE=beach-resort-images.tar
```

Copy `beach-resort-images.tar`, `compose.yaml`, and `Makefile` into a directory on the
target server. Source code is unnecessary for running the loaded images:

```bash
make load IMAGE_ARCHIVE=beach-resort-images.tar
make up
```

The server's CPU architecture must match the built images. Repeat any
`DOCKER_PLATFORM`, `IMAGE_PREFIX`, or `IMAGE_TAG` overrides used during the build.
To use a registry instead, tag and push the built image(s) to your registry, then
configure your container host to pull those tags. Registry publishing is manual.
For public HTTPS, configure a domain and TLS reverse proxy in your hosting platform.

### Application notes and verification

The default image uses bundled demo room data and requires no Contentful credentials. It builds the older CRA toolchain with the OpenSSL compatibility flag.

```bash
curl --fail http://localhost:8087/
```

Use the overridden port if you changed `PORT`. Check the app in a browser as well.

Docker builds and container runtime have not been verified in the preparation
environment because Docker daemon access was denied. Compose configuration and
Make command expansion are checked; a successful local build and health check
are still required.
