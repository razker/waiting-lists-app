From nginx

WORKDIR /usr/share/app

RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash -
RUN apt-get install -y nodejs

COPY package*.json ./

RUN npm install

ENV PORT=80
ENV REACT_APP_WAITING_SERVICE_URL=https://waiting-lists-fdt-service.onrender.com

COPY . .
RUN npm run build

RUN rm -r /usr/share/nginx/html/*

RUN cp -a build/. /usr/share/nginx/html