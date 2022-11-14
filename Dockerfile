From nginx

WORKDIR /usr/share/app

RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash -
RUN apt-get install -y nodejs

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

RUN rm -r /usr/share/nginx/html/*

EXPOSE 3000

RUN cp -a build/. /usr/share/nginx/html