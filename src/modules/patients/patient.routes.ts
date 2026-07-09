import { Router } from 'express';
import { z } from 'zod';
import { PatientService } from './patient.service.js';

const createPatientSchema = z.object({
  name: z.string().min(2),
  cpf: z.string().min(11).max(14),
  type: z.enum(['HOLDER', 'DEPENDENT']),
  holderId: z.string().nullable().optional(),
});

export function patientRoutes(patientService = new PatientService()) {
  const router = Router();

  router.get('/', (_request, response) => {
    return response.json(patientService.list());
  });

  router.get('/active', (_request, response) => {
    return response.json(patientService.listActive());
  });

  router.post('/', (request, response, next) => {
    try {
      const input = createPatientSchema.parse(request.body);
      const patient = patientService.create(input);
      return response.status(201).json(patient);
    } catch (error) {
      return next(error);
    }
  });

  router.post('/:id/deactivate', (request, response, next) => {
    try {
      const patient = patientService.deactivate(request.params.id);
      return response.json(patient);
    } catch (error) {
      return next(error);
    }
  });

  return router;
}
