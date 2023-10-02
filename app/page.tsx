import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <div className='block m-auto'>
      <div className='flex'>
        <Image className="mx-5" alt="Object" src="/object.svg" height={150} width={180 -18 - 50} />
        <Image className="mx-5" alt="Object" src="/object.svg" height={150} width={180 - 18 - 50} />
      </div>
      <p className='font-mono text-center mt-10'>objobj.xyz</p>
      </div>
    </main>
  )
}
