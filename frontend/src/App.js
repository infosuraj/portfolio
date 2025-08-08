import React from 'react';

// importing MyRouts where we located all of our theme
import MyRouts from './routers/routes';
import { ProfileProvider } from './context/profileContext';

function App() {
  return (
    <ProfileProvider>
      <div>
        <MyRouts />
      </div>
    </ProfileProvider>
  );
}

export default App;
