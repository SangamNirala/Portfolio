import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// Contact message type
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: ContactMessage[];

  constructor() {
    this.users = new Map();
    this.contactMessages = [];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage> {
    const contactMessage: ContactMessage = {
      ...message,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.contactMessages.push(contactMessage);
    console.log(`[Contact] New message from ${message.name} (${message.email}): ${message.subject}`);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return this.contactMessages;
  }
}

export const storage = new MemStorage();
