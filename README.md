# TroneAssignment


Here’s a clear and concise **README.md** template for your Dockerized Laravel and Next.js app:

---

# **Dockerized Laravel + Next.js Application**

This project contains a Laravel backend and a Next.js frontend, both running in Docker containers. The setup uses Docker Compose to manage services like PHP, Node.js, and MySQL.

---

## **Features**
- 🐘 **Laravel** backend (PHP 8.2, Composer)
- ⚛️ **Next.js** frontend (Node.js 18)
- 🛢️ **MySQL** database (v8)
- 🐳 Easy local development with Docker Compose

---

## **Requirements**
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## **Setup Instructions**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Add `.env` Files
- **For Laravel**: Create `backend/.env` and configure the environment:
  ```env
  APP_NAME=Laravel
  APP_ENV=local
  APP_KEY=base64:YourKeyHere
  APP_DEBUG=true
  APP_URL=http://localhost:8000

  DB_CONNECTION=mysql
  DB_HOST=db
  DB_PORT=3306
  DB_DATABASE=laravel
  DB_USERNAME=root
  DB_PASSWORD=root
  ```
- **For Next.js**: Create `frontend/.env.local` and configure it:
  ```env
  NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
  ```

### 3. Start the Containers
Run the following command from the project root:
```bash
docker-compose up --build
```

---

## **Access the Services**
- Laravel API: [http://localhost:8000](http://localhost:8000)
- Next.js App: [http://localhost:3000](http://localhost:3000)
- MySQL: `localhost:3306` (Username: `root`, Password: `root`)

---

## **Development Workflow**

### Laravel Backend
1. Access the container:
   ```bash
   docker exec -it laravel-backend bash
   ```
2. Run Laravel commands:
   ```bash
   php artisan migrate
   php artisan tinker
   ```

### Next.js Frontend
- Hot-reloads automatically when files are modified.
- To install new packages:
  ```bash
  docker exec -it nextjs-frontend bash
  npm install <package-name>
  ```

---

## **Database Management**
The MySQL database runs in a container and persists data using the `db-data` volume. 

If you need to reset the database:
1. Stop the containers:
   ```bash
   docker-compose down
   ```
2. Remove the volume:
   ```bash
   docker volume rm <project-name>_db-data
   ```
3. Start the containers again:
   ```bash
   docker-compose up --build
   ```

---

## **Folder Structure**
```
project/
├── backend/         # Laravel project files
│   ├── .env         # Laravel environment file
│   ├── Dockerfile   # Laravel container setup
│   └── ...
├── frontend/        # Next.js project files
│   ├── .env.local   # Next.js environment file
│   ├── Dockerfile   # Next.js container setup
│   └── ...
├── docker-compose.yml # Docker Compose configuration
```

---

## **Troubleshooting**

### Common Issues
1. **"Port already in use"**: Make sure nothing else is running on ports `8000` or `3000`.
2. **Database errors**: Ensure your Laravel `.env` file matches the database configuration in `docker-compose.yml`.

### Logs
To view logs for a service:
```bash
docker logs <service-name>
```
Example:
```bash
docker logs laravel-backend
```

---

## **Future Enhancements**
- Add Nginx for production-ready deployment.
- Set up CI/CD pipelines for automated deployment.
