// resources/js/Pages/SiswaMessages/Index.jsx

import { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';

export default function SiswaMessages() {
    const { messages } = usePage().props;
    const [newMessage, setNewMessage] = useState('');
    const [receiverId, setReceiverId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(route('siswa.messages.store'), { receiver_id: receiverId, message: newMessage })
            .then(() => {
                setNewMessage('');
                setReceiverId('');
                // Refresh pesan atau tambahkan pesan baru ke state
            });
    };

    return (
        <div>
            <h1>Pesan</h1>
            <ul>
                {messages.map(msg => (
                    <li key={msg.id}>
                        <strong>{msg.sender.name}</strong>: {msg.message}
                        {!msg.is_read && <span> (Belum dibaca)</span>}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tulis pesan..."
                />
                <input
                    type="text"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                    placeholder="ID Penerima"
                />
                <button type="submit">Kirim</button>
            </form>
        </div>
    );
}
