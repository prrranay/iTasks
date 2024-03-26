import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/";
import { FaEdit,FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { stringify, v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showFinish, setshowFinish] = useState(false);
  useEffect(() => {
    const todoString = localStorage.getItem("to");
    if (todoString) {
      const todosFromStorage = JSON.parse(todoString);
      setTodos(todosFromStorage);
    }
  }, []);
  
  
  const savetoLS=(todos) => { 
    localStorage.setItem("to",JSON.stringify(todos));
   }

   const handleEdit = (e, id) => {
    e.preventDefault();
    const editedTodo = todos.find((item) => item.id === id);
    if (!editedTodo) return; // Safety check
  
    setTodo(editedTodo.todo);
  
    // Remove the edited todo from the todos array
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  
    savetoLS(updatedTodos); // Save the updated todos array to local storage
  };
  
  const handleDeletle = (e,id) => {
    let newTodos= todos.filter((item) => { 
      return item.id != id;
     })
     setTodos(newTodos);
     savetoLS(newTodos);
  };
  const handleTodo = (e) => {
    setTodo(e.target.value);
  };
  const handleAdd = () => {
    if (!todo.trim()) return; // Prevent adding empty todos
  
    const newTodo = { id: uuidv4(), todo, isCompleted: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setTodo(""); // Clear the input field after adding todo
    savetoLS(updatedTodos); // Save the updated todos array to local storage
  };
  
  const handleChange = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(newTodos);
    savetoLS(newTodos); // Save the updated todos array to local storage
  };

  const toggleFinish=(e) => { 
    setshowFinish(!showFinish);
   }
  
  return (
    <div>
      <Navbar />
      <div className="md:container min-h-[80vh] mx-3 md:mx-auto md:w-[60%] my-5 rounded-xl p-5 bg-violet-100">
        <h1 className="font-bold text-center text-3xl">iTask - manage your all tasks at one place.</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <div className="flex">
          <input
            type="text"
            onChange={handleTodo}
            value={todo}
            className="w-full px-4 py-1 rounded-full"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-4 py-2 text-sm font-bold text-white mx-2  rounded-md"
          >
            <FaSave />
          </button>
          </div>
        </div>
        <input id="finish" className="my-4" type="checkbox" onClick={toggleFinish} checked={showFinish} /><label htmlFor="finish" className="mx-2">Show Finished</label>
        <div className="h-[1px] bg-black opacity-20 mx-auto my-1 w-[90%]"></div>
        <h2 className="text-xl font-bold">Your Todo</h2>
        <div className="todos">
          {todos.length===0 && <div className="m-5">no Tasks to display</div>}
          
          {todos.map((item) => {
           return (showFinish || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-2">
              <input name={item.id} onChange={handleChange} type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              <div className="btn flex h-full">
                <button
                  onClick={(e)=>{handleEdit(e,item.id)}}
                  className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white  rounded-md mx-1"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e)=>{handleDeletle(e,item.id)}}
                  className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white  rounded-md mx-1"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
