const { useState, createContext, useReducer, useEffect } = require("react");

const ContactListContext = createContext(null);

const addContact = (info) => {
  console.log("agregando contacto");
  fetch('https://playground.4geeks.com/contact/agendas/Cyb3rV/contacts', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(info.contact)
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      LoadData(info.actions);
  })
  .catch(error => {
      console.log('Error:', error);
  });
};
const removeContact = (info) => {
  console.log("removiendo contacto");
  fetch(`https://playground.4geeks.com/contact/agendas/Cyb3rV/contacts/${info.index}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      }
  })
  .then(response => response.json().catch(() => ({})))  // Maneja respuestas vacías devolviendo un objeto vacío
  .then(data => {
      console.log(data);
      LoadData(info.actions);
  })
  .catch(error => {
      console.log('Error:', error);
  });
};
const updateContact = (info) => {
  console.log("agregando contacto");
  fetch(`https://playground.4geeks.com/contact/agendas/Cyb3rV/contacts/${info.index}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(info.contact)
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      LoadData(info.actions);
  })
  .catch(error => {
      console.log('Error:', error);
  });
};
const CreateUser = () => {
  console.log("crear usuario");
  fetch ('https://playground.4geeks.com/contact/agendas/Cyb3rV',{
  'method': 'POST',
  'Content-Type': "application/json"
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('Error:', error));
};
const LoadData = (actions) => {
  console.log("Consultando datos");
  fetch ('https://playground.4geeks.com/contact/agendas/Cyb3rV')
  .then(response => {
    if (response.ok){
      return response.json();
    } else{
      if(response.status === 404)
        CreateUser();
      else{
        throw new Error('Failed to fetch data');
      }
    }
  })
  .then(data => {
    console.log(data.contacts);
    actions({type: "setData", payload: data.contacts});
    return data.contacts;
  })
  .catch(error => console.log('Error:', error));
}


function ContactListReducer(state, action){
    
    switch(action.type){
        case "add":
          addContact(action.payload);
          return state;
        case "remove":
            removeContact(action.payload);
            return state;
        case "update":
          updateContact(action.payload);
          return state;

        case "getData":
          LoadData(action.payload);
          return state;
        case "setData":
            console.log("enviando datos");
            return action.payload;
        
        default:
            return;
    }
}

export function ContactListProvider({children}) {
    // const [contactsList, setContactList] = useState();
    const [contactList, contactListActions] = useReducer(ContactListReducer, []);
    const [currentContact, SetCurrentContact] = useState({});




    useEffect(() => {
      console.log(contactList);
    },[contactList])

    useEffect(() => {
      contactListActions({type: "getData", payload: contactListActions});
    },[])


    return(
        <ContactListContext.Provider value={{contactList, contactListActions, currentContact, SetCurrentContact}}>{children}</ContactListContext.Provider>
    )
}

export default ContactListContext;