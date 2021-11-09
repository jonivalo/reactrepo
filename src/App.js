import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const URL = 'http://localhost/todo/index.php'


function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  
  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setTasks(response.data)
      }).catch(error => {
        alert(error.response ? error.response.data.error : error); 
        
      });
  },[])

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:task})
    axios.post(URL + 'add.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
  })
    .then((response) => {
      setTasks(tasks => [...tasks,response.data]);
      setTask('');
  }).catch (error => {
    alert(error.response.data.error)
  });
  
  }


  return (
    <div classname='container'>
    <h3>Shopping List</h3>
    <form onSubmit={save}>
      <label>Lisääppä</label>
      <input value={task} onChange={e => setTask(e.target.value)} />
      <button>Save</button>
    </form>
    <ol>
      {tasks?.map(task => (
        <li key={task.id}>{task.description}</li> 
      ))}
    </ol>
    </div>
  );
}

export default App;
