import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'

const TopBar = () => {
  return (
    <div className="bg-gray-900 text-gray-300 text-sm py-2 hidden md:block">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-blue-500" />
            <span>Call Us: (+084) 859-481-3614</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-blue-500" />
            <span>Email: mekog@support.com</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select className="bg-transparent text-gray-300 text-sm border-none focus:outline-none cursor-pointer">
            <option>USD</option>
            <option>EUR</option>
          </select>
          <select className="bg-transparent text-gray-300 text-sm border-none focus:outline-none cursor-pointer">
            <option>English</option>
            <option>French</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default TopBar