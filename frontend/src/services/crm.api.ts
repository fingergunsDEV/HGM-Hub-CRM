// frontend/src/services/crm.api.ts
import apiClient from './apiClient';
import { Client, ApiError } from '@shared/types'; // Adjust path

export const crmApi = {
  async getClients(): Promise<Client[]> {
    try {
      const response = await apiClient.get<Client[]>('/crm/clients');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching clients:', error.response?.data || error.message);
      throw error.response?.data as ApiError || { message: 'Failed to fetch clients' };
    }
  },

  async createClient(clientData: Omit<Client, '_id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    try {
      const response = await apiClient.post<Client>('/crm/clients', clientData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating client:', error.response?.data || error.message);
      throw error.response?.data as ApiError || { message: 'Failed to create client' };
    }
  },

  async getClient(id: string): Promise<Client> {
    try {
        const response = await apiClient.get<Client>(`/crm/clients/${id}`);
        return response.data;
    } catch (error: any) {
        console.error(`Error fetching client ${id}:`, error.response?.data || error.message);
        throw error.response?.data as ApiError || { message: `Failed to fetch client ${id}` };
    }
  },

  async updateClient(id: string, clientData: Partial<Client>): Promise<Client> {
    try {
        const response = await apiClient.put<Client>(`/crm/clients/${id}`, clientData);
        return response.data;
    } catch (error: any) {
        console.error(`Error updating client ${id}:`, error.response?.data || error.message);
        throw error.response?.data as ApiError || { message: `Failed to update client ${id}` };
    }
  },

  async deleteClient(id: string): Promise<void> {
    try {
        await apiClient.delete(`/crm/clients/${id}`);
    } catch (error: any) {
        console.error(`Error deleting client ${id}:`, error.response?.data || error.message);
        throw error.response?.data as ApiError || { message: `Failed to delete client ${id}` };
    }
  }
};
