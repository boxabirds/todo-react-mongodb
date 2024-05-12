import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const { data } = await axios.get('http://localhost:5001/todos');
        setTodos(data);
    };

    const addTodo = async () => {
        if (input) {
            const { data } = await axios.post('http://localhost:5001/todos', { text: input, isCompleted: false });
            setTodos([...todos, data]);
            setInput('');
        }
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5001/todos/${id}`);
        fetchTodos();
    };

    return (
        <div>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        {todo.text} <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
