import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface SubNavItemProps {
  item: NavItem;
}

export function SubNavItem({ item }: SubNavItemProps) {
  const page = usePage();
  const isActive = page.url.startsWith(item.href);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={{ children: item.title }}
        className="pl-8" // indentasi submenu
      >
        <Link href={item.href} prefetch aria-current={isActive ? 'page' : undefined} className="flex items-center">
          {item.icon && <item.icon className="mr-2 h-4 w-4" />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
