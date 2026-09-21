@echo off
setlocal
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or is not on PATH. Install Node.js 20 or newer, then retry.
  pause
  exit /b 1
)
if not exist .env.local (
  if exist .env.example copy /Y .env.example .env.local >nul
)
echo Installing NURI Labs dependencies...
call npm install
if errorlevel 1 (
  echo Dependency installation failed. Check internet access and Node.js installation.
  pause
  exit /b 1
)
echo.
echo NURI Labs local development server starting. Open http://localhost:3000
call npm run dev
