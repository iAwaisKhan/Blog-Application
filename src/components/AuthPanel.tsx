import { motion } from "framer-motion";
import { Edit3, LogOut, Activity } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";

interface AuthPanelProps {
  user: any;
  login: () => void;
  logout: () => void;
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (open: boolean) => void;
  isDesktop: boolean;
  setUser: (user: any) => void;
  isNightMode: boolean;
}

const AuthPanel = ({
  user,
  login,
  logout,
  isEditProfileOpen,
  setIsEditProfileOpen,
  isDesktop,
  setUser,
  isNightMode
}: AuthPanelProps) => {
  return (
    <div className={`w-full overflow-hidden ${isNightMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      {user ? (
        <div className="p-6 text-center">
          <Avatar className={`w-20 h-20 mx-auto mb-4 ring-4 shadow-md ${isNightMode ? 'ring-white/5 border-white/10' : 'ring-blue-50 border-white'}`}>
            <AvatarImage src={user.picture} alt={user.name} />
            <AvatarFallback className={`text-2xl font-bold ${isNightMode ? 'bg-white/5 text-white' : 'bg-blue-100 text-blue-600'}`}>
              {user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <h3 className={`text-xl font-bold mb-1 ${isNightMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h3>
          <p className="text-gray-500 text-sm mb-6">{user.email}</p>

          <div className="space-y-3 mb-6">
            <div className={`p-3 rounded-lg text-sm text-left flex items-center justify-between ${isNightMode ? 'bg-white/5 text-gray-300' : 'bg-gray-50 text-gray-500'}`}>
              <span>Google Account</span>
              <span className="text-green-600 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            </div>
            
            <div className={`p-4 border rounded-xl shadow-sm ${isNightMode ? 'bg-black/40 border-white/5' : 'bg-white border-gray-100'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="text-left">
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400 block mb-1">Total Reach</span>
                  <div className={`text-2xl font-serif ${isNightMode ? 'text-white' : 'text-[#1a1a1a]'}`}>12.4k</div>
                </div>
                <Activity className="w-4 h-4 text-blue-500" />
              </div>
              <div className="h-12 w-full">
                <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    d="M0,45 C30,45 40,20 70,35 C100,50 120,40 150,45 C180,50 190,40 200,30"
                    fill="none"
                    stroke={isNightMode ? "#ffffff" : "#3b82f6"}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {isDesktop ? (
              <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className={`w-full py-6 rounded-xl ${isNightMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-200'}`}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className={`sm:max-w-[425px] ${isNightMode ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-white'}`}>
                  <DialogHeader>
                    <DialogTitle className={isNightMode ? 'text-white' : ''}>Edit profile</DialogTitle>
                    <DialogDescription className={isNightMode ? 'text-gray-400' : ''}>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const newName = formData.get("name") as string;
                      const updatedUser = { ...user, name: newName };
                      setUser(updatedUser);
                      localStorage.setItem("user", JSON.stringify(updatedUser));
                      setIsEditProfileOpen(false);
                    }}
                    className="grid items-start gap-6 mt-4"
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="email" className={`text-left ${isNightMode ? 'text-gray-400' : ''}`}>Email</Label>
                      <Input type="email" id="email" value={user.email} disabled className={isNightMode ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-gray-50'} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name" className={`text-left ${isNightMode ? 'text-gray-400' : ''}`}>Full Name</Label>
                      <Input name="name" id="name" defaultValue={user.name} className={isNightMode ? 'bg-white/5 border-white/10 text-white' : ''} />
                    </div>
                    <Button type="submit" className={`mt-2 py-6 rounded-xl ${isNightMode ? 'bg-white text-black hover:bg-gray-200' : ''}`}>Save changes</Button>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <Drawer open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                <DrawerTrigger asChild>
                  <Button variant="outline" className={`w-full py-6 rounded-xl ${isNightMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-200'}`}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DrawerTrigger>
                <DrawerContent className={isNightMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-white'}>
                  <DrawerHeader className="text-left">
                    <DrawerTitle className={isNightMode ? 'text-white' : ''}>Edit profile</DrawerTitle>
                    <DrawerDescription className={isNightMode ? 'text-gray-400' : ''}>
                      Make changes to your profile here. Click save when you're done.
                    </DrawerDescription>
                  </DrawerHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const newName = formData.get("name") as string;
                      const updatedUser = { ...user, name: newName };
                      setUser(updatedUser);
                      localStorage.setItem("user", JSON.stringify(updatedUser));
                      setIsEditProfileOpen(false);
                    }}
                    className="grid items-start gap-6 px-4 pb-4"
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="email" className={`text-left ${isNightMode ? 'text-gray-400' : ''}`}>Email</Label>
                      <Input type="email" id="email" value={user.email} disabled className={isNightMode ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-gray-50'} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name" className={`text-left ${isNightMode ? 'text-gray-400' : ''}`}>Full Name</Label>
                      <Input name="name" id="name" defaultValue={user.name} className={isNightMode ? 'bg-white/5 border-white/10 text-white' : ''} />
                    </div>
                    <Button type="submit" className={`py-6 rounded-xl ${isNightMode ? 'bg-white text-black hover:bg-gray-200' : ''}`}>Save changes</Button>
                  </form>
                  <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                      <Button variant="outline" className={isNightMode ? 'py-6 rounded-xl text-white border-white/10 hover:bg-white/5' : 'py-6 rounded-xl'}>Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}

            <button
              onClick={logout}
              className={`w-full px-4 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${isNightMode ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={`p-6 border-b ${isNightMode ? 'border-white/5' : 'border-gray-100'}`}>
            <h3 className={`text-xl font-bold leading-none mb-2 ${isNightMode ? 'text-white' : 'text-gray-900'}`}>Login to your account</h3>
            <p className="text-sm text-gray-500">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="p-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <label htmlFor="email" className={`text-sm font-semibold ${isNightMode ? 'text-gray-400' : 'text-gray-700'}`}>Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className={`flex h-10 w-full rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${isNightMode ? 'bg-white/5 border-white/10 text-white' : 'border border-gray-200 bg-white'}`}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="password" className={`text-sm font-semibold ${isNightMode ? 'text-gray-400' : 'text-gray-700'}`}>Password</label>
                    <a
                      href="#"
                      className={`ml-auto inline-block text-sm hover:underline ${isNightMode ? 'text-blue-400' : 'text-blue-600'}`}
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className={`flex h-10 w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${isNightMode ? 'bg-white/5 border-white/10 text-white' : 'border border-gray-200 bg-white'}`}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="p-6 pt-0 flex flex-col gap-3">
            <button type="submit" className="w-full h-10 px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition shadow-sm">
              Login
            </button>
            <button
              onClick={() => login()}
              className="w-full h-10 px-4 py-2 border border-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Login with Google
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthPanel;
