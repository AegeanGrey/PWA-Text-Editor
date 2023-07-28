import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Creates a connnection to the database and version
  const jateDb = await openDB('jate', 1);
  
  // Creates a new transaction while specifiying 'jate' as the DB and 'readwrite' as the data privilege
  const tx = jateDb.transaction('jate', 'readwrite');

  // Opens the desired object store (in this case it's 'jate')
  const store = tx.objectStore('jate');

  // Utilizes the 'getAll' method that retrieves all the stored data within the DB
  const request = store.put({ jate: content });

  // Confirms the request
  const result = await request;
  console.log(result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Creates a connnection to the database and version
  const jateDb = await openDB('jate', 1);
  
  // Creates a new transaction while specifiying 'jate' as the DB and 'readonly' as the data privilege
  const tx = jateDb.transaction('jate', 'readonly');

  // Opens the desired object store (in this case it's 'jate')
  const store = tx.objectStore('jate');

  // Utilizes the 'getAll' method that retrieves all the stored data within the DB
  const request = store.getAll();

  // Confirms the request
  const result = await request;
  console.log(result);
}

initdb();
