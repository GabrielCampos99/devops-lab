#multi-stage
#1 etapa: Cria a imagem de build.
# Usa o Node.js versão 20, baseado em Alpine Linux.
# AS builder nomeia essa etapa como "builder" (para usar mais tarde).
FROM node:20-alpine AS builder

#Dentro do container, tudo vai acontecer na pasta /app.
WORKDIR /app

#Copia package.json e package-lock.json para dentro do container.
#Isso permite instalar só as dependências antes de copiar o resto.
COPY package*.json ./

#Instala as dependências do projeto.
RUN npm install

#Copia todo o conteúdo da pasta server/ (onde está o Dockerfile) para o container.
COPY . .

#Roda o script build (que geralmente é tsc) e gera os arquivos JS em dist/.
RUN npm run build

#2 etapa: Cria a imagem final.
#Reinicia com uma imagem limpa e leve.
#Não leva arquivos desnecessários (como src/, .ts, etc.)
FROM node:20-alpine

#Define novamente a pasta de trabalho no novo container.
WORKDIR /app

#Copia só o necessário do builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

#Roda node dist/main.js, que é a entrada padrão de apps NestJS compilados.
CMD ["node", "dist/main"]
