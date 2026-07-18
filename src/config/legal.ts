export interface LegalOperator {
  legalName: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  representative?: string;
  email: string;
  registerName?: string;
  registerNumber?: string;
  vatId?: string;
}

export function getLegalOperator(): LegalOperator | null {
  const legalName = import.meta.env.LEGAL_NAME;
  const streetAddress = import.meta.env.LEGAL_STREET_ADDRESS;
  const postalCode = import.meta.env.LEGAL_POSTAL_CODE;
  const city = import.meta.env.LEGAL_CITY;
  const country = import.meta.env.LEGAL_COUNTRY;
  const email = import.meta.env.LEGAL_EMAIL;
  if (!legalName || !streetAddress || !postalCode || !city || !country || !email) return null;
  const operator: LegalOperator = { legalName, streetAddress, postalCode, city, country, email };
  if (import.meta.env.LEGAL_REPRESENTATIVE) operator.representative = import.meta.env.LEGAL_REPRESENTATIVE;
  if (import.meta.env.LEGAL_REGISTER_NAME) operator.registerName = import.meta.env.LEGAL_REGISTER_NAME;
  if (import.meta.env.LEGAL_REGISTER_NUMBER) operator.registerNumber = import.meta.env.LEGAL_REGISTER_NUMBER;
  if (import.meta.env.LEGAL_VAT_ID) operator.vatId = import.meta.env.LEGAL_VAT_ID;
  return operator;
}
