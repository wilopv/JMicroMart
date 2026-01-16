# JMicroMart – Plataforma E-commerce con Microservicios

JMicroMart es una plataforma de e-commerce construida con una arquitectura basada en microservicios, utilizando Java (Spring Boot) en el backend y Angular en el frontend. El proyecto está organizado como un monorepo y representa un sistema completo con separación clara de responsabilidades y comunicación entre servicios.

El objetivo del proyecto es implementar una arquitectura escalable y mantenible, similar a la utilizada en aplicaciones modernas de comercio electrónico.

---

## Funcionalidades principales

- Backend basado en microservicios con Spring Boot
- API Gateway como punto de entrada único al sistema
- Comunicación REST entre servicios
- Frontend desarrollado en Angular
- Flujo de checkout con gestión de pedidos y datos de envío
- Entorno de ejecución local mediante Docker
- Separación de dominios por servicio

---

## Arquitectura

El sistema sigue una arquitectura de microservicios, donde el frontend se comunica con un API Gateway que enruta las solicitudes hacia los distintos servicios backend.

Flujo general:

Frontend (Angular)  
→ API Gateway  
→ Servicios Backend  
→ Base de datos por servicio  

Cada servicio es independiente, puede desplegarse de forma aislada y gestiona su propia persistencia.

---

## Stack tecnológico

### Backend
- Java 17+
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Validation
- Maven

### Frontend
- Angular
- TypeScript
- RxJS
- Angular Router

### Infraestructura
- Docker
- Docker Compose
- GitHub (monorepo)

---

## Estructura del repositorio

jmicro-mart/  
├── backend/  
│   ├── product-service/  
│   ├── order-service/  
│   ├── auth-service/  
│   └── api-gateway/  
├── frontend/  
│   └── angular-app/  
├── docker-compose.yml  
├── README.md  
└── docs/  

---

## Ejecución local

### Requisitos
- Docker
- Docker Compose
- Java 17+ (opcional)
- Node.js (para desarrollo del frontend)

### Levantar el sistema

docker-compose up --build

Los servicios backend y el frontend se iniciarán automáticamente.

---

## Testing

- Las APIs pueden probarse utilizando Postman
- Existe una colección de Postman para validar los endpoints principales

---

## Consideraciones técnicas

- Cada microservicio gestiona su propio dominio y base de datos
- La comunicación entre servicios se realiza mediante HTTP REST
- El API Gateway centraliza el acceso desde el frontend
- El frontend no se comunica directamente con los servicios internos

---

## Autor

Desarrollado por wilopv

---

