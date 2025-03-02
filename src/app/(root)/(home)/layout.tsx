import { Metadata } from 'next';
import { ReactNode } from 'react';

import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';

export const metadata: Metadata = {
  title: 'Book Me',
  description: 'A workspace for your team',
};

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />
        
        <section className="flex h-[calc(100svh-72px)] flex-1 flex-col px-6 pb-6 max-md:pb-14 sm:px-14 bg-[#3d3d3d]">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;