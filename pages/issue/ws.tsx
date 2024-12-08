import { DefaultEventsMap } from '@socket.io/component-emitter';
import axios from 'axios';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import Header from '../../components/Header';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const sButton = "px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

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
        <div className='flex flex-col gap-4 p-4'>
            <Header />
            <p className='text-white'>counter: <span className='text-green-900'>{counter}</span></p>
            <button type="button" className={sButton} onClick={increment}>inc</button>
        </div >
    );
};

export default Chat;