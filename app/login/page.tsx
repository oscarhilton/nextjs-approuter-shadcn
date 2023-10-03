import Image from 'next/image'
import React from 'react';
import LoginForm from './LoginForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <div className='block m-auto max-w-lg'>
      <div className='flex' style={{ width: "240px", margin: 'auto' }}>
        <Image className="mx-auto px-5" alt="Object" src="/object.svg" height={150} width={118} />
        <Image className="mx-auto px-5" alt="Object" src="/object.svg" height={150} width={118} />
      </div>
      <div className='font-mono text-center'>
        <p className='mt-10 block'>objobj.xyz</p>
      </div>
      <div className="p-4">
        <LoginForm />
    </div>
      </div>
    </main>
  )
}
