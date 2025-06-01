// frontend/src/components/crm/ClientForm.tsx
import React, { useState } from 'react';
import { Client } from '@shared/types';

interface ClientFormProps {
  onSubmit: (clientData: Omit<Client, '_id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Partial<Client>;
  isLoading?: boolean;
}

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, initialData, isLoading }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [contactEmail, setContactEmail] = useState(initialData?.contactEmail || '');
  const [industry, setIndustry] = useState(initialData?.industry || '');
  const [status, setStatus] = useState<Client['status']>(initialData?.status || 'Lead');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, contactEmail, industry, status });
    // Optionally clear form if it's not an edit form
    if (!initialData) {
        setName('');
        setContactEmail('');
        setIndustry('');
        setStatus('Lead');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginBottom: '20px' }}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="email">Contact Email:</label>
        <input type="email" id="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="industry">Industry:</label>
        <input type="text" id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value as Client['status'])}>
          <option value="Lead">Lead</option>
          <option value="Active">Active</option>
          <option value="Past">Past</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : (initialData ? 'Update Client' : 'Add Client')}
      </button>
    </form>
  );
};

export default ClientForm;
