// backend/src/controllers/client.controller.ts
import { Request, Response, NextFunction } from 'express';
import { ClientService } from '../services/crm/client.service';
import { Client as IClient } from '@shared/types'; // Adjust path

export const ClientController = {
  async getAllClients(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await ClientService.getAllClients();
      res.status(200).json(clients);
    } catch (error) {
      next(error); // Pass to error handling middleware
    }
  },

  async getClientById(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await ClientService.getClientById(req.params.id);
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  },

  async createClient(req: Request, res: Response, next: NextFunction) {
    try {
      // Add validation here (e.g., using Joi, Zod, or express-validator)
      const clientData: Omit<IClient, '_id' | 'createdAt' | 'updatedAt'> = req.body;
      const newClient = await ClientService.createClient(clientData);
      res.status(201).json(newClient);
    } catch (error) {
      // Handle specific errors like duplicate email if your service throws them
      next(error);
    }
  },

  async updateClient(req: Request, res: Response, next: NextFunction) {
    try {
        // Add validation
      const updatedClient = await ClientService.updateClient(req.params.id, req.body);
      if (!updatedClient) {
        return res.status(404).json({ message: 'Client not found' });
      }
      res.status(200).json(updatedClient);
    } catch (error) {
      next(error);
    }
  },

  async deleteClient(req: Request, res: Response, next: NextFunction) {
    try {
      const success = await ClientService.deleteClient(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Client not found' });
      }
      res.status(204).send(); // No content
    } catch (error) {
      next(error);
    }
  },
};
