import type { Partner } from './partner.model.js';

const partners: Partner[] = [
  { id: 'partner_amil', name: 'Amil Saúde', cnpj: '11111111000191' },
  { id: 'partner_sulamerica', name: 'SulAmérica Saúde', cnpj: '22222222000182' },
  { id: 'partner_filoo', name: 'Filoo Freemium', cnpj: '33333333000173' },
];

export class PartnerRepository {
  findById(id: string) {
    return partners.find((partner) => partner.id === id) ?? null;
  }

  list() {
    return [...partners];
  }
}
