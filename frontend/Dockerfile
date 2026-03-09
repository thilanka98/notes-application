# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev deps so build tools like vite are available)
# we install everything here, then the final image only contains the built artifacts
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# (No custom nginx config needed here; the reverse-proxy service handles routing)

# Expose port for the static-server container
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]