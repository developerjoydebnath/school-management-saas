import { AppSidebar } from '@/shared/components/custom/app-sidebar'
import Header from '@/shared/components/layout/Header'
import { SidebarProvider } from '@/shared/components/ui/sidebar'
import React from 'react'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='flex flex-1 flex-col overflow-hidden'>
        <Header />
        <main className='flex-1 overflow-y-auto bg-accent relative sm:p-6 p-4'>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
