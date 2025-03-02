# BharatFD_Assesment

This project provides a backend system for managing Frequently Asked Questions (FAQs) and admin users. It includes Redis caching for performance optimization and supports multilingual queries.

## Features

- **Admin Module**: Secure authentication and authorization for admins.
- **FAQ Module**: CRUD operations for FAQs with language-based translation.
- **Redis Caching**: Stores FAQs for **1 hour** per unique language query to enhance performance.
- **Multilingual Support**: If a requested language is not available, by defaults language is set to **English**.
- **Dockerized Deployment**: Easily deployable with Docker and Nginx on AWS EC2.
- **Deployment Link**: https://faq.alpha-dev.tech

---

##  API Endpoints

### Redis Management
| Method | Endpoint             | Description | \
|--------|----------------------|-------------|\
| `GET`  | `/api/radis/clear`   | Clears all cached data |

### 📖 FAQ Management
| Method  | Endpoint                    | Description |\
|---------|-----------------------------|-------------|\
| `GET`   | `/api/faq/all?lang={lang}`  | Retrieves FAQs in the specified language (defaults to English if not available) |\
| `POST`  | `/api/faq/create`           | Creates a new FAQ (requires authorization) |\
| `PUT`   | `/api/faq/update`           | Updates an existing FAQ |\
| `DELETE` | `/api/faq/delete`           | Deletes a single FAQ |\
| `DELETE` | `/api/faq/alldelete`        | Deletes all FAQs |

### Admin Authentication
| Method  | Endpoint            | Description |\
|---------|---------------------|-------------|\
| `POST`  | `/api/admin/signup` | Registers a new admin and returns a token |\
| `POST`  | `/api/admin/signin` | Logs in an admin and returns a token |

---

## Caching Mechanism
- **Redis stores FAQs for 1 hour** per unique language query.
- Cached responses improve performance and reduce database load.

---

## Testing

- **Language Detection Tests**:  
  - ✅ If a specific language (`lang`) is provided in the query, it retrieves the FAQs in that language.  
  - ✅ If the language is unavailable, it falls back to English.  
  - ✅ The API supports **nearly all languages** for translation.  


---

🌐 Deployment Steps:

1. **Create a Dockerfile** to containerize the application.
   
2. **Use a `docker-compose.yml` file** to manage services.
   
3. **Deploy the container on an AWS EC2 instance:** 

4. Set up Nginx as a reverse proxy to handle SSL generation.

5. Attach a .tech domain using a DNS provider like Cloudflare
---
##  Setup Instructions

### Clone the Repository:
```
 git clone "https://github.com/devRojha/BharatFD_Assesment.git"
```

M1 - Docker People
```

 docker compose-up -d

```

M2 - Docker People
```

docker build -t backend-app .
docker run -p 8000:8000 backend-app

```
M3 - For Locally
```

npm install
npm run dev

```

For Testing 

```

npm test

```
