import axios from 'axios';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

const Chat = () => {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        axios.get('/api/ws').catch(err => console.log(err))
        socket = io();

        socket.on('message', (message) => {
            setCounter(message)
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const increment = () => {
        socket.emit('increment', true);
    };

    return (
        <div>
            <div>counter: {counter}</div>
            <button onClick={increment}>inc</button>
        </div>
    );
};

export default Chat;