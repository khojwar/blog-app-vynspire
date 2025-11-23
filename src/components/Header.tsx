'use client';
import Link from 'next/link';
import { Button, Input } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import DarkModeToggle from "./DarkModeToggle";
import { useTheme } from '@mui/material/styles';
import { Menu } from 'lucide-react';
import { Search } from 'lucide-react';
import TextField from '@mui/material/TextField';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const theme = useTheme();
  const isDark = theme?.palette?.mode === 'dark';

  const headerClasses = `${isDark ? 'bg-gray-900 text-gray-100 border-b border-gray-700 shadow-md' : 'bg-white text-gray-900 border-b border-gray-200 shadow-sm'}`;
  const titleClasses = `${isDark ? 'text-2xl font-bold text-blue-300' : 'text-2xl font-bold text-blue-600'}`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className='flex gap-2 justify-center items-center'>
            <div className='md:hidden'><Menu /></div>
            <Link href="/" className={titleClasses}>MyBlog</Link>
        </div>
        <div> 
          <span className='md:hidden'><Search /></span> 
          <span className='hidden md:block'> 
            <TextField
              id="standard-search"
              label="Search"
              type="search"
              variant="standard"
              className='md:w-56 lg:w-md'
            />
          </span> 
        </div>
        <nav className="hidden md:flex md:gap-4 md:items-center"> 
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
        <div className='md:hidden'><DarkModeToggle /></div>
      </div>
    </header>
  );
}