import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Todo from './ToDo';
import * as serviceWorker from './serviceWorker';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './styles.scss'
import database,{firebase} from './firebase';
import { RemoveCircleOutlineSharp } from '@material-ui/icons';


const expenses =[];

const Main =()=>
{

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect ( ()=> {

     const render= async ()=>{

    await database.ref('todos').once('value').then((snapshot)=>{
      const getTodo=[];
          snapshot.forEach((childSnapshot)=>{

            getTodo.push({
              id: childSnapshot.key,
              text: childSnapshot.val()

            });
            
            
            // setTodos([
            //   ...todos,
            //   {
            //     id: childSnapshot.key,
            //     text: childSnapshot.val()
            //   } ]);
              
          });
          console.log('gettodo',getTodo);
          setTodos([
            ...todos,
            ...getTodo
          ]);
          console.log('todo',todos);
        })
      }
      render();
       

  },[]);


  const onClick=(e)=>{
    
    e.preventDefault();

      database.ref('todos').push(input).then((ref)=>{
         setTodos(
          [...todos,
            {
              id: ref.key,
              text:input
          }  
          ]);
      });
    setInput('');
    // console.log(todos);

  };

  const onRemove=(removeTodo)=>{

      // console.log(removeTodo);
      database.ref(`todos/${removeTodo.id}`).remove().then(()=>{
        return   setTodos(todos.filter((todo)=> todo.text !==removeTodo.text));
      });
    
      // console.log(todos);
  };

  
  // const list=()=>{
  //   database.ref('todos').once('value', (snapshot)=>{
  //   snapshot.forEach((childSnapshot)=>{
  //         setTodos(
  //           ...todos,
  //           {
  //           id: childSnapshot.key,
  //           text: childSnapshot.val()
  //         })
  //       })
  //     }).then(()=>{ 
  //       console.log(todos); 
  //     })

  // };
                 
  
  return(
    <div >
        <div className='header'>
      <h1 className='content-container'>Things to do</h1>
      </div>
      <div className='body'>
    <form className ='content-container' onSubmit= {onClick}>

  <TextField value={input} onChange={e=> setInput(e.target.value)} id="standard-basic" label="Todo" />
  <Button variant="contained" type="submit" color="primary" disabled={!input}>
        Add Todo
      </Button>

    </form>
    </div>
    <ul>
      {todos.map((todo)=>(
      <Todo key={todo.text} todo={todo} onRemove={()=>onRemove(todo)} />)
   )}
  
    </ul> 
    {/* <button onClick={list}>List</button> */}
    
  </div>
    
  );
   }


  //  const render=()=>{
  //    return (
  //   database.ref('todos').once('value').then((snapshot)=>{
  //     snapshot.forEach((childSnapshot)=>{
  //       setTodos([
  //         ...todos,
  //         {
  //           id: childSnapshot.key,
  //           text: childSnapshot.val()
  //         } ]);
          
  //     });
  //   })
  //   )
  //  };

ReactDOM.render(
  <Main /> ,
  document.getElementById('root')
);

// database.ref('todos').once('value', (snapshot)=>{
//   return snapshot.forEach((childSnapshot)=>{
//     return setTodos({
//       id: childSnapshot.key,
//       text: childSnapshot.val()
//     })
//   })
// }).then(()=>{ 
//   console.log(todos);
// }
// export const startSetExpense =()=>{
//   return (dispatch,getState) =>{
//     const uid = getState().auth.uid;
//     return database.ref(`users/${uid}/expenses`).once('value').then((snapshot)=>{
//       const expenses=[];
//       snapshot.forEach((childSnapshot) => {
//           expenses.push({
//           id:childSnapshot.key,
//           ...childSnapshot.val()
//         })
//       });
//         dispatch(setExpenses(expenses));
//     });