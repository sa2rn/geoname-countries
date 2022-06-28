import axios from 'axios';
import { Country, CountryKey } from './types.js';

const RESOURCE_URL = 'http://download.geonames.org/export/dump/countryInfo.txt';
const COMMENT_REGEX = /^#.*/;
const NEW_LINE = '\n';
const COLUMN_SPLIT = '\t';
const STRINGS_SPLIT = ',';
const COLUMNS = [
  'iso',
  'iso3',
  'isoNumeric',
  'fips',
  'country',
  'capital',
  'area',
  'population',
  'continent',
  'tld',
  'currencyCode',
  'currencyName',
  'phone',
  'postalCodeFormat',
  'postalCodeRegex',
  'languages',
  'geonameId',
  'neighbours',
  'equivalentFipsCode',
];
const NUMBERS = ['isoNumeric', 'area', 'population', 'geonameId'];
const ARRAY_OF_STRINGS = ['languages', 'neighbours'];

function skipComment(line: string) {
  return !COMMENT_REGEX.test(line);
}

function convertLineToCountry(line: string) {
  return line
    .trim()
    .split(COLUMN_SPLIT)
    .reduce<Country>((acc, value, index) => {
    const propName = COLUMNS[index] as CountryKey;
    if (NUMBERS.includes(propName as string)) {
      acc[propName] = parseInt(value, 10);
    } else if (ARRAY_OF_STRINGS.includes(propName as string)) {
      acc[propName] = value.split(STRINGS_SPLIT);
    } else {
      acc[propName] = value;
    }
    return acc;
  }, {} as Country);
}

export default async function fetchCountries(): Promise<Country[]> {
  const { data } = await axios.get(RESOURCE_URL);

  return data
    .split(NEW_LINE)
    .filter(skipComment)
    .map(convertLineToCountry);
}
