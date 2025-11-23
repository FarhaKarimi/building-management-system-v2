import { API_BASE_URL, Transaction, TransactionType } from './api';
import { authService } from './authService';

class TransactionService {
  private readonly baseUrl = `${API_BASE_URL}/transactions`;

  async getAllTransactions(): Promise<Transaction[]> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  async getTransactionsByUnit(unitId: string): Promise<Transaction[]> {
    try {
      const response = await fetch(`${this.baseUrl}/unit/${unitId}`, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions by unit');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching transactions by unit:', error);
      throw error;
    }
  }

  async getTransactionById(id: string): Promise<Transaction> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transaction');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  }

  async createTransaction(transactionData: Omit<Transaction, 'id'>): Promise<Transaction> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  async updateTransaction(id: string, transactionData: Partial<Transaction>): Promise<Transaction> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  }

  async deleteTransaction(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }

  async getTransactionsByType(type: TransactionType): Promise<Transaction[]> {
    try {
      const response = await fetch(`${this.baseUrl}/type/${type}`, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions by type');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching transactions by type:', error);
      throw error;
    }
  }

  async getFinancialSummary(startDate: string, endDate: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/summary?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authService.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch financial summary');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching financial summary:', error);
      throw error;
    }
  }

  // Helper methods for calculations
  calculateTotal(transactions: Transaction[], type?: TransactionType): number {
    const filtered = type ? transactions.filter(t => t.type === type) : transactions;
    return filtered.reduce((sum, t) => sum + t.amount, 0);
  }

  calculateNetIncome(transactions: Transaction[]): number {
    const income = this.calculateTotal(transactions, TransactionType.INCOME);
    const expense = this.calculateTotal(transactions, TransactionType.EXPENSE);
    return income - expense;
  }

  getTransactionsByStatus(transactions: Transaction[], status: 'paid' | 'pending'): Transaction[] {
    return transactions.filter(t => t.status === status);
  }
}

export const transactionService = new TransactionService();