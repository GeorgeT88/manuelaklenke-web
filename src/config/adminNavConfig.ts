interface AdminNavItem {
  navPath: string;
  labelKey: string;
  adminPath: string;
  configKey: string;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    navPath: '/about',
    labelKey: 'nav.updateAbout',
    adminPath: '/admin/about',
    configKey: 'about',
  },
  {
    navPath: '/portfolio',
    labelKey: 'nav.updateBooks',
    adminPath: '/admin/books',
    configKey: 'books',
  },
  {
    navPath: '/events',
    labelKey: 'nav.updateEvents',
    adminPath: '/admin/events',
    configKey: 'events',
  },
];

export function getAdminItemForPath(navPath: string): AdminNavItem | undefined {
  return ADMIN_NAV_ITEMS.find((item) => item.navPath === navPath);
}
