# WatchTower

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5+-lightgrey)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6+-purple)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-5+-red)](https://redis.io/)

WatchTower is a full-stack project that combines an Express.js backend with a React + Vite frontend. The backend provides movie discovery APIs powered by TMDB, user authentication, JWT refresh flow, Redis caching and Prisma database access. The frontend is currently initialized as a Vite + React starter application.

## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- Prisma
- PostgreSQL
- Redis
- JWT (`jsonwebtoken`)
- Axios
- Bcrypt
- Joi
- Nodemailer
- Dotenv
- Nodemon

### Frontend
- React
- Vite
- ESLint

### Banco de Dados
- PostgreSQL
- Redis

## O que já está implementado

- Autenticação de usuários com JWT e refresh token.
- Logout com blacklist de token usando Redis.
- Cadastro de usuário com validação de e-mail e usuário únicos.
- Atualização de perfil, exclusão de conta e alteração de senha.
- Recuperação de senha por token (`forgot-password` / `reset-password`).
- Endpoints de filmes e gêneros integrados à API TMDB.
- Cache Redis para dados de filmes populares, em alta e gêneros.
- Tratamento unificado de erros com middleware.
- Validação de request bodies e parâmetros usando Joi.
- Estrutura modular com controllers, services, repositórios, middlewares e validações.

## Arquitetura do Projeto

```
WatchTower/
├── Backend/                          # Backend Node.js + Express
│   ├── prisma/                       # Prisma schema e migrations
│   ├── src/
│   │   ├── controllers/              # Handlers de requisições
│   │   │   ├── database/             # Autenticação e usuários
│   │   │   ├── genre.controller.js   # Gêneros TMDB
│   │   │   └── movie.controller.js   # Endpoints de filmes
│   │   ├── lib/                      # Cache e Prisma client
│   │   ├── middlewares/              # Autenticação, validação e erros
│   │   ├── repositories/             # Acesso a dados com Prisma
│   │   ├── routes/                   # Rotas REST
│   │   ├── services/                 # Lógica de negócio e integrações
│   │   ├── utils/                    # JWT e AppError
│   │   └── index.js                  # Entrada do servidor
├── Frontend/                         # Frontend React + Vite
│   ├── src/                          # Código-fonte React
│   ├── index.html                    # Template HTML
│   ├── vite.config.js                # Configuração do Vite
│   └── package.json                  # Dependências frontend
└── README.md                         # Documentação do projeto
```

## Estrutura principal do Backend

- `src/index.js`: inicializa o servidor Express e conecta o Redis.
- `src/routes/`: define todas as rotas da API.
- `src/controllers/`: implementa o tratamento das rotas.
- `src/services/`: integrações com TMDB, Redis e lógica de autenticação.
- `src/repositories/`: abstração de persistência com Prisma.
- `src/middlewares/`: validação, autenticação e tratamento de erros.
- `prisma/schema.prisma`: modelo de dados atual (User).

## Endpoints disponíveis

### Autenticação e usuário

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`
- `GET /api/users`
- `POST /api/users`
- `GET /api/users/me`
- `PUT /api/users/me`
- `DELETE /api/users/me`
- `PATCH /api/users/me/password`
- `POST /api/users/forgot-password`
- `POST /api/users/reset-password`
- `GET /api/users/:id` (ADMIN)
- `DELETE /api/users/:id` (ADMIN)

### Filmes e gêneros

- `GET /api/movies/popular?page=1`
- `GET /api/movies/upcoming?page=1`
- `GET /api/movies/search?query=...&year=...&page=...`
- `GET /api/movies/trending/day`
- `GET /api/movies/trending/week`
- `GET /api/movies/:id`
- `GET /api/movies/:id/recommendations?page=1`
- `GET /api/movies/:id/credits`
- `GET /api/genres`

## Como rodar o projeto

### 1. Backend

```powershell
cd Backend
npm install
```

Crie um arquivo `.env` a partir de `Backend/.env.example` e preencha as variáveis necessárias.

Exemplo de variáveis importantes:

```dotenv
TMDB_API_KEY=your_tmdb_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/watchtower
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=1d
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=...
EMAIL_PASS=...
EMAIL_FROM=...
FRONTEND_URL=http://localhost:5173
REDIS_URL=redis://localhost:6379
```

Em seguida, execute as migrações e o seed:

```powershell
npx prisma migrate dev
npx prisma db seed
```

Inicie o backend:

```powershell
npm run dev
```

O servidor será iniciado em `http://localhost:3000` por padrão.

### 2. Frontend

```powershell
cd Frontend
npm install
npm run dev
```

O frontend será servido pelo Vite, geralmente em `http://localhost:5173`.

## Observações sobre o Frontend

A aplicação frontend está configurada com React + Vite, mas atualmente mantém o template padrão de inicialização. Ainda não há integrações visuais específicas implementadas para as APIs de backend.

## Próximos passos recomendados

- Construir a interface de usuário React para login, cadastro, perfil e navegação de filmes.
- Conectar o frontend aos endpoints de filmes, gêneros e autenticação.
- Implementar rotas protegidas no frontend e gerenciamento de tokens.
- Expandir o modelo de dados Prisma para assistir a listas, posts ou outras entidades sociais.
- Adicionar testes unitários e de integração no backend e no frontend.
- Documentar a API com Swagger ou OpenAPI.

## Observações importantes

- A modelagem atual do banco contém apenas o modelo `User` no `prisma/schema.prisma`.
- O backend já está preparado para cache Redis e integração com a API TMDB.
- O projeto está organizado para suportar expansão rápida em recursos de mídia e social.