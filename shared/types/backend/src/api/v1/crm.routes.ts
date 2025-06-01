// backend/src/api/v1/crm.routes.ts
import { Router } from 'express';
import { ClientController } from '../../controllers/client.controller';
// import { isAuthenticated } from '../../middleware/isAuthenticated'; // Example middleware

const router = Router();

// Apply authentication middleware to all client routes if needed
// router.use(isAuthenticated);

router.get('/clients', ClientController.getAllClients);
router.post('/clients', ClientController.createClient);
router.get('/clients/:id', ClientController.getClientById);
router.put('/clients/:id', ClientController.updateClient);
router.delete('/clients/:id', ClientController.deleteClient);

// ... other CRM related routes (leads, personas, etc.)

export default router;
