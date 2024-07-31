#########################
### build environment ###
#########################

# Stage 1: Builder
FROM node:18.19.1 AS builder

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --production --legacy-peer-deps
# Install Angular CLI globally
RUN npm install -g @angular/cli@17

# add app
COPY . /usr/src/app

# generate build
RUN npm run build

##################
### production ###
##################

# Stage 2: Nginx
FROM nginx:1.13.9-alpine

# copy artifact build from the 'build environment'
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
