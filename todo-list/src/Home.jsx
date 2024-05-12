import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }

    const handleEdit = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo._id === id) {
                return { ...todo, done: !todo.done }; // Изменяем значение done на противоположное
            }
            return todo;
        });

        axios.put('http://localhost:3001/update/' + id)
            .then(result => {
                setTodos(updatedTodos);
            })
            .catch(err => console.log(err));
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => {
                const filteredTodos = todos.filter(todo => todo._id !== id);
                setTodos(filteredTodos);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="home">
            <h1>Todo List</h1>
            <Create fetchTodos={fetchTodos} />
            <br />
            {todos.length === 0 ?
                <div><h2>No record</h2></div>
                :
                todos.map(todo => (
                    <div className="task" key={todo._id}>
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ?
                                <BsFillCheckCircleFill className="icon" />
                                :
                                <BsCircleFill className="icon" />
                            }
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span>
                                <BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} />
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
