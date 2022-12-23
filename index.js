const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { program } = require("commander");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log("Contact List");
      const contacts = await listContacts();
      console.log(contacts);
      break;
    case "get":
      console.log("Contact by ID");
      const contact = await getContactById(id);
      console.log(contact);
      break;
    case "add":
      console.log("Add contact:", name);
      await addContact(name, email, phone);
      break;
    case "remove":
      console.log("Remove contact");
      await removeContact(id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const options = program.opts();
invokeAction(options);
