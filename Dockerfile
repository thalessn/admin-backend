FROM node:18.14.2-slim

RUN apt update && apt install -y --no-install-recommends \
  git \
  default-jre \
  procps

RUN npm install -g @nestjs/cli@8.2.5

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ] 