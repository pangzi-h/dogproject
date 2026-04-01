import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  MessageSquare,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  PawPrint,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems = [
  { to: '/', label: '仪表盘', icon: LayoutDashboard, exact: true },
  { to: '/booking', label: '预订管理', icon: CalendarCheck },
  { to: '/orders', label: '订单管理', icon: ClipboardList },
  { to: '/feedback', label: '反馈管理', icon: MessageSquare },
  { to: '/shop', label: '商城管理', icon: ShoppingBag },
  { to: '/profile', label: '用户管理', icon: Users },
  { to: '/settings', label: '系统设置', icon: Settings },
]

export default function MainLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col bg-background border-r">
        {/* Logo */}
        <div className="h-14 flex items-center gap-2 px-4 border-b">
          <PawPrint className="h-6 w-6 text-primary" />
          <span className="font-semibold text-sm">边牧寄养 · 管理后台</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map(({ to, label, icon: Icon, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="h-14 shrink-0 flex items-center justify-between px-6 bg-background border-b">
          <span className="text-sm text-muted-foreground">欢迎回来，管理员</span>
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={() => navigate('/login')}>
            <LogOut className="h-4 w-4" />
            退出登录
          </Button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
