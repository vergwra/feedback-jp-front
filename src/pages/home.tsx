import React from 'react';
import { useAuth } from '../hooks/auth-provider';

function Home() {
    const { signOut } = useAuth();

    function handleSignOut() {
        signOut()
    }

  return (
    <div>
        Home
        <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}

export default Home;
