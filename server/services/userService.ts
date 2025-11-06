// UserService using in-memory store (no database)
import userStore, { InMemoryUser } from './userStore';
import { generatePasswordHash } from '../utils/password';

interface CreateUserData {
  email: string;
  password: string;
  name?: string;
  role?: string;
}

class UserService {
  static async list(): Promise<InMemoryUser[]> {
    return await userStore.list();
  }

  static async get(id: string): Promise<InMemoryUser | null> {
    return await userStore.get(id);
  }

  static async getByEmail(email: string): Promise<InMemoryUser | null> {
    return await userStore.getByEmail(email);
  }

  static async update(id: string, data: Partial<InMemoryUser>): Promise<InMemoryUser | null> {
    return await userStore.update(id, data);
  }

  static async delete(id: string): Promise<boolean> {
    return await userStore.delete(id);
  }

  static async authenticateWithPassword(email: string, password: string): Promise<InMemoryUser | null> {
    return await userStore.authenticateWithPassword(email, password);
  }

  static async create({ email, password, name = '', role }: CreateUserData): Promise<InMemoryUser> {
    return await userStore.create({ email, password, name, role });
  }

  static async setPassword(user: InMemoryUser, password: string): Promise<InMemoryUser> {
    if (!password) throw new Error('Password is required');
    const hash = await generatePasswordHash(password);
    return await userStore.update(user._id, { password: hash }) || user;
  }
}

export default UserService;
