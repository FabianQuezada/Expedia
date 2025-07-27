# EXPEDIA

> Transformando el turismo. Empoderando experiencias en cada destino.

![last commit](https://img.shields.io/github/last-commit/FabianQuezada/Expedia?style=for-the-badge)
![typescript](https://img.shields.io/badge/TypeScript-64.8%25-blue?style=for-the-badge)
![languages](https://img.shields.io/github/languages/count/FabianQuezada/Expedia?style=for-the-badge)

---

### Tecnologías utilizadas

<p align="center">
  <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white"/>
  <img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white"/>
  <img src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeORM-FF3C00?style=for-the-badge&logo=typeorm&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/tsnode-3178C6?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
</p>

---

## Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Comenzando](#-comenzando)
  - [Requisitos Previos](#-requisitos-previos)
  - [Instalación](#-instalación)
  - [Pruebas](#-pruebas)
  - [Uso](#-uso)
- [Funcionalidades](#-funcionalidades)
- [Roles del Equipo](#-roles-del-equipo)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Despliegue](#-despliegue)
- [Licencia](#-licencia)

---

## Descripción General

**Expedia** es una plataforma web de reservas de experiencias turísticas personalizadas. Permite a los usuarios buscar, comparar y reservar actividades en distintos destinos, mientras que los proveedores pueden gestionar sus servicios en tiempo real.

### Objetivo del Proyecto

- Arquitectura modular en NestJS con endpoints para experiencias, usuarios y reseñas
- API REST con consumo en tiempo real desde Angular
- Autenticación con JWT y control de roles
- Sistema de pagos y aplicación de descuentos dinámicos
- SPA optimizada con Angular y Bootstrap

---

## Comenzando

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js ](https://nodejs.org)
- [Angular CLI](https://angular.io)
- [NestJS CLI](https://docs.nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- Git

---

### Instalación

#### Clonar el repositorio

```bash
git clone https://github.com/FabianQuezada/Expedia.git
cd Expedia
```

---

### Backend (NestJS)

```bash
cd backend
npm install
cp .env.example .env  # crea el archivo de variables de entorno
npm run start:dev
```

> Accede a la documentación Swagger en: `http://localhost:3000/api`

---

### Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

> Abre en tu navegador: `http://localhost:4200`

---

### Pruebas

#### Frontend

```bash
ng test
```

#### Backend

```bash
npm run test
```

---

### Uso

Una vez iniciado:

- Visualiza las experiencias disponibles
- Reserva con formulario validado
- Recibe resumen y confirmación
- Reprograma o cancela según sea necesario
- Accede como administrador a gestión de datos

---

## Funcionalidades

### Usuario

- Filtro por categoría, precio, ubicación y valoraciones
- Sistema de reseñas y comentarios
- Reprogramación de reservas
- Pago seguro con tarjetas o PayPal

### Proveedor/Admin

- Gestión de disponibilidad y condiciones
- Análisis de demanda para descuentos dinámicos
- Panel de control para reservas y usuarios

---

##  Roles del Equipo

| Rol                | Integrante         |
|------------------- |--------------------|
|  Frontend        | Andrea Navia       |
| Frontend        | Jorge Caceres      |
| Frontend         | Joshua Jara        |
| Frontend         | Liliana Galvez    |
| Backend         | Fabian Quezada    |
| Backend         | Katalina Oviedo    |
| Backend         | Melisa Huanca    |


| Rol                | Integrante         |
|------------------- |--------------------|
|  Scrum Master      | Fabian Quezada     |
|  Product Owner     | Melisa Huaca       |
|  Developer         | Andrea Navia       |
|  Developer         | Jorge Caceres      |
|  Developer         | Joshua Jara        |
|  Developer         | Liliana Galvez     |
|  Developer         | Katalina Oviedo    |




---

## Arquitectura del Proyecto

```
Expedia/
├── backend/           # NestJS
│   ├── src/
│   └── ...
├── frontend/          # Angular
│   ├── src/app/
│   └── ...
├── docs/              # Documentos, ERD, mockups
└── README.md
```

---
---

## Licencia

Proyecto académico sin fines de lucro.  
© 2025 – Universidad de Tarapacá – Taller de Aplicaciones Web

---

<p align="center"><i>Desarrollado con ❤️ por el equipo Expedia</i></p>
