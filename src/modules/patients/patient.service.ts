import { AppError } from '../../shared/errors.js';
import type { Patient } from './patient.model.js';
import { PatientRepository, type CreatePatientInput } from './patient.repository.js';

export class PatientService {
  constructor(private readonly patientRepository = new PatientRepository()) {}

  create(input: CreatePatientInput) {
    const existing = this.patientRepository.findByCpf(input.cpf);
    if (existing && existing.deletedAt === null) {
      throw new AppError('A patient with this CPF already exists', 409);
    }

    if (input.type === 'DEPENDENT') {
      if (!input.holderId) {
        throw new AppError('Dependent patients require a holderId', 400);
      }

      const holder = this.patientRepository.findById(input.holderId);
      if (!holder || holder.type !== 'HOLDER' || !holder.active || holder.deletedAt !== null) {
        throw new AppError('Dependent holder must be an active holder patient', 400);
      }
    }

    if (input.type === 'HOLDER' && input.holderId) {
      throw new AppError('Holder patients cannot have holderId', 400);
    }

    return this.patientRepository.create(input);
  }

  list(includeDeleted = false) {
    const allPatients = this.patientRepository.list();
    if (includeDeleted) {
      return allPatients;
    }

    return allPatients.filter((patient) => patient.deletedAt === null);
  }

  listActive() {
    return this.patientRepository
      .list()
      .filter((patient) => this.isPatientActiveForBusiness(patient));
  }

  deactivate(patientId: string) {
    const patient = this.patientRepository.findById(patientId);
    if (!patient || patient.deletedAt !== null) {
      throw new AppError('Patient not found', 404);
    }

    const updated: Patient = {
      ...patient,
      active: false,
      deletedAt: new Date().toISOString(),
    };

    return this.patientRepository.update(updated);
  }

  findRequired(patientId: string) {
    const patient = this.patientRepository.findById(patientId);
    if (!patient || patient.deletedAt !== null) {
      throw new AppError('Patient not found', 404);
    }
    return patient;
  }

  private isPatientActiveForBusiness(patient: Patient) {
    return patient.active && patient.deletedAt === null;
  }
}
