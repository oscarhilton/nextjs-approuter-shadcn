"use client"

import Image from 'next/image'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required'),
});

export default function Home() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      try {
        const req = await fetch('/api/users/login', {
          method: "POST", 
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
        const data = await req.json()

        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
  });

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
      </div>
    </main>
  )
}
