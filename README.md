# Cineverse

A modern, minimal movie booking platform built with Spring Boot and React.

## Prerequisites
- **JDK 17+**
- **Node.js 18+**
- **PostgreSQL** (Create a database named `cineverse`)

## Setup
1. **Database**: Ensure PostgreSQL is running and a database named `cineverse` exists.
2. **Backend**: Navigate to `cineverse-api` and run:
   ```bash
   ./gradlew bootRun
   ```
3. **Frontend**: Navigate to `cineverse-ui` and run:
   ```bash
   npm install
   npm start
   ```

## Features
- Secure JWT Authentication
- Modern Dark-mode UI (Tailwind CSS)
- BookMyShow-style Seat Selection Flow
- Role-Based Access Control
