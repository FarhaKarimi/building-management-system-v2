import { API_BASE_URL, Poll } from './api';
import { authService } from './authService';

class PollService {
  private readonly baseUrl = `${API_BASE_URL}/polls`;

  async getAllPolls(): Promise<Poll[]> {
    try {
      const response = await fetch(this.baseUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch polls');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching polls:', error);
      throw error;
    }
  }

  async getActivePolls(): Promise<Poll[]> {
    try {
      const response = await fetch(`${this.baseUrl}/active`);

      if (!response.ok) {
        throw new Error('Failed to fetch active polls');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching active polls:', error);
      throw error;
    }
  }

  async getPollById(id: string): Promise<Poll> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch poll');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching poll:', error);
      throw error;
    }
  }

  async createPoll(pollData: Omit<Poll, 'id' | 'totalVotes'>): Promise<Poll> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(pollData),
      });

      if (!response.ok) {
        throw new Error('Failed to create poll');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating poll:', error);
      throw error;
    }
  }

  async vote(pollId: string, optionId: number): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/${pollId}/vote/${optionId}`, {
        method: 'POST',
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to record vote');
      }

      const result = await response.text();
      return result;
    } catch (error) {
      console.error('Error voting:', error);
      throw error;
    }
  }

  async deletePoll(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete poll');
      }
    } catch (error) {
      console.error('Error deleting poll:', error);
      throw error;
    }
  }

  // Helper methods for calculations and filtering
  getTotalVotes(poll: Poll): number {
    return poll.options.reduce((total, option) => total + option.votes, 0);
  }

  getVotePercentage(optionVotes: number, totalVotes: number): number {
    if (totalVotes === 0) return 0;
    return Math.round((optionVotes / totalVotes) * 100);
  }

  getWinningOption(poll: Poll) {
    const totalVotes = this.getTotalVotes(poll);
    if (totalVotes === 0) return null;

    const winningOption = poll.options.reduce((prev, current) => 
      (prev.votes > current.votes) ? prev : current
    );

    return {
      option: winningOption,
      percentage: this.getVotePercentage(winningOption.votes, totalVotes)
    };
  }

  filterPollsByActive(polls: Poll[], isActive: boolean): Poll[] {
    return polls.filter(poll => poll.isActive === isActive);
  }

  sortPollsByDate(polls: Poll[]): Poll[] {
    return polls.sort((a, b) => {
      // Assuming polls have createdAt field or similar
      // For now, return as is - you might need to add this field
      return 0;
    });
  }

  // Calculate polling statistics
  getPollStatistics(polls: Poll[]): {
    totalPolls: number;
    activePolls: number;
    totalVotes: number;
    averageVotesPerPoll: number;
  } {
    const activePolls = this.filterPollsByActive(polls, true);
    const totalVotes = polls.reduce((sum, poll) => sum + this.getTotalVotes(poll), 0);
    const averageVotesPerPoll = polls.length > 0 ? totalVotes / polls.length : 0;

    return {
      totalPolls: polls.length,
      activePolls: activePolls.length,
      totalVotes,
      averageVotesPerPoll: Math.round(averageVotesPerPoll * 100) / 100
    };
  }
}

export const pollService = new PollService();