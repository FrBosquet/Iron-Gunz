FROM node:9
RUN useradd -U -m admin

ENV HOME=/home
COPY package.json $HOME/server/
RUN chown -R admin:admin $HOME
USER admin
WORKDIR $HOME/server
RUN npm install

USER root
COPY . $HOME/server
RUN chown -R admin:admin $HOME/*
USER admin

EXPOSE 4343

CMD ["npm", "run", "dev"]