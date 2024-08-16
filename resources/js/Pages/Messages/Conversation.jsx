import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Conversation = ({ messages, receiver }) => {
  const { data, setData, post, processing, errors } = useForm({
    message: '',
    attachment: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('messages.store', { receiver_id: receiver.id }), {
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
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-md px-4 py-2 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{receiver.name}</h1>
        <a href="/messages" className="text-purple-500 hover:text-purple-600 ">Kembali</a>
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender_name === receiver.name ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg shadow-md ${
                  message.sender_name === receiver.name ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
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
        <form onSubmit={handleSubmit} className="flex items-center">
          <textarea
            value={data.message}
            onChange={(e) => setData('message', e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg shadow-sm resize-none"
            rows="2"
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="ml-2"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-12 h-12 rounded-lg ml-2"
            />
          )}
          <button
            type="submit"
            disabled={processing}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </form>
        {errors.message && <div className="text-red-500 mt-2">{errors.message}</div>}
        {errors.attachment && <div className="text-red-500 mt-2">{errors.attachment}</div>}
      </footer>
    </div>
  );
};

export default Conversation;
