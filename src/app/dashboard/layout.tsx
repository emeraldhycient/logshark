// app/layout.tsx
import Sidebar from '@/components/common/dashboard/sidebar'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
