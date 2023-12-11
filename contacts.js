const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
       
        console.error("Error reading contacts file:", error.message);
        throw error;
    }
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);

    if (index === -1) {
        return null;
    }

    const removedContact = contacts.splice(index, 1)[0];
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return removedContact;
}

async function addContact(name, email, phone) {
    try {
        const contactsData = await fs.readFile(contactsPath, 'utf-8');
        const contactsArray = JSON.parse(contactsData);

        const id = uuidv4();
        const newContact = { id, name, email, phone };

        contactsArray.push(newContact);

        await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
        return newContact;
    } catch (error) {
        
        console.error("Error writing to contacts file:", error.message);
        throw error;
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};