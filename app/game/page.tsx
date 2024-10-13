'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState, useRef } from 'react'

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
  points?: number; // Добавляем поле для количества очков
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
      background: `linear-gradient(to top, #d7effc, #1fb0ca, #143276, #0f1120, #000000, #000000, #000000, #000000, #000000, #000000, #06012a, #361936)`, // Ваш текущий градиент
      // Добавлено свойство для глянца
      filter: 'brightness(120%) saturate(120%)', //  Глянц 
      pointerEvents: 'none',
      touchAction: 'none' /* Prevent scaling with touch events */
    }} 
    onTouchMove={preventScroll} // Добавляем обработчик для предотвращения прокрутки
  >
 

  <div className="stars">
    {/* Создаем 30 звезд */}
    {Array.from({ length: 50 }).map((_, index) => (
      <div key={index} className="star" style={{
        width: Math.random() * 2 + 2, // Случайный размер от 2 до 7 пикселей
        height: Math.random() * 5 + 2,
        left: Math.random() * 100 + '%', // Случайная позиция слева
        top: Math.random() * 100 + '%', // Случайная позиция сверху (теперь внутри экрана)
        borderRadius: '50%', // Делаем звезду круглой
        animation: `falling-star ${getRandomSpeed()}s linear infinite, blink 1s linear infinite`, // Одинаковая анимация, но с разной скоростью
        opacity: Math.random() * 0.5 + 0.2, // Случайная прозрачность
        backgroundColor: getRandomColor(), // Случайный цвет
      }}></div>
    ))}
  </div>

  {/* Планета слева сверху */}
  

  {/* Ракета снизу по центру */}
  <img
    src="./image/rocketlvl1.png" // Замените на путь к вашему изображению ракеты
    alt="Ракета"
    className="rocket"
    style={{
      position: 'absolute',
      bottom: 141,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '25%', // Размер ракеты
      height: 'auto',
    }}
  />

<main 
  className="main-element p-4 bg-cover bg-center" 
  style={{ 
    minHeight: '100vh',
    perspective: 1000,
    boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)' 
  }} 
>
  <div className="fixed top-10 left-40"> 
    
    <div className="flex items-center justify-center"> {/* Center the userData container */}
      {/*  Отображаем изображение по умолчанию */}
      <div className="flex flex-col items-center justify-center h-full"> {/* Общий контейнер по центру */}
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
              <p className="text-xl text-white mt-2">Очки: {userData.points}</p>
            )}
          </div>
        )}
      </div>
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
