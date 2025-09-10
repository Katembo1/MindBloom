'use client';

import {
  Bot,
  Book,
  HeartPulse,
  LayoutDashboard,
  Library,
  Shield,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/meditations', label: 'Meditations', icon: HeartPulse },
  { href: '/journal', label: 'Journal', icon: Book },
  { href: '/coping-tools', label: 'Coping Tools', icon: Shield },
  { href: '/chatbot', label: 'AI Chatbot', icon: Bot },
  { href: '/resources', label: 'Resources', icon: Library },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary size-8" />
          <h1 className="text-xl font-headline font-semibold">MindBloom</h1>
        </div>
      </SidebarHeader>
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                as="a"
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        <Button variant="outline">
            Get Premium
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
