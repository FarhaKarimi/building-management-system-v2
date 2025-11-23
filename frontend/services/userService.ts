import { API_BASE_URL, User, UserRole } from './api';
import { authService } from './authService';

class UserService {
  private readonly baseUrl = `${API_BASE_URL}/users`;

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async createUser(userData: Partial<User> & { password: string }): Promise<User> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    try {
      const response = await fetch(`${this.baseUrl}/role/${role}`, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users by role');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching users by role:', error);
      throw error;
    }
  }

  // Helper method to check if current user has specific role
  hasRole(role: UserRole): boolean {
    // This would need to be implemented based on your auth state management
    // For now, return false as placeholder
    return false;
  }

  // Helper method to get current user's role
  getCurrentUserRole(): UserRole | null {
    // This would need to be implemented based on your auth state management
    // For now, return null as placeholder
    return null;
  }
}

export const userService = new UserService();