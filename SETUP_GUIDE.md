# راهنمای راه‌اندازی پروژه Building Management System

## فهرست مطالب
1. [پیش‌نیازها](#پیش‌نیازها)
2. [راه‌اندازی PostgreSQL](#راه‌اندازی-postgresql)
3. [راه‌اندازی Backend](#راه‌اندازی-backend)
4. [راه‌اندازی Frontend](#راه‌اندازی-frontend)
5. [اجرای تست‌ها](#اجرای-تست‌ها)
6. [API Documentation](#api-documentation)
7. [مشکلات رایج](#مشکلات-رایج)

## پیش‌نیازها

### نرم‌افزارهای مورد نیاز:
- Java 17 یا بالاتر
- Maven 3.6 یا بالاتر
- PostgreSQL 12 یا بالاتر
- Node.js 16+ و npm
- Git

### بررسی نسخه‌ها:
```bash
java -version
mvn -version
node -v
npm -v
psql --version
```

## راه‌اندازی PostgreSQL

### نصب PostgreSQL:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (با Homebrew)
brew install postgresql
brew services start postgresql

# Windows: دانلود از https://www.postgresql.org/download/windows/
```

### ایجاد دیتابیس:
```bash
# ورود به PostgreSQL
sudo -u postgres psql

# ایجاد دیتابیس و کاربر
CREATE DATABASE building_management;
CREATE USER modir_user WITH ENCRYPTED PASSWORD 'modir123';
GRANT ALL PRIVILEGES ON DATABASE building_management TO modir_user;
\q
```

### به‌روزرسانی پیکربندی:
در فایل `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/building_management
spring.datasource.username=modir_user
spring.datasource.password=modir123
```

## راه‌اندازی Backend

### 1. کلون پروژه:
```bash
cd /path/to/your/project
# پروژه در workspace قرار دارد
```

### 2. نصب وابستگی‌ها:
```bash
cd backend
mvn clean install
```

### 3. اجرای اپلیکیشن:
```bash
mvn spring-boot:run
```

### 4. بررسی اجرای موفق:
- API در دسترس در: `http://localhost:8080`
- Health check: `http://localhost:8080/actuator/health`

### 5. ساخت فایل JAR:
```bash
mvn clean package
java -jar target/building-management-backend-1.0.0.jar
```

## راه‌اندازی Frontend

### 1. نصب وابستگی‌ها:
```bash
cd /workspace
npm install
```

### 2. اجرای Frontend:
```bash
npm run dev
```

### 3. دسترسی به اپلیکیشن:
- در مرورگر: `http://localhost:5173`

### 4. ساخت برای Production:
```bash
npm run build
npm run preview
```

## اجرای تست‌ها

### تست‌های Backend:
```bash
cd backend

# اجرای تمام تست‌ها
mvn test

# اجرای تست‌های واحد
mvn test -Dtest=UserControllerTest

# اجرای تست‌های Integration
mvn test -Dtest=*IntegrationTest

# تولید گزارش پوشش کد (با JaCoCo)
mvn jacoco:report
```

### نتایج تست‌ها:
- گزارش HTML در: `backend/target/site/jacoco/index.html`
- تست‌های JSON: `backend/test-results.json`

## API Documentation

### Base URL:
```
http://localhost:8080/api
```

### Authentication:
تمام endpoints (به جز `/auth/**` و `/polls/**`) نیاز به JWT token دارند.

### Endpoints اصلی:

#### Authentication
- `POST /api/auth/login` - ورود کاربر

#### Users
- `GET /api/users` - لیست کاربران
- `GET /api/users/{id}` - جزئیات کاربر
- `POST /api/users` - ایجاد کاربر جدید
- `PUT /api/users/{id}` - به‌روزرسانی کاربر
- `DELETE /api/users/{id}` - حذف کاربر

#### Transactions
- `GET /api/transactions` - لیست تراکنش‌ها
- `GET /api/transactions/unit/{unitId}` - تراکنش‌های واحد
- `POST /api/transactions` - ایجاد تراکنش
- `PUT /api/transactions/{id}` - به‌روزرسانی تراکنش
- `GET /api/transactions/summary` - خلاصه مالی

#### Maintenance Tickets
- `GET /api/maintenance` - لیست تیکت‌ها
- `POST /api/maintenance` - ایجاد تیکت جدید
- `PUT /api/maintenance/{id}` - به‌روزرسانی تیکت
- `GET /api/maintenance/stats/status-counts` - آمار تیکت‌ها

#### Polls
- `GET /api/polls` - لیست نظرسنجی‌ها
- `GET /api/polls/active` - نظرسنجی‌های فعال
- `POST /api/polls` - ایجاد نظرسنجی
- `POST /api/polls/{pollId}/vote/{optionId}` - رأی‌گیری

## تست API با Postman

### Import Collections:
```json
{
  "info": {
    "name": "Building Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "http://localhost:8080/api/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\"username\":\"admin\",\"password\":\"admin123\"}"
            }
          }
        }
      ]
    },
    {
      "name": "Users",
      "item": [
        {
          "name": "Get All Users",
          "request": {
            "method": "GET",
            "url": "http://localhost:8080/api/users",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ]
          }
        },
        {
          "name": "Create User",
          "request": {
            "method": "POST",
            "url": "http://localhost:8080/api/users",
            "body": {
              "mode": "raw",
              "raw": "{\"username\":\"newuser\",\"password\":\"password123\",\"name\":\"کاربر جدید\",\"role\":\"TENANT\",\"phone\":\"09111111111\"}"
            }
          }
        }
      ]
    }
  ]
}
```

### کاربران پیش‌فرض:
- **مدیر**: `admin` / `admin123`
- **مالک**: `owner1` / `owner123`
- **مستأجر**: `tenant1` / `tenant123`
- **کارمند**: `staff1` / `staff123`

## مشکلات رایج

### خطاهای اتصال به دیتابیس:
```bash
# بررسی وضعیت PostgreSQL
sudo systemctl status postgresql

# ریستارت PostgreSQL
sudo systemctl restart postgresql
```

### خطاهای Port Occupied:
```bash
# یافتن process در حال استفاده از پورت 8080
lsof -ti:8080 | xargs kill -9

# یا تغییر پورت در application.properties
server.port=8081
```

### خطاهای Node.js:
```bash
# پاک کردن cache
npm cache clean --force
rm -rf node_modules
npm install

# نصب نسخه صحیح Node.js
nvm use 16
```

### مشکلات Maven:
```bash
# پاک کردن cache Maven
mvn clean
rm -rf ~/.m2/repository
mvn dependency:resolve
```

### مشکلات Environment:
```bash
# بررسی متغیرهای محیطی
env | grep JAVA_HOME
env | grep MAVEN_HOME
```

### Debug Mode:
```bash
# اجرای Backend با Debug
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# لاگ‌های detailed
logging.level.com.modir=DEBUG
logging.level.org.springframework.security=DEBUG
```

## نکات تکمیلی

### Performance Tuning:
- کاهش pool size در production
- بهینه‌سازی JVM flags
- استفاده از Redis برای caching

### Security:
- تغییر JWT secret در production
- استفاده از HTTPS
- Rate limiting
- CORS configuration

### Monitoring:
- Spring Actuator
- Micrometer
- Prometheus
- Grafana

### Deployment:
- Docker containerization
- Kubernetes orchestration
- CI/CD pipeline با Jenkins/GitHub Actions

---

**نویسنده**: MiniMax Agent  
**تاریخ**: ۱۴۰۳/۰۹/۰۲  
**نسخه**: ۱.۰.۰