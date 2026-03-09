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

## Running with Docker

1. **Clone the repository and navigate to the project directory**

2. **Create the `.env` file** with your configuration

3. **Build and run the containers:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - Frontend: http://localhost
   - API: http://localhost/api/
   - Admin: http://localhost/admin/

## Development Setup (without Docker)

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
The front end expects the API to be available under `/api`. When running locally you can either let Django serve the vanilla HTML or configure a proxy to `http://localhost:8000`.
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

## Run Locally (without Docker)
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Visit: http://localhost:8000

## Run with Docker
```bash
docker-compose up --build
```
Visit: http://localhost:8000

## Run with Docker (standalone)
```bash
docker build -t notes-app .
docker run -p 8000:8000 notes-app
```
# notes-application
