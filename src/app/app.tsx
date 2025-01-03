import { Login } from 'src/components/login/login';
import { Quizzes } from 'src/components/quiz/quizzes';
import { setSession, useSession } from 'src/states/login-state';

export const App = () => {
  const session = useSession();
  return (
    <>
      <div style={{ height: '30px' }}></div>
      <div style={{ height: 'calc(100vh - 30px)' }}>
        {session ? <Quizzes></Quizzes> : <Login onLoggedIn={(session) => {
          setSession(session);
        }}></Login>}

      </div>
    </>
  )
}

export default App;
