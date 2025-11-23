# Frontend - Building Management System

## نصب و راه‌اندازی

### پیش‌نیازها
- Node.js 16+
- npm یا yarn

### نصب dependencies
```bash
npm install
```

### اجرای پروژه
```bash
npm run dev
```

### ساختار پروژه
```
├── components/          # React Components
├── services/           # API Service Layer
├── App.tsx            # Main App Component
├── index.tsx          # Entry Point
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript Config
└── vite.config.ts     # Vite Configuration
```

### سرویس‌های API
- `authService.ts` - احراز هویت
- `userService.ts` - مدیریت کاربران
- `transactionService.ts` - تراکنش‌های مالی
- `maintenanceService.ts` - تیکت‌های نگهداری
- `pollService.ts` - نظرسنجی‌ها

### اتصال به Backend
Frontend به صورت خودکار به Backend در `http://localhost:8080/api` متصل می‌شود.

### ویژگی‌ها
- احراز هویت با JWT
- مدیریت کاربران و ساکنین
- سیستم مالی و گزارش‌گیری
- مدیریت تیکت‌های نگهداری
- سیستم نظرسنجی

**نویسنده**: MiniMax Agent