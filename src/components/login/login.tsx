import { useState } from 'react';
import './login.css'; // CSS file for dark academia styling
import { loginToSession } from 'src/api-interface/session-login';

interface Session {
  name: string,
  sessionId: string,
  category: string,
  numberOfQuestions: number,
  sessionStarted?: Date,
  questions?: unknown[]
}

export const Login = ({ onLoggedIn }: { onLoggedIn: (session: Session) => void }) => {
  const [sessionInfo, setSessionInfo] = useState<{ name: string, password: string, sessionId: string }>({ name: '', password: '', sessionId: '' });
  const [error, setError] = useState<string>();

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
            setSessionInfo((prev) => ({ ...prev, name: value }));
          }}
        />

        <label className="login-label">Password:</label>
        <input
          type="password"
          id="lname"
          name="lname"
          placeholder="Shhh password..."
          className="login-input"
          onChange={({ target: { value } }) => {
            setSessionInfo((prev) => ({ ...prev, password: value }));
          }}
        />

        <label className="login-label">Session ID:</label>
        <input
          id="lname"
          name="lname"
          placeholder="Session ID"
          className="login-input"
          onChange={({ target: { value } }) => {
            setSessionInfo((prev) => ({ ...prev, sessionId: value }));
          }}
        />

        <button
          disabled={!sessionInfo.name || !sessionInfo.password || !sessionInfo.sessionId}
          onClick={async () => {
            if (sessionInfo.name && sessionInfo.password && sessionInfo.sessionId) {
              const result = await loginToSession(sessionInfo);
              const { sessionId } = result;
              if (sessionId) {
                onLoggedIn(result)
              }else {
                setError('Invalid session');
              }
            }

          }}
          className="login-button"
        >
          Begin Quest 🔍
        </button>
        {error && <label>{error}</label>}
      </div>
    </>
  );
};
