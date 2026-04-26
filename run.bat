@REM teszt

@echo off

echo Building backend image...
docker build -t f1-backend ./backend

echo Building frontend image...
docker build -t f1-frontend ./frontend

echo Stopping old containers if running...
docker rm -f f1-backend-container f1-frontend-container 2>nul

echo Starting backend on port 3000...
docker run -d --name f1-backend-container -p 3000:3000 f1-backend

echo Starting frontend on port 8080...
docker run -d --name f1-frontend-container -p 8080:80 f1-frontend

echo.
echo Done! Open http://localhost:8080 in your browser.
