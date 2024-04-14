import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

async function getProfile() {
  const results = await makeRequest(`/api/get_profile`)

}
async function logout() {
  const res = await fetch("/registration/logout/", {
    credentials: "same-origin"
  });

  if (res.ok) {
    window.location = "/";
  } else {
  }
}


function App() {
  return (
    <>
      <nav>
        <Link className='pages' to="">Home</Link>
        <Link className = 'pages' to="Profile">Your Profile</Link>
        <Link className= 'pages' to="Game1">Play Game</Link>
        <div className = 'pages' onClick={logout}>Logout</div>
      </nav>
      <Outlet></Outlet>
    </>
  );
}

export default App;
