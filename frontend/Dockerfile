FROM node:20 AS build-stage
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV VITE_BACKEND_URL=https://rosscomerdemo.com/api
ENV VITE_STRIPE_KEY=pk_test_51RC4S5PpMv3kNXpyGvzoqOhbFw9QwS3Uu4mPIdtxFnFx1DL28b6XivwXKD4DbkW5KK7Gk61tQMrw5PeqHMY67feK00EdnTY14Z
ENV HTTPS=true

RUN npm run build

FROM nginx:stable-alpine3.19-perl
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]