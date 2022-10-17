import React,{useState,useEffect} from 'react';
import axios from 'axios'

function Home() {
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [newPhone,setNewPhone] = useState('');
    const [newName,setNewName] = useState('');
    const [contacts,setContacts] = useState([])

    const addContact = () =>{
        axios.post('http://localhost:3001/',{
            name : name,
            phone : phone,
        })
        getAll()
    }
    const editContact = (id) =>{
        axios.put(`http://localhost:3001/update`,{
            id : id,
            newName : newName,
            newPhone : newPhone,
        }).then(()=> getAll())
        
    }

    const deleteContact = (id) =>{
        try {
            axios.delete(`http://localhost:3001/delete/${id}`).then(()=> getAll())
        } catch (error) {
            console.log(error)
        }
    }
    
    const getAll = () =>{
        axios.get('http://localhost:3001/')
        .then((response)=>{ setContacts(response.data)})
    };
    useEffect( () => {
        getAll()
    },[])

  return (
    <>
    <div>
        <label htmlFor="name">Name</label>
        <input type="text" placeholder='name' name='name' value={name} onChange={(e)=> setName(e.target.value)}/>
        <label htmlFor="phone number">Phone number</label>
        <input type="tel" placeholder='phone number' name='phone' value={phone} onChange={(e)=> setPhone(e.target.value)} />
        <input type="submit" value="Add Contact" onClick={addContact} />
    </div>
    <div>
        <h1 className='text-center text-blue-100'>Contacts</h1>
        <div>
            {
               contacts.length === 0? <p>No Contacts Saved</p> : contacts.map((val,key)=>{
                return <div key={key}>
                    <span>{val.name}</span>
                    <span style={{marginLeft: '5px'}} >{val.phone}</span>
                    <label htmlFor="newName">Edit Name</label>
                    <input type="text" placeholder='name' name='name' value={val.newName} onChange={(e)=> setNewName(e.target.value)}/>
                    <label htmlFor="new phone number">Edit Phone number</label>
                    <input type="tel" placeholder='phone number' name='phone' value={val.newPhone} onChange={(e)=> setNewPhone(e.target.value)} />
                    <input type="button" value="update" onClick={()=>editContact(val._id)} />
                    <input type="button" value="delete" onClick={()=>deleteContact(val._id)} />
                </div>
               })
            }
        </div>
    </div>
    </>
  )
}

export default Home;