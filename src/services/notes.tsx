import Store from 'electron-store';

const store = new Store();

const getDay = (day: string) => {
  return store.get(day) as string[];
};

const addNote = (day: string, note: string) => {
  let current = store.get(day) as string[];
  if (!current) {
    store.set(day, []);
    current = store.get(day) as string[];
  }
  const updated = current.concat(note);
  store.set(day, updated);
};

const deleteNote = (day: string, index: number) => {
  const dayArr = store.get(day) as string[];
  dayArr.splice(index, 1);
  store.set(day, dayArr);
};

export default { getDay, addNote, deleteNote };
