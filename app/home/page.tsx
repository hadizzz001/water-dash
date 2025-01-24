"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

const HomeButtons = () => {
  const router = useRouter();

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh' 
    }}>
      <button 
        style={{ backgroundColor: 'grey', color: 'white', padding: '20px', margin: '5px' }}
        onClick={() => router.push('/homeB')}
      >
        Home Banner
      </button>
      <button 
        style={{ backgroundColor: 'grey', color: 'white', padding: '20px', margin: '5px' }}
        onClick={() => router.push('/homeA')}
      >
        Home About
      </button>
      <button 
        style={{ backgroundColor: 'grey', color: 'white', padding: '20px', margin: '5px' }}
        onClick={() => router.push('/homeS')}
      >
        Home Services
      </button>
    </div>
  );
};

export default HomeButtons;
