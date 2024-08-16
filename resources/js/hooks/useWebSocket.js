import { useEffect } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

const useWebSocket = (url) => {
    useEffect(() => {
        const socket = io(url);

        socket.on('new-message', (message) => {
            toast.info(`New message from ${message.sender_name}`);
        });

        return () => {
            socket.disconnect();
        };
    }, [url]);
};

export default useWebSocket;
