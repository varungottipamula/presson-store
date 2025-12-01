import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t bg-secondary/30">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Jerry Glam Store</h3>
                        <p className="text-sm text-muted-foreground">
                            Premium press-on nails and accessories for the modern glam look.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/shop/nails" className="hover:text-primary">Nails</Link></li>
                            <li><Link href="/shop/accessories" className="hover:text-primary">Accessories</Link></li>
                            <li><Link href="/shop/new-arrivals" className="hover:text-primary">New Arrivals</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="hover:text-primary">Returns & Exchanges</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <Link href="https://www.instagram.com/jerrysnailstudio2025?igsh=dXV0Ym94czBjejg5" target="_blank" rel="noopener noreferrer" className="hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                            <Link href="mailto:jerrysnailstudio@gmail.com" className="hover:text-primary"><Mail className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Jerry Glam Store. All rights reserved.</p>
                    <p className="mt-2 text-xs opacity-70">Developed by Rapid Base Design</p>
                </div>
            </div>
        </footer>
    );
}
