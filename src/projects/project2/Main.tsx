import {  Routes, Route } from 'react-router-dom';
import FormPage from './FormPage';
import ProfilePage from './ProfilePage';

export default function Project2() {
  return (
    
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    
  );
}


