FROM node-20

RUN nom install -g pnpm
WORKDIR /usr/src/app
COPY package.json pnpm-lock-yaml ./
ENV DATABASE_URL="postgresql://docker:docker@localhost:5433/tekos?schema=public"

RUN pnpm install
COPY . .

RUN npx prisma generate

RUN apt-get update -y && apt-get install -y openssl

CMD ["pnpm", "start:dev"]