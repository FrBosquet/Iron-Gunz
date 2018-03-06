FROM node:9
RUN useradd -U -m admin

ENV HOME=/home
COPY package.json $HOME/client/
RUN chown -R admin:admin $HOME
USER admin
WORKDIR $HOME/client
RUN npm install

USER root
COPY . $HOME/client
RUN chown -R admin:admin $HOME/*
USER admin

EXPOSE 3000

CMD ["npm", "start"]