'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { ModeToggle } from '@/components/layout/mode-toggle';
import { Github, Settings, Search } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input on load and when pressing Cmd/Ctrl+K
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    // Focus on load
    searchInputRef.current?.focus();

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    console.log('Search query:', query);
    // TODO: Implement search functionality
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/60 via-background to-amber-100/40 dark:from-gray-800/40 dark:via-background dark:to-gray-700/30 text-foreground relative flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Logo/Title */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-light tracking-tight mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Prism
            </span>
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI-powered search playground
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <form onSubmit={handleSearch} className="relative">
            <div className="relative group">
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search anything... (⌘K to focus)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-6 pr-12 py-6 text-lg rounded-full border-2 focus-visible:border-primary transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm bg-background/80"
                autoComplete="off"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
            </div>
          </form>
        </motion.div>

      </div>

      {/* Bottom Left Controls */}
      <motion.div 
        className="fixed bottom-6 left-6 flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <ModeToggle />

        <a
          href="https://github.com/your-username/prism-search"
          target="_blank"
          rel="noopener noreferrer"
          title="View on GitHub"
          className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Github className="h-[1.2rem] w-[1.2rem]" />
        </a>
      </motion.div>

      {/* Bottom Right Settings FAB */}
      <motion.div 
        className="fixed bottom-6 right-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <Link
          href="/settings"
          title="Open Settings"
          className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Link>
      </motion.div>
    </div>
  );
}