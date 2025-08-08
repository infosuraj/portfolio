FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Add a non-root user
RUN useradd --user-group --create-home --shell /bin/false appuser
USER appuser

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server.js"]