import React, {useEffect, useState} from 'react';
import './App.css';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";


function App() {
  const[isCompleteScreen, setIsCompleteScreen] = useState(false)
  const[allTodos, setTodos] = useState([]);
  const[newTitle, setNewTitle]= useState('');
  const[newDescription, setNewDescription] = useState('')
const [completedTodos, setCompletedTodos] = useState([])


  const handleAddTodo = ()=>{
    const newTodoItem = {
      title:newTitle,
      description:newDescription
    }

    const updateTodoArr = [...allTodos]
    updateTodoArr.push(newTodoItem)
    setTodos(updateTodoArr)
    localStorage.setItem('todolist', JSON.stringify(updateTodoArr))
  };

const handleDeleteTodo = (index) => {

const reducedTodo = [...allTodos]
reducedTodo.splice(index, 1)
localStorage.setItem('todolist', JSON.stringify(reducedTodo))
setTodos(reducedTodo)
}

const handleComplete = (index)=> {
  const now = new Date()
  const dd = now.getDate()
  const mm = now.getMonth() + 1
  const yyyy = now.getFullYear()
  const h = now.getHours()
  const m = now.getMinutes()
  const s = now.getSeconds()
  const completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + 5;

  const filteredItem = {
    ...allTodos[index], 
    completedOn:completedOn
  }

  const updatedCompletedArr = [...completedTodos];
  updatedCompletedArr.push(filteredItem)
  setCompletedTodos(updatedCompletedArr)
  handleDeleteTodo(index)
  localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr))
}

const handleDeleteCompletedTodo = (index) => {

  const reducedTodo = [...completedTodos]
  reducedTodo.splice(index, 1)
  localStorage.setItem('completedTodos', JSON.stringify(reducedTodo))
  setCompletedTodos(reducedTodo)
  }

  useEffect(()=>{
const savedTodo = JSON.parse(localStorage.getItem('todolist'))
const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
if(savedTodo) {
  setTodos(savedTodo);
}

if(savedCompletedTodo) {
  setCompletedTodos(savedTodo);
}

  }, [])

  return (
    <div className="App">
      <h1 data-test-id="general-title">My ToDo List</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
        
        <div className='todo-input-item'>
        <label>Title</label>
        <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Task title" data-test-id="title-field" />
        </div>
        <div className='todo-input-item'>
        <label>Description</label>
        <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="Task description" data-test-id="task-description" />
        </div>
        <div className='todo-input-item'>
        <button type="button" onClick={handleAddTodo} className='primaryBtn' data-test-id="add-button">add</button>
        </div>
        </div>
        <div className='btn-area'>
             <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)} data-test-id="todo-tab">ToDo</button>
             <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)} data-test-id="completed-tab">Completed</button>
        </div>
        <div className="todo-list">
          
          {isCompleteScreen===false && allTodos.map((item, index) => {
            return(
              <div className="todo-list-item" key={index} data-test-id={`todo-list-item${index}`}>
                <div>
                <h3 data-test-id="title">{item.title}</h3>
                <p data-test-id="description">{item.description}</p>
                </div>
        
          <div className="todo-actions">
            <AiOutlineDelete className="icon" onClick={()=>handleDeleteTodo(index)} title="Delete?" data-test-id="delete-button"/>
            <BsCheckCircle className="check-icon" onClick={()=>handleComplete(index)} title="Complete?" data-test-id="complete-button"/>
          </div>
          </div>
          )}
          )}

{isCompleteScreen===true && completedTodos.map((item, index) => {
            return(
              <div className="todo-list-item" key={index}>
        <div>
        <h3 data-test-id="title">{item.title}</h3>
        <p data-test-id="description">{item.description}</p>
        <p><small data-test-id="completed-time">Completed on:{item.completedOn}</small></p>
        </div>
        
          <div className="todo-actions">
            <AiOutlineDelete className="icon" onClick={()=>handleDeleteCompletedTodo(index)} title="Delete?" data-test-id="delete-completed-button"/>
          </div>
          </div>
          )}
          )}
          </div>
      </div>
    </div>
    
  );
}

export default App;
