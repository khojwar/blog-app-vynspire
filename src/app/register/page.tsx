'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Alert } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const schema = yup.object({
  name: yup.string().min(2).required('Name is required'),
  email: yup.string().email().required('Valid email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    try {
        // console.log("data", data);
        
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const json = await res.json();
      console.log("registration response", json);
      
      if (!res.ok) throw new Error(json.error || 'Registration failed');

      setSuccess(true);
      setError('');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg md:w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-black ">Create Account</h1>

        {error && toast.error(error)}
        {success && toast.success('Registration successful! Redirecting to login...')}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex flex-col gap-4">
            <TextField
            label="Full Name"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message as string}
            />
            <TextField
            label="Email"
            type="email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message as string}
            />
            <TextField
            label="Password"
            type="password"
            fullWidth
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message as string}
            />
            <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message as string}
            />

            <Button type="submit" variant="contained" size="large" fullWidth>
            Register
            </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline font-medium">Login here</a>
        </p>
        </div>
    </div>
  );
}