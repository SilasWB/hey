'use client';

import { useState } from 'react';
import '../login/login.scss';
import { FaUser, FaKey, FaFingerprint } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginFormel (){
    const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
  router.push('/walkthrough'); 
    }
  }; 

  return (
    <main>
    <div className="login-container">
      <h2 className="login-title">Log In</h2>

     <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">Username</label>
        <div className="login-input-wrapper">
          <input 
            type="text" 
            placeholder="Enter your username" 
            className="login-input"
            value={username}
           onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="login-icon" />
        </div>

        <label className="login-label">Password</label>
        <div className="login-input-wrapper">
          <input 
            type="password" 
            placeholder="Enter your password" 
            className="login-input"
            value={password}
           onChange={(e) => setPassword(e.target.value)}
          />
          <FaKey className="login-icon" />
        </div> 

<Link href={
  `https://accounts.spotify.com/authorize?` 
  + `response_type=code` 
  + `&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}` 
  + `&scope=user-read-private user-read-email`
  + `&redirect_uri=${process.env.NEXT_PUBLIC_CALLBACK_URL}`

}>
        LOG IN
 </Link>     
  </form>

      <div className="fingerprint-container">

        <div className="fingerprint-button" onClick={() => router.push('/walkthrough')}>
          <FaFingerprint />
        </div>
        <p className="fingerprint-text">One-Touch Login</p>
    
      </div>
     
    </div>
    </main>
  );
};