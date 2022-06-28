import { join, dirname } from 'path';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import findRoot from 'find-root';
import { Country } from './types';

export const ENCODING = 'utf8';
export const DEST = join(findRoot('./'), 'data/countries.json');

export default {
  dump(data: Country[]) {
    const strData = JSON.stringify(data);
    mkdirSync(dirname(DEST), { recursive: true });
    writeFileSync(DEST, strData, ENCODING);
  },

  read(): Country[] {
    const str = readFileSync(DEST, ENCODING);
    return JSON.parse(str);
  },
};
