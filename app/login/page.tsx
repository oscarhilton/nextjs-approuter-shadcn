"use client"

import Image from 'next/image'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookie from 'js-cookie'

const validationSchema = Yup.object({
  email: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required'),
});

export default function Home() {
    const authed = Cookie.get('payload-token')
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
        const res = await req.json()
        if (res.token) {
            window.location.href = '/dashboard'
        }
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
      <div className="p-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
      </div>
    </main>
  )
}
