import sift from 'sift';
import { Options } from 'sift/lib/core';
import storage from './storage';

const countries = storage.read();

export default {
  find(query: any, options: Partial<Options> | undefined) {
    return countries.filter(sift(query, options));
  },

  findOne(query: any, options: any) {
    return this.find(query, options)[0];
  },
};
