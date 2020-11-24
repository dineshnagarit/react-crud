FROM ubuntu:20.04

RUN apt-get update && apt-get install -y \
  git-core \
  curl \
  openjdk-8-jdk \
  python-software-properties \
  build-essential --fix-missing

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -E -

RUN apt-get install -y nodejs

COPY package*.json ./

RUN rm -rf /node-modules

RUN npm install

COPY . .

EXPOSE 3200
CMD [ "node", "index.js" ]