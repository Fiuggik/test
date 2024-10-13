'use client'

import ReferralSystem from '@/components/ReferralSystem'
import { useEffect, useState } from 'react'

export default function Home() {
  const [initData, setInitData] = useState('')
  const [userId, setUserId] = useState('')
  const [startParam, setStartParam] = useState('')

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== 'undefined') {
        const WebApp = (await import('@twa-dev/sdk')).default;
        WebApp.ready();
        setInitData(WebApp.initData);
        setUserId(WebApp.initDataUnsafe.user?.id.toString() || '');
        setStartParam(WebApp.initDataUnsafe.start_param || '');
      }
    };

    initWebApp();
  }, [])

  return (
    
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-y-auto" 
    
    style={{
      
      backgroundImage: 'linear-gradient(to bottom, #222222, #111111, #222222), linear-gradient(to right, #222222, #555555, #222222), linear-gradient(to bottom, transparent, #FF0000, transparent)', // Red accent at bottom
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
    }}> 
    <h2 className="fixed text-center top-12 left-1/2 transform -translate-x-1/2 mb-4 font-extrabold text-2xl text-white" style={{ whiteSpace: 'nowrap' }}>
  Пригласите друзей
</h2>
      <h1 className="text-4xl font-bold mb-30 text-white text-center"></h1>  {/* Изменен размер текста и добавлено центрирование */}
      <ReferralSystem initData={initData} userId={userId} startParam={startParam} /> 
    </main>
  )
  
}
