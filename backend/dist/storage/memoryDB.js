"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryDB = void 0;
class MemoryDB {
    constructor() {
        this.users = [];
        this.userIdCounter = 1;
    }
    // Find user by email
    findUserByEmail(email) {
        return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }
    // Find user by id
    findUserById(id) {
        return this.users.find(user => user.id === id);
    }
    // Create new user
    createUser(userData) {
        const user = {
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
    getAllUsers() {
        return this.users;
    }
    // Clear all users (for testing)
    clearUsers() {
        this.users = [];
        this.userIdCounter = 1;
    }
}
// Export singleton instance
exports.memoryDB = new MemoryDB();
