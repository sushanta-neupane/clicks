"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Graphic from './graphic';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Mansory Grid", href: "/view/mansory" },

];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: Props) {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden bg-background p-3"
        >
          <div className="bg-muted h-full flex flex-col justify-between rounded-[18px]">
            {/* Header */}
            <div className="relative p-6">
              {/* CLOSE BUTTON  */}
              <button
                onClick={onClose}
                className="fixed top-3 right-3 z-50 bg-background rounded-bl-[18px] cursor-pointer select-none"
              >
                <div className="relative pb-3 px-4">
                  <h1 className="text-sm font-light">Close</h1>
                  <Graphic className="absolute -bottom-4 right-0 rotate-90" />
                  <Graphic className="absolute -left-4 top-0 rotate-90" />
                </div>
              </button>

              <div className="flex gap-4 items-center">
                {/* AVATAR  */}
                <Avatar className="size-[60px]">
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/66668423?v=4&size=228"
                    alt="Avatar"
                  />
                  <AvatarFallback>SN</AvatarFallback>
                </Avatar>

                {/* NAME  */}
                <div className="flex flex-col gap-[2px]">
                  <h1 className="text-lg">Sushanta</h1>
                  <p className="text-sm text-text-muted">Web Developer</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="overflow-y-auto px-4 py-2 scrollbar-none">
              {menuItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavigation(item.href)}
                  className="w-full text-left p-4 rounded-xl mb-3 flex items-center justify-between bg-muted-hover text-text-muted text-sm"
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                  <ArrowRight size={18} />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
