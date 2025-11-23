'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/usePosts';
import DarkModeToggle from "./DarkModeToggle";
import { useTheme } from '@mui/material/styles';
import { Menu, Search } from 'lucide-react';
import TextField from '@mui/material/TextField';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { setSearchQuery } = usePosts();
  const theme = useTheme();
  const isDark = theme?.palette?.mode === 'dark';

  // Show/hide the mobile search input
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const headerClasses = `${isDark ? 'bg-gray-900 text-gray-100 border-b border-gray-700 shadow-md' : 'bg-white text-gray-900 border-b border-gray-200 shadow-sm'}`;
  const titleClasses = `${isDark ? 'text-2xl font-bold text-blue-300' : 'text-2xl font-bold text-blue-600'}`;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value || '';
    setSearchQuery(value);
  };

  const handleSearchIcon = () => {
    setMobileSearchVisible((prev) => {
      const next = !prev;
      // focus the input when opening
      if (next) setTimeout(() => searchRef.current?.focus(), 0);
      return next;
    });
  };


  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className={mobileSearchVisible ? 'hidden md:flex gap-2 justify-center items-center' : 'flex gap-2 justify-center items-center'}>
            <div className='md:hidden'><Menu /></div>
            <Link href="/" className={titleClasses}>MyBlog</Link>
        </div>
        <div className="flex-1 md:flex-none flex justify-center items-center">
          {/* mobile: show icon that toggles the search; desktop: search is always visible */}
          <span className='md:hidden' onClick={handleSearchIcon} ><Search id='search-icon' /></span>

          <div className={`${mobileSearchVisible ? 'block w-full px-2' : 'hidden md:block'}`}>
            <TextField
              id="standard-search"
              inputRef={searchRef}
              label="Search"
              type="search"
              variant="standard"
              className={`md:w-56 lg:w-md ${mobileSearchVisible ? 'w-full' : ''}`}
              onChange={(e) => {
                // update global search term exposed by usePosts
                handleSearch(e);
              }}
            />
          </div>
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