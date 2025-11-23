// API Configuration
export const API_BASE_URL = 'http://localhost:8080/api';

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
}

// Login API
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  name: string;
  role: UserRole;
  unit: string;
}

export enum UserRole {
  MANAGER = 'MANAGER',
  OWNER = 'OWNER', 
  TENANT = 'TENANT',
  STAFF = 'STAFF'
}

// User API Types
export interface User {
  id: string;
  unit: string;
  name: string;
  role: UserRole;
  phone: string;
  plateNumber?: string;
  moveInDate: string;
}

// Transaction API Types
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: string;
  status: 'paid' | 'pending';
  unitId: string;
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

// Maintenance Ticket API Types
export interface MaintenanceTicket {
  id: string;
  title: string;
  description: string;
  reporter: string;
  reporterId: string;
  date: string;
  status: TicketStatus;
  priority: 'low' | 'medium' | 'high';
  unitId: string;
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS', 
  DONE = 'DONE'
}

// Poll API Types
export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  isActive: boolean;
}

export interface PollOption {
  id: number;
  text: string;
  votes: number;
}