import { beforeEach, describe, expect, it } from 'vitest';
import { resetIdsForTests } from '../src/shared/id.js';
import { PatientRepository } from '../src/modules/patients/patient.repository.js';
import { PatientService } from '../src/modules/patients/patient.service.js';

const patientRepository = new PatientRepository();
const patientService = new PatientService(patientRepository);

describe('PatientService', () => {
  beforeEach(() => {
    patientRepository.clear();
    resetIdsForTests();
  });

  it('creates holder patients', () => {
    const patient = patientService.create({
      name: 'Kevin Holder',
      cpf: '12345678901',
      type: 'HOLDER',
    });

    expect(patient.id).toBe('patient_0001');
    expect(patient.type).toBe('HOLDER');
    expect(patient.active).toBe(true);
  });

  it('requires dependents to reference an active holder', () => {
    expect(() =>
      patientService.create({
        name: 'Dependent Without Holder',
        cpf: '12345678902',
        type: 'DEPENDENT',
      }),
    ).toThrow('Dependent patients require a holderId');
  });

  it('creates dependents for active holders', () => {
    const holder = patientService.create({
      name: 'Holder',
      cpf: '12345678901',
      type: 'HOLDER',
    });

    const dependent = patientService.create({
      name: 'Dependent',
      cpf: '12345678902',
      type: 'DEPENDENT',
      holderId: holder.id,
    });

    expect(dependent.holderId).toBe(holder.id);
  });

  it('does not return deactivated patients in active list', () => {
    const holder = patientService.create({
      name: 'Holder',
      cpf: '12345678901',
      type: 'HOLDER',
    });

    patientService.deactivate(holder.id);

    expect(patientService.listActive()).toHaveLength(0);
  });
});
