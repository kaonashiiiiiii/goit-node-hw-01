const contacts = require('./contacts');

const { Command } = require('commander');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          const liContacts = await contacts.listContacts();
          console.table(liContacts);
          break;

    case 'get':
          const contact = await contacts.getContactById(id);
          if (contact) {
            console.log('Contact:', contact);
          } else {
        console.error('Contact not found');

          }
          break;

    case 'add':
          const newContact = await contacts.addContact(name, email, phone);
        console.log('Add contact:', newContact);

          break;

    case 'remove':
          const removedContact = await contacts.removeContact(id);
          if (removedContact) {
              console.log('Removed contact', removedContact)
          } else {
                  console.error('Contact not found or could not be removed');
    
          }
          break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);