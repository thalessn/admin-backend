FROM node:18.14.2-slim

RUN apt update && apt install -y --no-install-recommends \
  git \
  default-jre

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

USER node

WORKDIR /home/node/app

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ] 