# Notes CRUD App

A full-stack notes application with Django REST API backend and React frontend, containerized with Docker.

## Stack
- **Backend**: Django 4.2 + Django REST Framework
- **Database**: PostgreSQL
- **Frontend**: React + Vite
- **Reverse Proxy**: Nginx
- **Containerization**: Docker + Docker Compose

## Project Structure
```
notes-app/
├── .env                    # Environment variables
├── docker-compose.yml      # Docker services configuration
├── backend/Dockerfile     # Backend container
├── frontend/Dockerfile    # Frontend container
├── nginx.conf            # Nginx configuration
├── README.md
├── backend/               # Django application
│   ├── config/
│   ├── notes/
│   ├── manage.py
│   └── requirements.txt
└── frontend/              # React application
    ├── src/
    ├── public/
    └── package.json
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Django Configuration
DJANGO_SECRET_KEY=your-super-secret-key-change-this-in-production
DEBUG=False
DJANGO_SETTINGS_MODULE=config.settings

# Database Configuration
DB_NAME=notes_db
DB_USER=notes_user
DB_PASSWORD=secure_password_change_this
DB_HOST=db
DB_PORT=5432

# AWS Configuration (used by file uploads)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_STORAGE_BUCKET_NAME=your_bucket_name
AWS_S3_REGION_NAME=us-east-1

# optional: you can also set AWS_S3_SIGNATURE_VERSION, AWS_S3_ENDPOINT_URL, etc.

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://localhost

# File uploads
# Notes support an optional attachment; uploaded files will be stored in the S3 bucket
# configured above.  When running locally you may leave the AWS settings blank and
# uploaded files will be saved using the default Django storage (local filesystem).
```

## Running with Docker (development)

1. **Clone the repository and cd into it**

2. Make sure you have a `.env` in the project root as described above.

3. Build and start the services:
   ```bash
   docker-compose up --build
   ```
   or detach:
   ```bash
   docker-compose up --build -d
   ```

4. Verify everything is healthy:
   ```bash
   docker-compose ps
   docker-compose logs -f backend
   ```

5. **Access the application**
   - Frontend/proxy: http://localhost/
   - API: http://localhost/api/
   - Django admin: http://localhost/admin/

> In dev mode the backend volume is mounted so you can edit Python files and see changes instantly. Static assets are served from a local volume.

## Development Setup (without Docker)

You can work on backend and frontend independently.

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
# create a `.env` file in the project root or export the vars directly
python manage.py migrate
python manage.py runserver        # starts at http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev                       # starts Vite dev server on :3000
```

The React app expects the API at `/api`. In development you can either:

1. Configure Vite’s proxy to forward `/api` to `http://localhost:8000` (see `vite.config.js`), or
2. Run the frontend from the Django templates directory by visiting `http://localhost:8000`.
## API Endpoints

- `GET /api/notes/` - List all notes
- `POST /api/notes/` - Create a new note
- `GET /api/notes/{id}/` - Get a specific note
- `PUT /api/notes/{id}/` - Update a note
- `DELETE /api/notes/{id}/` - Delete a note

## Features

- ✅ Create, read, update, and delete notes
- ✅ Responsive React frontend
- ✅ PostgreSQL database
- ✅ Docker containerization
- ✅ Nginx reverse proxy
- ✅ Environment-based configuration
- ✅ CORS support
- ✅ Static file serving

## Security Notes

- Change the `DJANGO_SECRET_KEY` in production
- Use strong passwords for database credentials
- Configure AWS credentials for production file storage
- Set `DEBUG=False` in production
- Use HTTPS in production
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    ├── notes/
    │   ├── models.py         # Note model
    │   ├── serializers.py    # DRF serializer
    │   ├── views.py          # ModelViewSet
    │   └── urls.py           # Router + endpoints
    └── templates/
        └── index.html        # Single-page frontend
```

## Data Model
```python
class Note(models.Model):
    id          # Auto PK
    title       # CharField (required)
    description # TextField (optional)
    created_at  # DateTimeField (auto)
    updated_at  # DateTimeField (auto)
```

## API Endpoints
| Method | URL              | Action        |
|--------|-----------------|---------------|
| GET    | /api/notes/      | List all      |
| POST   | /api/notes/      | Create        |
| GET    | /api/notes/{id}/ | Retrieve one  |
| PUT    | /api/notes/{id}/ | Update        |
| DELETE | /api/notes/{id}/ | Delete        |

## Production Deployment

In production you should build and publish the images, then run using the `docker-compose.prod.yml` file or equivalent orchestration (ECS, Kubernetes, etc.).

1. **Build & push images to your registry:**
   ```bash
   docker build -t yourhubuser/notes-backend:latest backend/
   docker build -t yourhubuser/notes-frontend:latest frontend/
   docker login       # login to Docker Hub or your registry
   docker push yourhubuser/notes-backend:latest
   docker push yourhubuser/notes-frontend:latest
   ```

2. **Prepare production configuration** (set all environment variables securely, ensure `DEBUG=False`, tighten `CORS_ALLOWED_ORIGINS`, rotate `DJANGO_SECRET_KEY`, etc.).

3. **Start the stack** using the production compose file:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

   The `prod` file references the published images and does not mount source code volumes.

4. **Verify everything**
   ```bash
   docker-compose -f docker-compose.prod.yml ps
   docker-compose -f docker-compose.prod.yml logs -f backend
   ```

5. **Networking & security**
   - Only expose ports 80/443 to the public internet.
   - Restrict the database port to the backend’s security group.
   - Use HTTPS via your proxy (nginx or cloud load balancer).

> This repository separates development and production configuration; no secrets are checked into source control, and environment variables drive all sensitive settings.

# notes-application
# notes-application
# notes-application
# notes-application
# notes-application
# notes-application
# notes-application
