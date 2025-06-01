// frontend/src/pages/ClientsPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { crmApi } from '@/services/crm.api'; // Using path alias from tsconfig
import { Client, ApiError } from '@shared/types';
import ClientForm from '@/components/crm/ClientForm'; // Example of component import

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchClients = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await crmApi.getClients();
      setClients(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to load clients.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleAddClient = async (clientData: Omit<Client, '_id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    try {
      await crmApi.createClient(clientData);
      fetchClients(); // Re-fetch to update list
      setShowAddForm(false); // Hide form after successful submission
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to add client.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
        setIsLoading(true);
        setError(null);
        try {
            await crmApi.deleteClient(clientId);
            fetchClients(); // Re-fetch
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message || 'Failed to delete client.');
        } finally {
            setIsLoading(false);
        }
    }
  };


  if (isLoading && !clients.length) return <p>Loading clients...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h1>Clients</h1>
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Cancel Add Client' : 'Add New Client'}
      </button>

      {showAddForm && <ClientForm onSubmit={handleAddClient} isLoading={isLoading} />}

      {clients.length === 0 && !isLoading && <p>No clients found. Add one!</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {clients.map((client) => (
          <li key={client._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h2>{client.name}</h2>
            <p>Email: {client.contactEmail}</p>
            <p>Industry: {client.industry}</p>
            <p>Status: {client.status}</p>
            <p><small>ID: {client._id}</small></p>
            <button onClick={() => handleDeleteClient(client._id!)} disabled={isLoading}>
                Delete
            </button>
            {/* Add Edit button and functionality here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
