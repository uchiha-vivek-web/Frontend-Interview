import { useUserStore } from './store';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { firstName, lastName, email, resetUser } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Profile Info</h2>
        <p className="mb-2"><strong>First Name:</strong> {firstName}</p>
        <p className="mb-2"><strong>Last Name:</strong> {lastName}</p>
        <p className="mb-6"><strong>Email:</strong> {email}</p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Edit
          </button>

          <button
            onClick={() => {
              resetUser();
              navigate('/');
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
