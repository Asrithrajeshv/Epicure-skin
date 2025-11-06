// In-memory user store (no database required)
import { generatePasswordHash, validatePassword } from '../utils/password';
import { ROLES } from 'shared';

export interface InMemoryUser {
  _id: string;
  email: string;
  password: string | null;
  name?: string;
  role: string;
  createdAt: Date;
  lastLoginAt: Date;
  isActive: boolean;
  refreshToken: string;
  oauthProvider?: string;
  oauthId?: string;
}

class UserStore {
  private users: Map<string, InMemoryUser> = new Map();
  private emailIndex: Map<string, string> = new Map(); // email -> _id

  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async create({ email, password, name = '', role }: { email: string; password: string; name?: string; role?: string }): Promise<InMemoryUser> {
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');

    const existingUser = await this.getByEmail(email);
    if (existingUser) throw new Error('User with this email already exists');

    const hash = await generatePasswordHash(password);
    const now = new Date();

    const user: InMemoryUser = {
      _id: this.generateId(),
      email: email.toLowerCase(),
      password: hash,
      name,
      role: role || ROLES.PATIENT,
      createdAt: now,
      lastLoginAt: now,
      isActive: true,
      refreshToken: `refresh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    this.users.set(user._id, user);
    this.emailIndex.set(user.email, user._id);

    return user;
  }

  async getByEmail(email: string): Promise<InMemoryUser | null> {
    const userId = this.emailIndex.get(email.toLowerCase());
    if (!userId) return null;
    return this.users.get(userId) || null;
  }

  async get(id: string): Promise<InMemoryUser | null> {
    return this.users.get(id) || null;
  }

  async authenticateWithPassword(email: string, password: string): Promise<InMemoryUser | null> {
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');

    const user = await this.getByEmail(email);
    if (!user) return null;

    if (!user.password) {
      throw new Error('This account uses OAuth authentication. Please login with OAuth.');
    }

    const passwordValid = await validatePassword(password, user.password);
    if (!passwordValid) return null;

    user.lastLoginAt = new Date();
    return user;
  }

  async update(id: string, data: Partial<InMemoryUser>): Promise<InMemoryUser | null> {
    const user = this.users.get(id);
    if (!user) return null;

    Object.assign(user, data);
    return user;
  }

  async list(): Promise<InMemoryUser[]> {
    return Array.from(this.users.values());
  }

  async delete(id: string): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) return false;

    this.users.delete(id);
    this.emailIndex.delete(user.email);
    return true;
  }
}

export default new UserStore();

