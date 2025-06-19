
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutGrid, Home, Sparkles, ShoppingCart, Menu } from 'lucide-react';
// UserPlus, LogIn, UserCircle2, LogOutIcon removed
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// Separator and useToast might not be needed if logout toast is removed
// For now, keep useToast if other toasts might be used by header, otherwise it can be removed.
// Since logout is gone, useToast is likely not needed here.

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  // const { toast } = useToast(); // Removed as logout toast is gone
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // isLoggedIn and isLoadingSession states are removed

  // useEffect for session checking is removed

  const handleAiAdvisorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      const section = document.getElementById('ai-decor-advisor');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  // handleLogout function is removed

  const NavLink = ({ href, label, icon: Icon, onClick, ariaLabel }: { href: string; label: string; icon: React.ElementType; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; ariaLabel?: string }) => (
    <Button asChild variant="ghost" className="w-full md:w-auto justify-start md:justify-center text-base md:text-sm py-3 md:py-2 px-2 md:px-3" onClick={() => setIsMobileMenuOpen(false)}>
      <Link href={href} aria-label={ariaLabel || label} onClick={onClick}>
        <Icon className="mr-3 md:mr-2 h-5 md:h-4 w-5 md:w-4 text-primary md:text-current" /> {label}
      </Link>
    </Button>
  );

  return (
    <header className="py-4 px-2 md:px-4 border-b border-border/50 shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center group" aria-label="Aarambh Decor Home" onClick={() => setIsMobileMenuOpen(false)}>
          <Image
            src="https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b"
            alt="Aarambh Decor Logo"
            width={40}
            height={40}
            priority
            className="object-contain rounded-lg transition-opacity group-hover:opacity-80"
            data-ai-hint="logo"
          />
           <span
            className="ml-3 text-xl font-headline text-primary opacity-0 w-0 transform -translate-x-4
                       group-hover:opacity-100 group-hover:w-auto group-hover:translate-x-0
                       transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap"
          >
            Aarambh Decor
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="hidden md:flex items-center gap-0 sm:gap-1">
            <NavLink href="/" label="Home" icon={Home} />
            <NavLink href="/collections" label="Collections" icon={LayoutGrid} />
            <NavLink href="/#ai-decor-advisor" label="AI Advisor" icon={Sparkles} onClick={handleAiAdvisorClick} />
            {/* Auth related links (Profile, Logout, Register, Login) are removed */}
          </nav>

          <Button asChild variant="ghost" className="relative" size="icon">
            <Link href="/cart" aria-label="View Cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[300px] p-4 flex flex-col">
                <SheetHeader className="mb-6 pb-3 border-b border-border">
                  <SheetTitle>
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center group">
                       <Image
                        src="https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b"
                        alt="Aarambh Decor Logo"
                        width={36} height={36} priority className="object-contain rounded-lg" data-ai-hint="logo"
                      />
                      <span className="ml-2 text-lg font-headline text-primary">Aarambh Decor</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-1 flex-grow">
                  <NavLink href="/" label="Home" icon={Home} />
                  <NavLink href="/collections" label="Collections" icon={LayoutGrid} />
                  <NavLink href="/#ai-decor-advisor" label="AI Advisor" icon={Sparkles} onClick={handleAiAdvisorClick} />
                </nav>
                {/* Auth related links (Profile, Logout, Register, Login) are removed from mobile menu footer */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
