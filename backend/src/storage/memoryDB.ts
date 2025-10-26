// Simple in-memory database for development
interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  role: string;
  createdAt: Date;
}

class MemoryDB {
  private users: User[] = [];
  private userIdCounter = 1;

  // Find user by email
  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  // Find user by id
  findUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  // Create new user
  createUser(userData: { email: string; password: string; name?: string; role?: string }): User {
    const user: User = {
      id: this.userIdCounter++,
      email: userData.email.toLowerCase(),
      password: userData.password,
      name: userData.name,
      role: userData.role || 'user',
      createdAt: new Date()
    };
    
    this.users.push(user);
    return user;
  }

  // Get all users (for debugging)
  getAllUsers(): User[] {
    return this.users;
  }

  // Clear all users (for testing)
  clearUsers(): void {
    this.users = [];
    this.userIdCounter = 1;
  }
}

// Export singleton instance
export const memoryDB = new MemoryDB();
export type { User };