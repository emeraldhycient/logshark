// components/Navbar.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, SearchIcon } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-black to-gray-900 text-white shadow-md z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-2 mb-4">
                    <BarChart className="h-8 w-8 text-blue-400" />
                    <span className="text-2xl font-bold">LogShark</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-8">
                    <a href="#getting-started" className="hover:text-blue-400 transition-colors duration-300">
                        Getting Started
                    </a>
                    <a href="#guides" className="hover:text-blue-400 transition-colors duration-300">
                        Guides
                    </a>
                    <a href="#api" className="hover:text-blue-400 transition-colors duration-300">
                        API Reference
                    </a>
                    <a href="#concepts" className="hover:text-blue-400 transition-colors duration-300">
                        Concepts
                    </a>
                    <a href="#security" className="hover:text-blue-400 transition-colors duration-300">
                        Security
                    </a>
                </div>

                {/* Search and CTA */}
                <div className="hidden md:flex items-center space-x-6">
                    <SearchIcon className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white transition-colors duration-300" />
                    <Link href="/register">
                        <button className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-9 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                Sign Up
                            </span>
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="focus:outline-none text-gray-400 hover:text-white transition-colors"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="md:hidden bg-black bg-opacity-90 shadow-lg overflow-hidden"
                >
                    <div className="flex flex-col space-y-4 px-6 py-6">
                        <a
                            href="#getting-started"
                            className="text-white hover:text-blue-400 transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Getting Started
                        </a>
                        <a
                            href="#guides"
                            className="text-white hover:text-blue-400 transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Guides
                        </a>
                        <a
                            href="#api"
                            className="text-white hover:text-blue-400 transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            API Reference
                        </a>
                        <a
                            href="#concepts"
                            className="text-white hover:text-blue-400 transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Concepts
                        </a>
                        <a
                            href="#security"
                            className="text-white hover:text-blue-400 transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Security
                        </a>
                        <div className="mt-4">
                            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-9 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                    <Link href="/register">
                                        Sign Up
                                    </Link>
                                </span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
