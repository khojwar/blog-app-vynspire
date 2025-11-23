'use client';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import DarkModeToggle from "./DarkModeToggle";
import { useTheme } from '@mui/material/styles';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const theme = useTheme();
  const isDark = theme?.palette?.mode === 'dark';

  const headerClasses = `${isDark ? 'bg-gray-900 text-gray-100 border-b border-gray-700 shadow-md' : 'bg-white text-gray-900 border-b border-gray-200 shadow-sm'}`;
  const titleClasses = `${isDark ? 'text-2xl font-bold text-blue-300' : 'text-2xl font-bold text-blue-600'}`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className={titleClasses}>MyBlog</Link>
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
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}