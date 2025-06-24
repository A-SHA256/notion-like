'use client';

import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { FormData } from '@/types';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser, signUpUser } from '@/slices/authSlice';
import { useRouter } from 'next/navigation';
import  GitHubAuth from './GitHubAuth'

export default function AuthForm() {
  const {loading, error} = useAppSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async ({ email, password }: FormData) => {
    console.log('Form submitted:', { email, password})
    try {
      let userCred;
      if (pathname === '/auth/sign-up') {
        userCred = await dispatch(signUpUser({ email, password }));
        console.log('User created:', userCred.payload);
      } else {
        userCred = await dispatch(loginUser({ email, password }));
        console.log('User logged in:', userCred.payload);
      }
      if (userCred.meta.requestStatus === 'fulfilled') {
        console.log('Operation successful:', userCred.payload);
        router.push('/notes')
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`w-full py-2 rounded transition ${loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-800 text-white hover:bg-green-900'
            }`}
        >
          {loading ? 'Loading...' : pathname === '/auth/sign-in' ? 'Sign In' : 'Sign Up'}
        </button>
        <GitHubAuth />
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
