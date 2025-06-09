import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from './store';

export default function FormPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ firstName, lastName, email });
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Enter Your Details</h2>

        <input
          type="text"
          placeholder="First Name"
          className="mb-4 w-full p-2 border rounded"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          className="mb-4 w-full p-2 border rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="mb-6 w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
