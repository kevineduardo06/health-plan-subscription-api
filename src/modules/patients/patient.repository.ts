import { nextId } from '../../shared/id.js';
import type { Patient, PatientType } from './patient.model.js';

const patients: Patient[] = [];

export type CreatePatientInput = {
  name: string;
  cpf: string;
  type: PatientType;
  holderId?: string | null;
};

export class PatientRepository {
  create(input: CreatePatientInput) {
    const patient: Patient = {
      id: nextId('patient'),
      name: input.name,
      cpf: input.cpf,
      type: input.type,
      holderId: input.holderId ?? null,
      active: true,
      deletedAt: null,
      createdAt: new Date().toISOString(),
    };

    patients.push(patient);
    return patient;
  }

  update(patient: Patient) {
    const index = patients.findIndex((item) => item.id === patient.id);
    if (index >= 0) {
      patients[index] = patient;
    }
    return patient;
  }

  findById(id: string) {
    return patients.find((patient) => patient.id === id) ?? null;
  }

  findByCpf(cpf: string) {
    return patients.find((patient) => patient.cpf === cpf) ?? null;
  }

  list() {
    return [...patients];
  }

  clear() {
    patients.length = 0;
  }
}
