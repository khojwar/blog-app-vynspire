// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TextField, Button, Alert } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

// Validation Schema
const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

// TypeScript form type
type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  // Submit handler
  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      setError('');

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
    //   console.log(json);
      
      if (!res.ok) throw new Error(json.error || 'Login failed');

      // Call useAuth() → store token + user in Redux
      login(json.user, json.token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow md:w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Login</h1>

        {error && (
            toast.error(error)
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex flex-col gap-4">
            <TextField
            label="Email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            />

            <TextField
            label="Password"
            type="password"
            fullWidth
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            />

            <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            >
            {loading ? 'Logging in…' : 'Login'}
            </Button>
        </form>
        </div>
    </div>
  );
}
