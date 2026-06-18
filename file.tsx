import { useState } from 'react'

const BottomNav = () => {
  const [active, setActive] = useState('Home')

  const navItems = ['Home', 'Stock Hub', 'Portfolio', 'Watchlist', 'Profile']

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`flex flex-col items-center py-1 px-2 ${
              active === item ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <div className="w-5 h-5 bg-gray-200 rounded mb-1"></div>
            <span className="text-xs">{item}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default BottomNav