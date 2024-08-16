import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import StudentLayout from '@/Layouts/StudentLayout';

const IndexStudent = ({ messages, user }) => {
  const { data, setData, post, processing, errors } = useForm({
    message: '',
    attachment: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [newMessages, setNewMessages] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    // Polling interval (e.g., every 30 seconds)
    const interval = setInterval(() => {
      fetchNewMessages();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchNewMessages = async () => {
    try {
      const response = await fetch(route('messages.index.student')); // Adjust the route as needed
      const data = await response.json();
      const newMessages = data.messages.filter(message => !messages.some(m => m.id === message.id));

      if (newMessages.length > 0) {
        setNewMessages(newMessages);
        setNotification('You have new messages!');
      }
    } catch (error) {
      console.error('Error fetching new messages:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('messages.store.student'), {
      preserveScroll: true,
      preserveState: true,
    });
    setData('message', '');
    setData('attachment', null);
    setPreviewUrl(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData('attachment', file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <StudentLayout siswa={user}>
      <div className="flex flex-col h-screen bg-gray-100 rounded-lg">
        <header className="bg-white shadow-md px-4 py-2 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Messages</h1>
          {notification && <div className="text-red-500">{notification}</div>}
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_name === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-full sm:max-w-xs p-3 rounded-lg shadow-md ${
                    message.sender_name === 'You' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
                  }`}
                >
                  <p className="text-sm font-semibold">{message.sender_name}</p>
                  <p className="text-base mt-1">{message.message}</p>
                  {message.attachment && (
                    <img
                      src={message.attachment}
                      alt="Attachment"
                      className="mt-2 max-w-full rounded-lg"
                    />
                  )}
                  <p className="text-xs text-gray-500 mt-1">{message.created_at}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
        <footer className="bg-white shadow-md px-4 py-2">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center">
            <textarea
              value={data.message}
              onChange={(e) => setData('message', e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-2 border rounded-lg shadow-sm resize-none md:mr-2 mb-2 md:mb-0"
              rows="2"
              required
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-2 md:mb-0"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-12 h-12 rounded-lg mb-2 md:mb-0 md:ml-2"
              />
            )}
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send to All Admins
            </button>
          </form>
          {errors.message && <div className="text-red-500 mt-2">{errors.message}</div>}
          {errors.attachment && <div className="text-red-500 mt-2">{errors.attachment}</div>}
        </footer>
      </div>
    </StudentLayout>
  );
};

export default IndexStudent;
