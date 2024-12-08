import axios from 'axios';
import { useState, useEffect, SetStateAction } from 'react';
import { Socket } from 'socket.io';
import io from 'socket.io-client';

let socket:any;

const Chat = () => {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        axios.get('/api/ws').catch(err => console.log(err))
        socket = io();

        socket.on('message', (message: SetStateAction<number>) => {
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