#########################
### build environment ###
#########################

# Stage 1: Builder
FROM node:18.19.1 AS builder

RUN apt-get update && apt-get install -y ca-certificates

# Set working directory
WORKDIR /usr/src/app

# Add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install Angular CLI globally
RUN npm install -g @angular/cli@17

# Copy application code and dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --legacy-peer-deps
# add app
COPY . /usr/src/app

# Build the application
RUN ng build --configuration production

##################
### production ###
##################

# Stage 2: Nginx
FROM nginx:1.13.9-alpine

# Copy built application from the 'build environment'
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
