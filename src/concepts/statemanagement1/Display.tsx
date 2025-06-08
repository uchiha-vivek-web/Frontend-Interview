// src/components/Display.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  firstName: string;
  lastName: string;
}

const Display: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  console.log(state)
  useEffect(() => {
    if (!state) {
      navigate('/form'); // Redirect if no data was passed
    }
  }, [state, navigate]);

  if (!state) return null;

  const { firstName, lastName } = state;
  const fullName = `${firstName.trim()} ${lastName.trim()}`;

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-100 p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Display Page</h2>
      <p className="mb-2"><strong>First Name:</strong> {firstName}</p>
      <p className="mb-2"><strong>Last Name:</strong> {lastName}</p>
      <p className="text-blue-600 font-semibold mt-4"><strong>Full Name:</strong> {fullName}</p>
    </div>
  );
};

export default Display;
