FROM node:18-alpine AS builder

WORKDIR /app

# Copia dependencias e instala
COPY package*.json ./
RUN npm install

# Copia todo el código y compila TypeScript
COPY . .
RUN npm run build

# Segunda etapa: imagen liviana para producción
FROM node:18-alpine

WORKDIR /app

# Copia solo lo necesario desde la etapa anterior
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["npm", "start"]
