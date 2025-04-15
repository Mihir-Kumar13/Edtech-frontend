# Stage 1: Build the application
FROM node:18-alpine AS builder 
# Set the working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json package-lock.json* ./
# Use npm ci for faster, more reliable installs in CI/CD
RUN npm ci

# Now copy the rest of the application code
COPY . .

# Set environment variables if needed (e.g., for Vite)
# ENV VITE_API_URL=/api

# Build the Vue.js application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine
# Copy built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Optional: Copy a custom Nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]