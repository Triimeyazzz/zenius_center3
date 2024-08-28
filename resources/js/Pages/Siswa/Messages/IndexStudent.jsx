import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import StudentLayout from '@/Layouts/StudentLayout';
import { FaFileAlt, FaFileImage, FaFilePdf, FaFileAudio, FaFileVideo } from 'react-icons/fa';

const IndexStudent = ({ messages, receiver, user }) => {
  const { data, setData, post, processing, errors } = useForm({
    message: '',
    attachment: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [allMessages, setAllMessages] = useState(messages || []);
  const [notification, setNotification] = useState('');
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNewMessages();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchNewMessages = async () => {
    try {
      const response = await fetch(route('messages.index.student'));
      const data = await response.json();
      const newMessages = data.messages.filter(message => !allMessages.some(m => m.id === message.id));

      if (newMessages.length > 0) {
        setAllMessages(prevMessages => [...prevMessages, ...newMessages]);
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

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FaFileImage className="text-blue-500 w-6 h-6" />;
      case 'pdf':
        return <FaFilePdf className="text-red-500 w-6 h-6" />;
      case 'mp3':
      case 'wav':
        return <FaFileAudio className="text-green-500 w-6 h-6" />;
      case 'mp4':
      case 'avi':
        return <FaFileVideo className="text-yellow-500 w-6 h-6" />;
      default:
        return <FaFileAlt className="text-gray-500 w-6 h-6" />;
    }
  };

  return (
    <StudentLayout siswa={user}>
      <div className="flex flex-col h-screen bg-gray-100">
        <header className="bg-white shadow-md px-4 py-2 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Messages</h1>
          {notification && <div className="text-red-500">{notification}</div>}
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
          {allMessages.map((message) => {
  const isSender = message.sender_name === user?.name; // Cek apakah pengguna adalah pengirim

  return (
    <div
      key={message.id}
      className={`flex ${isSender ? 'justify-end' : 'justify-start'}`} // Pengirim di kanan, penerima di kiri
    >
      <div
        className={`max-w-xs p-3 rounded-lg shadow-xl transition-all duration-300 ${
          isSender ? 'bg-purple-500 text-white' : 'bg-white text-black' // Gaya berbeda untuk pengirim dan penerima
        }`}
      >
        <p className="text-sm font-semibold">{message.sender_name}</p>
        <p className="text-base mt-1">{message.message}</p>
        {message.attachment && (
          <div className="mt-2 flex items-center">
            {message.attachment.endsWith('.jpg') || message.attachment.endsWith('.png') ? (
              <img
                src={message.attachment}
                alt="Attachment"
                className="max-w-full rounded-lg cursor-pointer"
                onClick={() => openModal(message.attachment)} // Open modal on click
              />
            ) : (
              <a
                href={message.attachment}
                download
                className="flex items-center hover:bg-gray-200 p-2 rounded-lg transition duration-200"
              >
                {getFileIcon(message.attachment)} {/* Show file icon */}
                <span className="ml-2 text-sm">{message.attachment.split('/').pop()}</span>
              </a>
            )}
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">{message.created_at}</p>
      </div>
    </div>
  );
})}

          </div>
        </main>
        <footer className="bg-white shadow-md px-4 py-2">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center">
            <textarea
              value={data.message}
              onChange={(e) => setData('message', e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-2 border rounded-lg shadow-sm resize-none sm:mr-2 mb-2 sm:mb-0"
              rows="2"
              required
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="ml-2 mb-2 sm:mb-0"
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
              Send to All Admins
            </button>
          </form>
          {errors.message && <div className="text-red-500 mt-2">{errors.message}</div>}
          {errors.attachment && <div className="text-red-500 mt-2">{errors.attachment}</div>}
        </footer>
      </div>

      {/* Modal for enlarged image */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-4 rounded-lg">
            <img src={modalImage} alt="Enlarged" className="max-w-full rounded-lg" />
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default IndexStudent;
