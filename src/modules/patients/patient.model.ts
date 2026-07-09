export type PatientType = 'HOLDER' | 'DEPENDENT';

export type Patient = {
  id: string;
  name: string;
  cpf: string;
  type: PatientType;
  holderId: string | null;
  active: boolean;
  deletedAt: string | null;
  createdAt: string;
};
