'use client'

import { Inter } from "next/font/google"; 
import "./globals.css";
import Script from "next/script";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [rocketImage, setRocketImage] = useState('/image/rocketo.png');
  const [coinImage, setCoinImage] = useState('/image/zadanieo.png');
  const [profileImage, setProfileImage] = useState('/image/profileo.png');
  const [shopImage, setShopImage] = useState('/image/shopo.png');
  const [friendsImage, setFriendsImage] = useState('/image/friends1.png');

  // Состояние для индикации активного экрана
  const [activeScreen, setActiveScreen] = useState('/'); 

 

  const handleCoinClick = () => {
    setActiveScreen('/coin'); // Устанавливаем activeScreen при нажатии
    router.push('/coin');
    
  };

  const handleShopClick = () => {
    setActiveScreen('/shop'); // Устанавливаем activeScreen при нажатии
    router.push('/shop');
    
  };

  const handleRocketClick = () => {
    setActiveScreen('/'); // Устанавливаем activeScreen при нажатии
    router.push('/');
    
  };

  const handleFriendsClick = () => {
    setActiveScreen('/friends'); // Устанавливаем activeScreen при нажатии
    router.push('/friends');
    
  };


  

  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        <title>Clicer Rocket</title>
      </head>
      <body className={`${inter.className} overflow-hidden`} style={{ height: '100vh' }}>
        <div className="pb-0" style={{ minHeight: '100vh' }}> 
          {children}
        </div>

        {/* Панель кнопок */}
        <div className="fixed bottom-2 left-0 w-full p-3.5 flex justify-center gap-20 z-10 gradient-bg"> 
          <div className="bg-opacity-60 bg-black rounded-full p-2 flex gap-6" style={{ boxShadow: '0 5px 30px rgba(0, 0, 0, 0.10)' }}>
            <button 
              className={`relative w-10 h-13 rounded-md focus:outline-none ${activeScreen === '/' ? 'active' : ''}`} // Добавляем класс "active"
              onClick={handleRocketClick}
            > 
              <img src={rocketImage} alt="Button 1" className="w-full h-full object-cover rounded-md" />
            </button> 
            <button 
              className={`relative w-10 h-13 rounded-md focus:outline-none ${activeScreen === '/coin' ? 'active' : ''}`} // Добавляем класс "active"
              onClick={handleCoinClick}
            > 
              <img src={coinImage} alt="Button 2" className="w-full h-full object-cover rounded-md" />
            </button>
            <button 
              className={`relative w-10 h-13 rounded-md focus:outline-none ${activeScreen === '/shop' ? 'active' : ''}`} // Добавляем класс "active"
              onClick={handleShopClick}
            > 
              <img src={shopImage} alt="Button 3" className="w-full h-full object-cover rounded-md" />
            </button>
            <button 
              className={`relative w-10 h-13 rounded-md focus:outline-none ${activeScreen === '/friends' ? 'active' : ''}`} // Добавляем класс "active"
              onClick={handleFriendsClick}
            > 
              <img src={friendsImage} alt="Button 4" className="w-full h-full object-cover rounded-md" />
            </button>
            
                        
          </div>
        </div>
      </body>
    </html>
  );
}