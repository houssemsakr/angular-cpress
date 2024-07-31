FROM node:18.19.1 AS builder

# Set the working directory
WORKDIR /usr/src/app

# Install Angular CLI globally
RUN npm install -g @angular/cli@17

# Copy package.json and package-lock.json if available
COPY package.json package-lock.json ./

# Clean npm cache
RUN npm cache clean --force

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN ng build --configuration production

# production environment
FROM nginx:1.13.9-alpine

# Copy built Angular app from the build stage
COPY --from=builder /usr/src/app/dist/angular-cypress /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
