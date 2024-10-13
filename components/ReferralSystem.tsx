import { useState, useEffect } from 'react'
import { initUtils } from '@telegram-apps/sdk'

interface ReferralSystemProps {
  initData: string
  userId: string
  startParam: string
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ initData, userId, startParam }) => {
  const [referrals, setReferrals] = useState<string[]>([])
  const [referrer, setReferrer] = useState<string | null>(null)
  const INVITE_URL = "https://t.me/rockets_playbot/start"

  useEffect(() => {
    const checkReferral = async () => {
      if (startParam && userId) {
        try {
          const response = await fetch('/api/referrals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, referrerId: startParam }),
          });
          if (!response.ok) throw new Error('Failed to save referral');
        } catch (error) {
          console.error('Error saving referral:', error);
        }
      }
    }

    const fetchReferrals = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/referrals?userId=${userId}`);
          if (!response.ok) throw new Error('Failed to fetch referrals');
          const data = await response.json();
          setReferrals(data.referrals);
          setReferrer(data.referrer);
        } catch (error) {
          console.error('Error fetching referrals:', error);
        }
      }
    }

    checkReferral();
    fetchReferrals();
  }, [userId, startParam])

  const handleInviteFriend = () => {
    const utils = initUtils()
    const inviteLink = `${INVITE_URL}?startapp=${userId}`
    const shareText = `Join me on this awesome Telegram mini app!`
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`
    utils.openTelegramLink(fullUrl)
  }

  const handleCopyLink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${userId}`
    navigator.clipboard.writeText(inviteLink)
    alert('Good Copy!')
  }
  return (
    <div className="w-full max-w-md">
      {/* Заголовок */}
      
      {referrer && (
        <p className="text-green-500 mb-4">{referrer}</p>
      )}
  
      {/* Panel with Buttons */}
      <div
        className="fixed panel mt-2 w-11/12 mx-auto h-28 px-10"
        style={{
          top: '40%', // Adjusted top position
          transform: 'translateY(-50%)',
          right: '4%',
          borderRadius: '30px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Добавляем тень
        }}
      >
        {/* 'mx-auto' centers the panel horizontally */}
        <div className="flex space-x-3 items-center justify-center">
          <button
          
            onClick={handleInviteFriend}
            className="bg-gradient-to-r from-telegram-blue to-telegram-blue hover:from-telegram-blue hover:to-telegram-blue text-white font-bold py-3 px-20 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-telegram-blue focus-visible:ring-opacity-75"
          >
            Пригласить
          </button>
  
          <button
            onClick={handleCopyLink}
            className="bg-gradient-to-r from-telegram-blue to-telegram-blue hover:from-telegram-blue hover:to-telegram-blue text-white font-bold py-3 px-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
          >
            Copy
          </button>
          </div>
          </div>
     
     
   
      {/* Referral List with Table Styling */}
      {referrals.length > 0 && (
        <div className="fixed panel mt-48 w-11/12 mx-auto h-48 px-10 referral-list rounded-xl overflow-y-auto" // added overflow-y-auto
          style={{
            top: '40%', // Adjusted top position
            transform: 'translateY(-50%)',
            right: '4%',
            borderRadius: '30px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' // Добавляем тень
          }}
        >
          <h2 className="text-1xl  font-bold mb-2">Друзья</h2>
          <table className="w-full border border-gray-300 rounded">
            <thead>
              <tr>
                <th className="p-2 bg-gray-100 border border-gray-300 text-left font-medium">User</th>
              </tr>
            </thead>
            <tbody>
            {referrals.map((referral, index) => (
          <tr key={index} className="hover:bg-gray-100 transition duration-150">
            <td className="p-2 border border-gray-300 flex items-center">
              <span className="mr-2">
                <img src="/image/icon.png" alt="User Icon" className="h-6 w-6 rounded-full" />
              </span>
              <span>User {referral}</span>
            </td>
          </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ReferralSystem;

