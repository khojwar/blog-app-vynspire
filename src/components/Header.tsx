'use client';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">MyBlog</Link>
        <nav className="flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <Link href="/posts/new">
                <Button variant="contained">New Post</Button>
              </Link>
              <Button onClick={logout} variant="outlined" color="error">Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login"><Button>Login</Button></Link>
              <Link href="/register"><Button variant="contained">Register</Button></Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}