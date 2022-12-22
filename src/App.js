import React,{ useState  } from 'react';
import './App.css';

function App() {

  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  function addItem() {
  
    if (!newItem) {
      alert("Press enter an item.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      completed:false,
    };

  
    setItems((oldList) => [...oldList, item]);

  
    setNewItem("");
  }

 
  function deleteItem(id,completed) {
    if(completed===false)
    {
      alert("you are not complete ");
      return;
    }
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

 
  function editItem(id, newText) {
    
    const currentItem = items.filter((item) => item.id === id);

  
    const newItem = {
      id: currentItem.id,
      value: newText,
      completed:false
    };

    deleteItem(id);
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }
  const done=(id,value)=>
  {
     const currentItem=items.filter((item)=>item.id===id);
     const newitem={
      id:currentItem.id,
      value:value,
      completed:true,
     }
     deleteItem(id);
     setItems((oldList) => [...oldList, newitem]);
     setUpdatedText("");
     setShowEdit(-1);
     
  }
  return(
   <div className='APP'>
     <h1> Todo List App</h1>

     
<input
  type="text"
  placeholder="Add an item..."
  value={newItem}
  onChange={(e) => setNewItem(e.target.value)}
/>

<br>
</br>
<button  onClick={() => addItem()}>Add</button>


<ul>
  {items.map((item) => {
    return (
      <div>
        <li key={item.id} >
          {item.value}
          <button
            className="delete-button"
            onClick={() => deleteItem(item.id ,item.completed)}
          >
            ❌
          </button>
          <button onClick={()=>setShowEdit(item.id)} >✎</button>
          <button onClick={()=>done(item.id,item.value)}>✓</button>
        </li>

        {
        showEdit === item.id ? (
          <div>
            <input
              type="text"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
            <button onClick={() => editItem(item.id, updatedText)}>
              Update
            </button>
          </div>
        ) : null
  }
    </div>
          );
        })}
      </ul>
    
    </div>
  
    );
}
export default  App;
