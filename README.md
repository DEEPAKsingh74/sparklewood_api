# Human Chain AI Safety Incident Log API  

 
*Building a safer, more trustworthy, and human-centric digital world*  

## 📌 Overview  
Built with **Node.js, Express, TypeScript, PostgreSQL, and Redis**, this API offers efficient data handling, caching for performance, and containerized deployment via **Docker**.  

---  

## 🚀 Features  

✔ **CRUD Operations** – Create, Read, Update, and Delete AI safety incident records.   
✔ **Caching Layer** – Redis integration for faster response times on frequent queries.  
✔ **Type-Safe API** – Built with TypeScript for better maintainability and reliability.  
✔ **Containerized Deployment** – Easy setup with Docker and Docker Compose.  
✔ **Scalable & Secure** – Designed with best practices for security and future scalability.  

---  

## 🛠 Tech Stack  

- **Backend**: Node.js, Express, TypeScript, zod  
- **Database**: PostgreSQL (persistent storage)  
- **Caching**: Redis (for performance optimization)  
- **Containerization**: Docker, Docker Compose   

---  

## 🚀 Installation & Setup  

### Prerequisites  
- Docker ([Install Docker](https://docs.docker.com/get-docker/))  
- Docker Compose ([Install Docker Compose](https://docs.docker.com/compose/install/))  

### Steps to Run  (if installed from github)

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/DEEPAKsingh74/sparklewood_api.git
   cd sparklewood_api
   ```  

2. **Set Up Environment Variables**  
   Create `.env` file on the root directory and add these:  
   ```env
   POSTGRES_PASSWORD=Fj0<!.jR79p>wCWcl
   POSTGRES_DB=wood_db
   POSTGRES_USER=wood_user
   POSTGRES_PORT=5432

   PORT=8000

   REDIS_PORT=6379
   REDIS_URL=redis://redis:6379
   ```  

3. **Run with Docker Compose**  
   ```bash
   docker-compose up --build
   ```  
   The API will start at `http://localhost:8000`.  

4. **Verify the API**  
   ```bash
   curl http://localhost:8000/api/v1/health
   ```  
   Expected Response:  
   ```json
   { "status": "OK", "message": "AI Safety Log API is running" }
   ```  

### Steps to Run  (if have a zip file)

1. **Unzip the folder** 
2. **```cd <folder>```**
3. **Run with Docker Compose**  
   ```bash
   docker-compose up --build
   ```  
   The API will start at `http://localhost:8000`.  

4. **Verify the API**  
   ```bash
   curl http://localhost:8000/api/v1/health
   ```  
   Expected Response:  
   ```json
   { "status": "OK", "message": "AI Safety Log API is running" }

## 📡 API Usage  

### Endpoints  


### Create a new AI safety incident
- **Method**: `POST`
- **URL**: `/api/v1/incidents`
- **Description**: Create a new incident report.
- **Request Body**:
  ```json
  {
    "title": "string (512 chars)",
    "description": "string (optional)",
    "severity": "LOW | MEDIUM | HIGH (default LOW)"
  }
---

### List all incidents
- **Method**: `GET`
- **URL**: `/api/v1/incidents`
- **Description**: Retrieve a list of all incidents. Supports optional filtering.
- **Query Parameters (optional)**:
  | Name | Type | Description |
  |------|------|-------------|
  | `page` | number | current page you want |
  | `limit` | number | number of incidents per page |
  | `ordered` | boolean | `ASC` / `DSC` order |

---

### Get details of a specific incident
- **Method**: `GET`
- **URL**: `/api/v1/incidents/:id`
- **Description**: Retrieve detailed information about a specific incident.
- **Path Parameters**:
  | Name | Type | Description |
  |------|------|-------------|
  | `id` | string | ID of the incident |

---

### Delete an incident
- **Method**: `DELETE`
- **URL**: `/api/v1/incidents/:id`
- **Description**: Delete a specific incident by its ID.
- **Path Parameters**:
  | Name | Type | Description |
  |------|------|-------------|
  | `id` | string | ID of the incident |

### Example Request (Create Incident)  
```bash
curl -X POST http://localhost:8000/api/v1/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bias in Hiring Algorithm",
    "severity": "HIGH",
    "description": "AI model showed gender bias in candidate screening."
  }'
```  

---

## 📂 Project Structure

```plaintext
api/
├── dist/      # Build version of the api.
├── logs/      # Logs of the api.
├── node_modules/
├── src/       # Complete logic of the api resides here.
│   ├── config/   # contains configuration settings.
│   ├── infrastructure/   # has caching and database config.
│   ├── utils/    # helper functions resides here.
│   └── v1/     # version 1 of the api.
│       └── (API version 1 files)
│   ├── main.ts
│   └── server.ts     # main server folder which needs to start.
├── Dockerfile.dev
├── package-lock.json
├── package.json
├── tsconfig.json   # typescript configurations.
db-init/     # initial configuration of the database to seed.
.env
.gitignore
docker-compose-dev.yaml
LICENSE
README.md
```
---

## 🤝 Contributing  

We welcome contributions! Please follow these steps:  
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature/your-feature`).  
3. Commit your changes (`git commit -m 'Add some feature'`).  
4. Push to the branch (`git push origin feature/your-feature`).  
5. Open a Pull Request.  

### Reporting Issues  
If you find a bug, please open an issue with details on how to reproduce it.  

---  

## 📜 License  

This project is licensed under **MIT License**. See [LICENSE](LICENSE) for details.  

---  


🚀 **Let’s build a safer AI future together!**# sparklewood_api
