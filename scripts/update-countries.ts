import fetchCountries from '../src/fetchCountries';
import storage from '../src/storage';

async function main() {
  const data = await fetchCountries();
  storage.dump(data);
  console.log('Data is updated!');
}

main().catch(console.error);
