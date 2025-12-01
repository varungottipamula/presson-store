'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const { cartCount } = useCart();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const categories = [
        { name: 'Nails', slug: 'nails' },
        { name: 'Bag', slug: 'bag' },
        { name: 'Watch', slug: 'watch' },
        { name: 'Bracelet', slug: 'bracelet' },
        { name: 'Rings', slug: 'rings' },
        { name: 'Necklace', slug: 'necklace' },
        { name: 'Earrings', slug: 'earrings' },
        { name: 'Glasses', slug: 'glasses' },
        { name: 'Phone Cover', slug: 'phone-cover' },
        { name: 'Hair Rubber', slug: 'hair-rubber' },
        { name: 'Hair Clip', slug: 'hairclip' },
        { name: 'Accessories', slug: 'accessories' },
        { name: 'New Arrivals', slug: 'new-arrivals' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-[#FDFBF7]">
            <div className="container mx-auto px-4 h-24 flex items-center justify-between relative">
                {/* Left Section: Mobile Menu & Desktop Nav */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 hover:bg-black/5 rounded-xl transition-colors" onClick={toggleMenu}>
                        {isMenuOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-800">
                        <Link href="/" className="transition-colors hover:text-pink-600 relative group">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>

                        {/* Shop Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 transition-colors hover:text-pink-600 py-2">
                                Shop <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 border border-gray-100 p-2">
                                <div className="flex flex-col max-h-[400px] overflow-y-auto custom-scrollbar">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            href={`/shop/${cat.slug}`}
                                            className="px-4 py-2.5 hover:bg-pink-50 rounded-xl transition-all text-sm font-medium text-gray-700 hover:text-pink-600"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link href="/book" className="transition-colors hover:text-pink-600 relative group">
                            Book
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </nav>
                </div>

                {/* Center Section: Logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link href="/" className="flex items-center justify-center group">
                        <img
                            src="/logo.png"
                            alt="Jerry Glam Store"
                            className="h-20 w-auto object-contain group-hover:scale-105 transition-transform"
                        />
                    </Link>
                </div>

                {/* Right Section: Cart */}
                <div className="flex items-center gap-4">
                    <Link href="/cart" className="relative p-3 hover:bg-black/5 rounded-full transition-all group">
                        <ShoppingBag className="h-6 w-6 text-gray-900 group-hover:scale-110 transition-transform" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-500 text-[10px] font-bold text-white flex items-center justify-center shadow-md animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-[#FDFBF7] p-6 max-h-[calc(100vh-6rem)] overflow-y-auto absolute w-full left-0 shadow-xl">
                    <nav className="flex flex-col gap-4">
                        <Link href="/" className="text-lg font-bold text-gray-900 hover:text-pink-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>

                        <div>
                            <button
                                onClick={() => setIsShopOpen(!isShopOpen)}
                                className="flex items-center justify-between w-full text-lg font-bold text-gray-900 hover:text-pink-600 transition-colors py-2"
                            >
                                Shop <ChevronDown className={`h-5 w-5 transition-transform ${isShopOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isShopOpen && (
                                <div className="mt-2 pl-4 space-y-2 border-l-2 border-pink-200 ml-2">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            href={`/shop/${cat.slug}`}
                                            className="block text-base font-medium text-gray-600 hover:text-pink-600 transition-colors py-1.5"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href="/book" className="text-lg font-bold text-gray-900 hover:text-pink-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                            Book Appointment
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
