const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve(__dirname, "db/contacts.json");

async function readDb() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function writeDb(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

async function listContacts() {
  const contacts = await readDb();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.filter((contact) => contact.id === contactId);
  return contactById ? contactById : null;
}

async function removeContact(contactId) {
  const contacts = await readDb();
  const updateContacts = contacts.filter((contact) => contact.id !== contactId);
  await writeDb(updateContacts);
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await readDb();
  contacts.push(newContact);
  await writeDb(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
