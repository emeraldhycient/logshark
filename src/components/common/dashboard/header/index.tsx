import { Search, Bell, User } from 'lucide-react'
import React from 'react'
import { Input } from '@/components/ui/input'

function Header({title}:{title:string}) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 rounded-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <Bell className="h-6 w-6 text-gray-400" />
            <User className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
