'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation';

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
  level: number; // Добавьте свойство level в UserData
  score: number; // Добавьте свойство score в UserData
  points?: '10000'; // Добавляем поле для количества очков
}


export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [energyLevel, setEnergyLevel] = useState(500) 
  const [level, setLevel] = useState(1) // Состояние для level
  const [isPlaying, setIsPlaying] = useState(false); 
  const [isGameOver, setIsGameOver] = useState(false); // Состояние для игры
  const rocketRef = useRef<HTMLImageElement>(null);
  const [rocketPosition, setRocketPosition] = useState({
    
    x: 0,
    y: 0,
  });
  
  const starsRef = useRef<HTMLDivElement>(null); // Ссылка на div с звездами
 
  const router = useRouter();
  
  // Функция для создания падающих звезд
  const createFallingStars = () => {
    if (!starsRef.current) return; // Проверяем, инициализирован ли starsRef

    const starsContainer = starsRef.current;
    const numStars = 50; // Количество падающих звезд

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star'; 

      // Случайные значения для размера, цвета и скорости
      star.style.width = `${Math.random() * 5 + 2}px`;
      star.style.height = `${Math.random() * 5 + 2}px`;
      star.style.backgroundColor = getRandomColor();
      star.style.animation = `falling-star ${getRandomSpeed()}s linear infinite, blink 1s linear infinite`;

      // Случайные координаты для начала падения
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`; 

      // Удаляем звезду после окончания анимации
      star.addEventListener('animationend', () => {
        starsContainer.removeChild(star);
      });

      starsContainer.appendChild(star); 
    }
  };

  const updateRocketPosition = (event: TouchEvent) => {
    if (!rocketRef.current) return;
    const touch = event.touches[0];
    const maxX = window.innerWidth - rocketRef.current.offsetWidth; // Максимальная координата по горизонтали
    const maxY = window.innerHeight - rocketRef.current.offsetHeight; // Максимальная координата по вертикали
    const x = Math.max(0, Math.min(touch.clientX - rocketRef.current.offsetWidth / 2, maxX));
    const y = Math.max(0, Math.min(touch.clientY - rocketRef.current.offsetHeight / 2, maxY));
    setRocketPosition({ x, y });
  };

  // Обработчик начала игры
  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
  };

  // Обработчик окончания игры
  const endGame = () => {
    setIsGameOver(true);
    setIsPlaying(false);
  };

  

  useEffect(() => {
    if (starsRef.current) {
      createFallingStars(); // Создаем звезды при загрузке
    }
  }, []);

  // Используем setInterval для постоянного создания новых звезд
  useEffect(() => {
    const interval = setInterval(() => {
      if (starsRef.current) {
        createFallingStars();
      }
    }, 5000); // Создавать новые звезды каждые 5 секунд

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user) {
      const user = WebApp.initDataUnsafe.user as UserData;
      setUserData(user);
      setEnergyLevel(user.energy); 
      setLevel(user.level); // Устанавливаем начальное значение level
    }
  }, []);
  
  const handleGameClick = () => {
    router.push('/game'); 
  };

  // Функция для предотвращения прокрутки
  const preventScroll = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault(); 
  };

 return (
   <div 
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      // Удалили backgroundImage: 'url(/image/fonrocket.png)'
      background: 'linear-gradient(to right, #000080, #ffffff)',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      // Добавлено свойство для глянца
      filter: 'brightness(120%) saturate(120%)', //  Глянц 
      pointerEvents: 'none',
      touchAction: 'none' /* Prevent scaling with touch events */
      
    }} 
    onTouchMove={preventScroll} // Добавляем обработчик для предотвращения прокрутки
  >
      <div style={{
      position: 'absolute',
      bottom: '15%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      height: '20%',
      background: 'linear-gradient(to top, #2980b9, #6dd5fa, #c0ffff)',
      
      borderRadius: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h2 style={{
      position: 'absolute', 
      top: '20px', 
      left: '20px', 
      color: 'black', 
      fontSize: '0.9rem',
      fontFamily: 'Arial, Helvetica, sans-serif', 
        fontWeight: 'bold', // Добавляем bold
    }}> 🚀 Rocket game  </h2>
      <button 
        className="play-button" 
        onClick={handleGameClick}
        style={{ 
          position: 'fixed',
          padding: '2px 60px', /*  Добавьте отступы к кнопке */
          fontSize: '1.2rem', /*  Увеличить размер шрифта */
          borderRadius: '100px', /*  Скругленные углы */
          border: 'none', /*  Убираем границу кнопки */
          backgroundColor: 'white', /*  Белый цвет фона */
          color: 'white', /*  Черный цвет текста */
          cursor: 'pointer', /*  Добавляем курсор указателя */
          bottom: '15px',
        }}
      >
        Играть 
      </button>
    
      
  
      {/* Ракета снизу по центру */}
    
  </div>
      <main 
        className="main-element p-4 bg-cover bg-center" 
        style={{ 
          minHeight: '100vh',
          perspective: 1000,
          boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)' 
        }} 
      >
        <div className="fixed top-10 left-1/2 -translate-x-1/2"> {/* Center the userData container */}
        <div className="flex items-center justify-center h-full"> {/* Общий контейнер по центру */}
          {userData && (
            <div className="flex flex-col items-center justify-center"> {/* Center userData content */}
              <img 
                src="/image/else1.png" 
                alt="Profile Picture" 
                className="w-32 h-32 rounded-full mb-4" 
              />
              <h1 className="text-3xl font-bold text-white"> 
                {userData.username}
              </h1>
              {userData.points !== undefined && ( 
                <p className="text-xl text-white mt-2">Очки: {userData.points || 0}</p> 
              )}
            </div>
          )}
        </div>
      
      </div>
      {/* ... остальной код ... */}
    </main>
  </div>
);
}


function getRandomColor() {
  const colors = ['#007bff', '#fff', '#800080']; // Синий, белый, фиолетовый
  return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomSpeed() {
  return Math.random() * 20 + 100; // Случайная скорость от 5 до 10 секунд
}
