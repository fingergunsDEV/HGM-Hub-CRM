// backend/src/services/crm/client.service.ts
import ClientModel from '../../models/Client.model';
import { Client as IClient } from '@shared/types';

export const ClientService = {
  async getAllClients(): Promise<IClient[]> {
    console.log("Service: Fetching all clients from DB");
    const clients = await ClientModel.find().lean<IClient[]>();
    return clients;
  },

  async getClientById(id: string): Promise<IClient | null> {
    console.log(`Service: Fetching client by ID: ${id}`);
    const client = await ClientModel.findById(id).lean<IClient>();
    return client;
  },

  async createClient(clientData: Omit<IClient, '_id' | 'createdAt' | 'updatedAt'>): Promise<IClient> {
    console.log("Service: Creating client", clientData);
    const created = await ClientModel.create(clientData);
    return created.toObject();
  },

  async updateClient(id: string, clientData: Partial<IClient>): Promise<IClient | null> {
    console.log(`Service: Updating client ${id}`, clientData);
    const updated = await ClientModel.findByIdAndUpdate(id, clientData, { new: true }).lean<IClient>();
    return updated;
  },

  async deleteClient(id: string): Promise<boolean> {
    console.log(`Service: Deleting client ${id}`);
    const result = await ClientModel.findByIdAndDelete(id);
    return !!result;
  },
};
