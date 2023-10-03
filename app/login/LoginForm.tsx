"use client"

import { useFormik } from 'formik';
import * as Yup from 'yup'
import payload from 'payload'

const validationSchema = Yup.object({
    email: Yup.string().required('Username is required'),
    password: Yup.string()
        .required('Password is required'),
});

export default function LoginForm() {
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema,
        onSubmit: async ({ email, password }) => {
          try {
            const res = await payload.login({
                collection: "users", // required
                data: {
                  email,
                  password
                },
              })
    
            if (res.token) {
                window.location.href = '/dashboard'
            }
          } catch (err) {
            console.log(err)
          }
        },
      });
    return (
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
    )
}