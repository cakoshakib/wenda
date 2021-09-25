import Store from 'electron-store';
import { Note } from '../types';

const d = new Date();
const lastSunday = new Date(d.setDate(d.getDate() - d.getDay() + 1));
const weekTitle = `Week of ${new Intl.DateTimeFormat('en-US', {
  month: 'long',
}).format(lastSunday)} ${lastSunday.getDate()}, ${lastSunday.getFullYear()}`;

let store = new Store({ name: weekTitle, cwd: 'weeks' });

const setWeek = (week: string) => {
  store = new Store({ name: week, cwd: 'weeks' });
};

const getDay = (day: string) => {
  return store.get(day) as Note[];
};

const addNote = (day: string, content: string) => {
  let current = store.get(day) as Note[];
  if (!current) {
    store.set(day, []);
    current = store.get(day) as Note[];
  }
  const updated = current.concat({ content, checked: false });
  store.set(day, updated);
};

const deleteNote = (day: string, index: number) => {
  const dayArr = store.get(day) as Note[];
  dayArr.splice(index, 1);
  store.set(day, dayArr);
};

const editNote = (day: string, index: number, newNote: string) => {
  const dayArr = store.get(day) as Note[];
  dayArr[index].content = newNote;
  store.set(day, dayArr);
};

const archiveNotes = (week: string) => {
  const archiveStore = new Store({ name: week, cwd: 'weeks' });
  archiveStore.store = store.store;
  store.store = {};
};

const toggleChecked = (day: string, index: number) => {
  const dayArr = store.get(day) as Note[];
  dayArr[index].checked = !dayArr[index].checked;
  store.set(day, dayArr);
};

export default {
  getDay,
  addNote,
  deleteNote,
  editNote,
  archiveNotes,
  toggleChecked,
  setWeek,
};
