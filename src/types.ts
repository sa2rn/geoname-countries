export type Country = {
  iso: string
  iso3: string
  isoNumeric: number,
  fips: string,
  country: string,
  capital?: string,
  area: string,
  population: number,
  continent: string,
  tld?: string,
  currencyCode?: string,
  currencyName?: string,
  phone?: string,
  postalCodeFormat?: string,
  postalCodeRegex?: string,
  languages: string[],
  geonameId: number,
  neighbours: string[],
  equivalentFipsCode?: string,
  [key: string]: any
};

export type CountryKey = keyof Country;
