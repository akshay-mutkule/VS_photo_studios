import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, User, Menu, X, LogIn, LogOut, LayoutDashboard, Calendar, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const { user, profile, login, logout, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Categories', path: '/#categories' },
    { name: 'Book a Shoot', path: '/booking' },
    { name: 'About', path: '/#about' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-dark py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
        <Link to="/" className="flex flex-col group">
          <span className="text-2xl font-serif tracking-widest uppercase leading-tight text-white">VS</span>
          <span className="text-[10px] tracking-[0.4em] uppercase opacity-60 text-white">Studio & Archive</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-10 text-[11px] uppercase tracking-widest font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-all duration-300 hover:text-primary ${location.pathname === link.path ? 'text-primary border-b border-primary pb-1' : 'text-white/60 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-6 border-l border-white/10 pl-10 ml-4">
            {!user ? (
              <div className="flex items-center gap-4">
                <Button onClick={login} variant="outline" className="px-8 h-12 border-white/20 rounded-full text-[10px] uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all font-bold glass">Client Login</Button>
                <Link to="/booking">
                  <Button className="px-8 h-12 bg-primary text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-[0_0_20px_rgba(212,175,55,0.1)]">Book Session</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="hidden lg:block text-[10px] uppercase tracking-widest text-white/40 font-bold mr-2 italic font-serif ">{profile?.displayName || user.displayName}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" className="relative h-12 w-12 rounded-full border border-white/10 hover:bg-white/5 p-0 overflow-hidden glass group">
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                          <User className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
                        )}
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end" className="w-72 glass-dark border-white/10 text-white p-3 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="px-4 py-6 text-center border-b border-white/5 mb-2">
                       <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-1">Authenticated</p>
                       <p className="text-xl font-serif italic text-white tracking-tight">{profile?.displayName || user.displayName}</p>
                       <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{user.email}</p>
                    </div>
                    <DropdownMenuItem className="focus:bg-white/5 p-4 rounded-2xl cursor-pointer group transition-colors">
                      <Link to="/dashboard" className="w-full flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-primary transition-colors">
                           <LayoutDashboard className="w-4 h-4 text-white group-hover:text-black" />
                        </div>
                        <span className="text-[11px] uppercase tracking-widest font-bold">Client Portal</span>
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem className="focus:bg-white/5 p-4 rounded-2xl cursor-pointer group transition-colors">
                        <Link to="/admin" className="w-full flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-primary transition-colors">
                            <Camera className="w-4 h-4 text-white group-hover:text-black" /> 
                          </div>
                          <span className="text-[11px] uppercase tracking-widest font-bold">Studio Control</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-white/5 my-2" />
                    <DropdownMenuItem onClick={logout} className="focus:bg-red-500/10 p-4 rounded-2xl cursor-pointer group transition-colors text-red-400">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                           <LogOut className="w-4 h-4 text-red-500 group-hover:text-white" /> 
                        </div>
                        <span className="text-[11px] uppercase tracking-widest font-bold">Terminate Session</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full glass-dark border-b border-white/10 overflow-hidden md:hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          >
            <div className="flex flex-col p-10 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl tracking-tighter italic font-serif py-6 text-white hover:text-primary transition-colors border-b border-white/5 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
              {!user ? (
                <div className="pt-10 flex flex-col gap-4">
                   <button onClick={() => { login(); setIsOpen(false); }} className="w-full py-5 border border-white/20 rounded-full text-[10px] uppercase tracking-widest font-bold">Client Login</button>
                   <Link to="/booking" onClick={() => setIsOpen(false)}>
                      <button className="w-full py-5 bg-primary text-black rounded-full text-[10px] font-bold uppercase tracking-widest">Reserve Production</button>
                   </Link>
                </div>
              ) : (
                <div className="pt-10 flex flex-col gap-4">
                  <div className="p-6 glass rounded-3xl text-center">
                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Authenticated</p>
                    <p className="text-xl font-serif italic text-white tracking-tight">{profile?.displayName || user.displayName}</p>
                  </div>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="py-2">
                    <button className="w-full py-5 glass border-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest">Dashboard</button>
                  </Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="w-full py-5 bg-red-500/10 text-red-500 rounded-full text-[10px] uppercase font-bold tracking-widest">Terminate Session</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
