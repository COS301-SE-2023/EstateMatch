FROM ghcr.io/puppeteer/puppeteer:21.4.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /dist/apps/api

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn build:prod
COPY . .
CMD ["yarn", "main.js"]