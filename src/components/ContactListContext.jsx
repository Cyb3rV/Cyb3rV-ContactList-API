const { useState, createContext, useReducer, useEffect } = require("react");

const ContactListContext = createContext(null);

const addContact = (contact) => {
  console.log("crear usuario");
  fetch('https://playground.4geeks.com/contact/agendas/Cyb3rV/contacts', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(
          // slug: "Cyb3rV",
          // contacts: [contact] // Asegúrate de que contact sea un objeto que represente un contacto
          contact
          )
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
  })
  .catch(error => {
      console.log('Error:', error);
  });
};


function ContactListReducer(state, action){
    
    switch(action.type){
        case "add":
            addContact(action.payload);
            return [...state, action.payload];
        case "remove":
            const index = action.payload;
              
            if (index < 0 || index >= state.length) {
              console.warn('Índice fuera de límites');
              return state;
            }
              
            const newState = [...state];
            newState.splice(index, 1);
            return newState;
        case "getData":
          return ConsultData();
        
        default:
            return;
    }
}
// [{
//   name: "Mike Anamendolla",
//   address: "5842 HillCrest Rd",
//   phone: "(870)288-4149",
//   email: "mike.ana@example.com"
// }]

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


const LoadData = () => {
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
    console.log(data);
    return data;
  })
  .catch(error => console.log('Error:', error));
}


export function ContactListProvider({children}) {
    // const [contactsList, setContactList] = useState();
    const [contactList, contactListActions] = useReducer(ContactListReducer, []);




    useEffect(() => {
      console.log(contactList);
    },[contactList])

    useEffect(() => {
      LoadData();
    },[])


    return(
        <ContactListContext.Provider value={{contactList, contactListActions}}>{children}</ContactListContext.Provider>
    )
}

export default ContactListContext;