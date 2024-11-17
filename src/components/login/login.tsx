import { useState } from 'react';
import './login.css'; // CSS file for dark academia styling

export const Login = ({ onLoggedIn }: { onLoggedIn: (loggedInUser: string, role: 'admin' | 'candidate') => void }) => {
  const [user, setUser] = useState<{ loggedInUser: string }>();

  return (
    <>
      <div className="login-container">
        <h2 className="login-title">Library of quizzes, are you ready?</h2>
        
        <label className="login-label">Username:</label>
        <input 
          type="text" 
          id="fname" 
          name="fname" 
          placeholder="Scholar's name..." 
          className="login-input"
          onChange={({ target: { value } }) => {
            setUser((prev) => ({ ...prev, loggedInUser: value }))
          }} 
        />
        
        <label className="login-label">Password:</label>
        <input 
          type="password" 
          id="lname" 
          name="lname" 
          placeholder="Shhh password..." 
          className="login-input"
        />
        
        <button 
          disabled={!user?.loggedInUser} 
          onClick={() => {
            user?.loggedInUser && onLoggedIn(user?.loggedInUser, 'admin')
          }}
          className="login-button"
        >
          Begin Quest 🔍
        </button>
      </div>
    </>
  );
};
