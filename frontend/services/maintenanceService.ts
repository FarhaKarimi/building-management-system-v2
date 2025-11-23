import { API_BASE_URL, MaintenanceTicket, TicketStatus } from './api';
import { authService } from './authService';

class MaintenanceService {
  private readonly baseUrl = `${API_BASE_URL}/maintenance`;

  async getAllTickets(): Promise<MaintenanceTicket[]> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch maintenance tickets');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching maintenance tickets:', error);
      throw error;
    }
  }

  async getTicketsByUnit(unitId: string): Promise<MaintenanceTicket[]> {
    try {
      const response = await fetch(`${this.baseUrl}/unit/${unitId}`, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tickets by unit');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tickets by unit:', error);
      throw error;
    }
  }

  async getTicketById(id: string): Promise<MaintenanceTicket> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch ticket');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching ticket:', error);
      throw error;
    }
  }

  async createTicket(ticketData: Omit<MaintenanceTicket, 'id'>): Promise<MaintenanceTicket> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  }

  async updateTicket(id: string, ticketData: Partial<MaintenanceTicket>): Promise<MaintenanceTicket> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw error;
    }
  }

  async deleteTicket(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete ticket');
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
      throw error;
    }
  }

  async getTicketsByStatus(status: TicketStatus): Promise<MaintenanceTicket[]> {
    try {
      const response = await fetch(`${this.baseUrl}/status/${status}`, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tickets by status');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tickets by status:', error);
      throw error;
    }
  }

  async getTicketStatistics(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/stats/status-counts`, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch ticket statistics');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching ticket statistics:', error);
      throw error;
    }
  }

  // Helper methods for filtering and grouping
  getTicketsByPriority(tickets: MaintenanceTicket[], priority: 'low' | 'medium' | 'high'): MaintenanceTicket[] {
    return tickets.filter(t => t.priority === priority);
  }

  getTicketsByStatusLocal(tickets: MaintenanceTicket[], status: TicketStatus): MaintenanceTicket[] {
    return tickets.filter(t => t.status === status);
  }

  groupTicketsByStatus(tickets: MaintenanceTicket[]): Record<TicketStatus, MaintenanceTicket[]> {
    return {
      [TicketStatus.OPEN]: tickets.filter(t => t.status === TicketStatus.OPEN),
      [TicketStatus.IN_PROGRESS]: tickets.filter(t => t.status === TicketStatus.IN_PROGRESS),
      [TicketStatus.DONE]: tickets.filter(t => t.status === TicketStatus.DONE),
    };
  }

  getTicketsByPriorityCount(tickets: MaintenanceTicket[]): Record<string, number> {
    const counts = {
      'low': 0,
      'medium': 0,
      'high': 0,
    };

    tickets.forEach(ticket => {
      counts[ticket.priority]++;
    });

    return counts;
  }
}

export const maintenanceService = new MaintenanceService();