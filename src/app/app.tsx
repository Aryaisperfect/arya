import { useState } from 'react';
import { TabList, Tabs, Tab, TabPanel, Grid, Stack, Box } from '@mui/joy';
import { Interactive } from 'src/components/interactive';
import { Login } from 'src/components/login/login';
import { Quizzes } from 'src/components/quiz/quizzes';
import { Users } from 'src/components/users/users';
import { setLoggedInUser, useLoggedInUser } from 'src/states/login-state';
import { AppBar } from '@mui/material';

export const AppMenu = () => {
  return (
    <>
      <div>
        <Tabs orientation='horizontal'>
          <TabList>
            <Tab>Users</Tab>
            <Tab>Quizzes</Tab>
          </TabList>
          <TabPanel value={0}>
            <div style={{ height: 'calc(100vh - 60px)' }}>
              <Users></Users>
            </div>
          </TabPanel>
          <TabPanel value={1}>
            <Quizzes></Quizzes>
          </TabPanel>
        </Tabs>
      </div>
    </>
  )
}

export const App = () => {
  const loggedInUser = useLoggedInUser();
  return(
    <>
      {/* {!loggedInUser? <AppMenu></AppMenu>: <Login onLoggedIn={(loggedInUser, role) => {
              setLoggedInUser({loggedInUser,  role})
            }}></Login>} */}
            <div style={{height: '30px'}}></div>
            <div style={{height: 'calc(100vh - 30px)'}}>
            {loggedInUser? <AppMenu></AppMenu>: <Login onLoggedIn={(loggedInUser, role) => {
              setLoggedInUser({loggedInUser,  role})
            }}></Login>}

            </div>
    </>
  )
}

export default App;
