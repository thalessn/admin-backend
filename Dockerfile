FROM node:18.14.2-slim

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null"]