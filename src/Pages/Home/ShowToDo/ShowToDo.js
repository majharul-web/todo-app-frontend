import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const ShowToDo = () => {
    const { user } = useAuth();
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/todo/${user.email}`)
            .then(res => res.json())
            .then(data => setTodo(data))
    }, [user.email]);

    return (
        <div>
            <h3>show todo {todo.length}</h3>
        </div>
    );
};

export default ShowToDo;