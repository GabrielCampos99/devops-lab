docker-compose up --build
- 🏗 Cria a imagem (baseada no Dockerfile)
- 📦 Instala as dependências
- 🔨 Compila o projeto
- ▶️ Inicia o servidor NestJS

----
Parar container. <br>
`docker-compose down`
- Parar o container
- Remover a rede criada
- Não remove imagens nem volumes

Remover tudo; <br>
- `docker system prune -a`
- ⚠️ Isso remove imagens e containers não utilizados, então use com cautela.

