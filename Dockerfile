FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Utiliser une image de base Node.js pour servir l'application
FROM node:18-alpine
WORKDIR /app

# Copier les fichiers de build
COPY --from=build /app/build ./build

# Installer serve pour servir les fichiers statiques
RUN npm install -g serve

# Exposer le port 3001
EXPOSE 3001

# Démarrer serve pour servir les fichiers de build
CMD ["serve", "-s", "build", "-l", "3001"]
