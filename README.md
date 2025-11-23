# سیستم مدیریت ساختمان - Building Management System

<div align="center">
  <img width="1200" height="475" alt="Building Management System" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## فهرست پروژه
- **Backend**: Spring Boot 3.2.2 + PostgreSQL + JWT Authentication
- **Frontend**: React + TypeScript + Vite
- **Database**: PostgreSQL 12+
- **API Documentation**: RESTful API with JWT

## ویژگی‌ها
- ✅ مدیریت کاربران و ساکنین
- ✅ مدیریت مالی و تراکنش‌ها  
- ✅ سیستم تیکت‌های نگهداری
- ✅ نظرسنجی و رأی‌گیری
- ✅ احراز هویت و مجوزدهی
- ✅ API کامل برای توسعه
- ✅ تست‌های واحد و Integration
- ✅ راهنمای کامل راه‌اندازی

## راه‌اندازی سریع

### 1. نصب پیش‌نیازها
```bash
# Java 17+
java -version

# Maven 3.6+
mvn -version

# PostgreSQL 12+
sudo apt install postgresql postgresql-contrib
# یا macOS: brew install postgresql

# Node.js 16+
node -v
npm -v
```

### 2. راه‌اندازی PostgreSQL
```bash
# ورود به PostgreSQL
sudo -u postgres psql

# ایجاد دیتابیس و کاربر
CREATE DATABASE building_management;
CREATE USER modir_user WITH ENCRYPTED PASSWORD 'modir123';
GRANT ALL PRIVILEGES ON DATABASE building_management TO modir_user;
\q
```

### 3. اجرای Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 4. اجرای Frontend
```bash
# در پوشه ریشه پروژه
npm install
npm run dev
```

## دسترسی
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/actuator/health
- **API Documentation**: Postman Collection included

## کاربران پیش‌فرض
| نام کاربری | رمز عبور | نقش | توضیحات |
|-----------|----------|------|----------|
| admin | admin123 | MANAGER | مدیر کل سیستم |
| owner1 | owner123 | OWNER | مالک واحد |
| tenant1 | tenant123 | TENANT | مستأجر |
| staff1 | staff123 | STAFF | کارمند/نگهبان |

## تست‌ها و تضمین کیفیت
```bash
# تست‌های Backend
cd backend
mvn test

# گزارش کامل تست‌ها
cat test-results.json

# تست‌های API با Postman
# فایل postman-collection.json را import کنید
```

## فایل‌های مهم
- `SETUP_GUIDE.md` - راهنمای کامل راه‌اندازی
- `test-results.json` - گزارش کامل تست‌ها (18 تست)
- `postman-collection.json` - Collection تست‌های API
- `backend/pom.xml` - تنظیمات Maven
- `backend/src/main/resources/application.properties` - تنظیمات دیتابیس
- `services/` - سرویس‌های API Frontend

## ساختار پروژه
```
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/         # کد اصلی
│   │   ├── config/            # تنظیمات (Security, CORS, Data)
│   │   ├── controller/        # REST Controllers
│   │   ├── service/           # منطق کسب‌وکار
│   │   ├── repository/        # Database Access
│   │   ├── model/             # Entity Models
│   │   ├── dto/               # Data Transfer Objects
│   │   └── security/          # JWT & Security
│   ├── src/test/java/         # Unit Tests
│   └── pom.xml               # Maven Configuration
├── frontend/                  # React Frontend
│   ├── src/                  # React Components
│   ├── services/             # API Services
│   └── package.json          # Dependencies
├── test-results.json         # Test Report
├── postman-collection.json   # API Tests
└── SETUP_GUIDE.md           # Complete Setup Guide
```

## API Endpoints
- **Authentication**: `POST /api/auth/login`
- **Users**: `GET/POST/PUT/DELETE /api/users`
- **Transactions**: `GET/POST/PUT/DELETE /api/transactions`
- **Maintenance**: `GET/POST/PUT/DELETE /api/maintenance`
- **Polls**: `GET/POST/DELETE /api/polls`

## ویژگی‌های امنیتی
- JWT Authentication
- Role-based Access Control (RBAC)
- CORS Configuration
- Password Encryption (BCrypt)
- Input Validation
- Error Handling

## Performance & Monitoring
- Spring Actuator endpoints
- Health checks
- Metrics monitoring
- Exception handling
- Logging configuration

## توسعه و Deploy
برای اطلاعات کامل، به `SETUP_GUIDE.md` مراجعه کنید.

## پشتیبانی
برای مشکلات و سؤالات، به راهنمای راه‌اندازی کامل مراجعه کنید.

---
**نویسنده**: MiniMax Agent  
**نسخه**: ۱.۰.۰  
**تعداد خطوط کد**: 2000+  
**تعداد تست‌ها**: 18 تست واحد  
**API Endpoints**: 25+ endpoints