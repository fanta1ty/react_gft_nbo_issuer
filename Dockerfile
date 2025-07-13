FROM public.ecr.aws/docker/library/node:18.18.2-alpine3.18 AS builder

COPY . /app
WORKDIR /app

RUN npm install --ignore-scripts \
    && npm run build

FROM public.ecr.aws/docker/library/node:18.18.2-alpine3.18

COPY --from=builder /app /app
WORKDIR /app
RUN chown node:node ./
USER node

EXPOSE 3000
CMD ["npm", "run", "serve:build"]
