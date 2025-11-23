
export enum UserRole {
  MANAGER = 'مدیر',
  OWNER = 'مالک',
  TENANT = 'مستأجر',
  STAFF = 'نگهبان/خدمات'
}

export interface Resident {
  id: string;
  unit: string;
  name: string;
  role: UserRole;
  phone: string;
  plateNumber?: string;
  moveInDate: string;
  password?: string; // Added password field
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: string;
  status: 'paid' | 'pending';
}

export enum TicketStatus {
  OPEN = 'باز',
  IN_PROGRESS = 'در حال انجام',
  DONE = 'انجام شده'
}

export interface MaintenanceTicket {
  id: string;
  title: string;
  description: string;
  reporter: string;
  date: string;
  status: TicketStatus;
  priority: 'low' | 'medium' | 'high';
}

export interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
  isActive: boolean;
}
