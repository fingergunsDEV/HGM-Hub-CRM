// backend/src/services/crm/client.service.ts
import ClientModel, { ClientDocument } from '../../models/Client.model';
import { Client as IClient } from '@shared/types'; // Adjust path

// This is a MOCK service. Replace with actual database interactions.
const mockClients: ClientDocument[] = [];
let mockIdCounter = 1;

export const ClientService = {
  async getAllClients(): Promise<IClient[]> {
    // In a real app: return await ClientModel.find().lean();
    console.log("Service: Fetching all clients");
    return mockClients.map(c => c.toObject ? c.toObject() : c) as IClient[];
  },

  async getClientById(id: string): Promise<IClient | null> {
    // In a real app: return await ClientModel.findById(id).lean();
    console.log(`Service: Fetching client by ID: ${id}`);
    const client = mockClients.find(c => c._id?.toString() === id);
    return client ? (client.toObject ? client.toObject() : client) as IClient : null;
  },

  async createClient(clientData: Omit<IClient, '_id' | 'createdAt' | 'updatedAt'>): Promise<IClient> {
    // In a real app: const newClient = new ClientModel(clientData); await newClient.save(); return newClient.toObject();
    console.log("Service: Creating client", clientData);
    const newClient = {
      _id: (mockIdCounter++).toString(),
      ...clientData,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as ClientDocument; // Casting for mock
    mockClients.push(newClient);
    return newClient.toObject ? newClient.toObject() : newClient as IClient;
  },

  async updateClient(id: string, clientData: Partial<IClient>): Promise<IClient | null> {
    // In a real app: return await ClientModel.findByIdAndUpdate(id, clientData, { new: true }).lean();
    console.log(`Service: Updating client ${id}`, clientData);
    const clientIndex = mockClients.findIndex(c => c._id?.toString() === id);
    if (clientIndex === -1) return null;
    mockClients[clientIndex] = { ...mockClients[clientIndex], ...clientData, updatedAt: new Date() } as ClientDocument;
    const updatedClient = mockClients[clientIndex];
    return updatedClient.toObject ? updatedClient.toObject() : updatedClient as IClient;
  },

  async deleteClient(id: string): Promise<boolean> {
    // In a real app: const result = await ClientModel.findByIdAndDelete(id); return !!result;
    console.log(`Service: Deleting client ${id}`);
    const initialLength = mockClients.length;
    const clientIndex = mockClients.findIndex(c => c._id?.toString() === id);
    if (clientIndex > -1) {
      mockClients.splice(clientIndex, 1);
      return true;
    }
    return false;
  },
};
