'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'

// Define the interface for user data
interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
  photo_url?: string; // Add photo_url to the interface
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);

  return (
    <main 
      className="p-4 bg-cover bg-center" 
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(rgba(0, 0, 0, 1.8), rgba(222, 184, 136, 1))', // Темный фон к бежевому
        backdropFilter: 'blur(10px)' // Эффект размытия
      }}
    >
      {/* Нижняя белая панель */}
      <div className="bg-white p-10 rounded-lg shadow-lg mb-4 backdrop-blur-md flex items-center justify-center">
        <h1 className="text-xl font-bold text-black">Тут будут задания</h1>
      </div>
      
    </main>
  );
}