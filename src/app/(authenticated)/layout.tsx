import Link from 'next/link'

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/quests', label: 'Quests', icon: '🎯' },
  { href: '/marketplace', label: 'Marketplace', icon: '🏪' },
  { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { href: '/profile', label: 'Profile', icon: '👤' },
];

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen pt-20">
      {/* Sidebar Navigation */}
      <aside className="w-64 fixed left-0 top-20 bottom-0 bg-white border-r-4 border-black">
        <nav className="p-6 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-3 font-bold hover:bg-primary/10 rounded-xl transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
} 