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
  photo_url?: string; 
  energy: number; 
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [energyLevel, setEnergyLevel] = useState(0) 
  const maxEnergy = 500; 

  // Состояние для управления анимацией
  const [showCards, setShowCards] = useState(false); 

  useEffect(() => {
    if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user) {
      const user = WebApp.initDataUnsafe.user as UserData;
      setUserData(user);
      setEnergyLevel(user.energy); 
    }
  }, []);

  // Function to handle purchase of energy
  const handleEnergyPurchase = () => {
    // This is a placeholder for the actual purchase logic
    // You'll need to implement this based on your app's backend
    setEnergyLevel((prev) => Math.min(prev + 500, maxEnergy)); // Увеличиваем на 500, но не больше maxEnergy
    // ... update user data on backend
  };

  useEffect(() => {
    // Отображаем карточки через 1 секунду
    const timeoutId = setTimeout(() => {
      setShowCards(true);
    }, 0.1);

    // Очищаем таймер при отмонтировании компонента
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main 
      className="p-4 bg-cover bg-center" 
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(rgba(0, 0, 0, 1.8), rgba(452, 184, 136, 1))', 
        backdropFilter: 'blur(10px)' 
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg mb-4 backdrop-blur-md flex flex-col items-center justify-center"> 
        <h1 className="text-xl font-bold text-black mt-4 mb-4">Магазин</h1> 
        <h2 className="text-lg font-medium text-gray-600 mt-2 mb-7">Бустеры</h2> 
        <div className={`flex flex-row items-center justify-start gap-4 mb-4 ${showCards ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: 'opacity 1s ease-in-out' }} //  Анимация  непрозрачности
        > 

          <div className="bg-white rounded-lg shadow-md p-3 flex flex-col items-center justify-center w-40 h-55">  
            <img 
              src="./image/toplivo.png" 
              alt="Топливо" 
              className="w-15 h-15 mb-2" 
            />
            <span className="text-base font-normal mb-2">Запас топлива</span> 
            <button 
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold py-1 px-7 rounded focus:outline-none focus:shadow-outline flex items-center" 
              onClick={handleEnergyPurchase}
            >
              <img 
                src="./image/coin.png" 
                alt="Coin" 
                className="w-4 h-4 mr-2" 
              />
              500
            </button> 
          </div>

          <div className="bg-white rounded-lg shadow-md p-3 flex flex-col items-center justify-center w-40 h-55"> 
            <img 
              src="./image/+1.png" 
              alt="Ускорение" 
              className="w-15 h-15 mb-2" 
            />
            <span className="text-base font-normal mb-2">Мультизаправка</span> 
            <button 
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold py-1 px-7 rounded focus:outline-none focus:shadow-outline flex items-center" 
              // onClick={handleSpeedBoost} // Добавьте обработчик для ускорения
            >
              <img 
                src="./image/coin.png" 
                alt="Coin" 
                className="w-4 h-4 mr-2" 
              />
              500
            </button> 
          </div>

        </div>
      </div>
        
    </main>
  );
}