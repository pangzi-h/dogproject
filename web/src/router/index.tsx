import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'

import LoginPage from '@/pages/login'
import HomePage from '@/pages/home'
import BookingPage from '@/pages/booking'
import BookingConfirmPage from '@/pages/booking/confirm'
import FeedbackDetailPage from '@/pages/feedback/detail'
import OrdersPage from '@/pages/orders'
import OrderDetailPage from '@/pages/orders/detail'
import ShopPage from '@/pages/shop'
import ShopProductPage from '@/pages/shop/product'
import ShopCartPage from '@/pages/shop/cart'
import ShopCheckoutPage from '@/pages/shop/checkout'
import ProfilePage from '@/pages/profile'
import ProfileEditPage from '@/pages/profile/edit'
import PetsPage from '@/pages/profile/pets'
import PetNewPage from '@/pages/profile/pets/new'
import PetEditPage from '@/pages/profile/pets/edit'
import MembershipPage from '@/pages/profile/membership'
import PointsPage from '@/pages/profile/points'
import HelpPage from '@/pages/profile/help'

const router = createBrowserRouter([
  // ── Auth routes（无底部导航）
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
    ],
  },

  // ── Main routes（含底部 TabBar）
  {
    element: <MainLayout />,
    children: [
      // 首页
      { path: '/', element: <HomePage /> },

      // 预订模块 MOD-002
      { path: '/booking', element: <BookingPage /> },
      { path: '/booking/confirm', element: <BookingConfirmPage /> },

      // 每日反馈模块 MOD-003
      { path: '/feedback/:orderId', element: <FeedbackDetailPage /> },

      // 订单模块 MOD-004
      { path: '/orders', element: <OrdersPage /> },
      { path: '/orders/:id', element: <OrderDetailPage /> },

      // 商城模块 MOD-007
      { path: '/shop', element: <ShopPage /> },
      { path: '/shop/product/:id', element: <ShopProductPage /> },
      { path: '/shop/cart', element: <ShopCartPage /> },
      { path: '/shop/checkout', element: <ShopCheckoutPage /> },

      // 个人中心模块 MOD-001 / 005 / 006
      { path: '/profile', element: <ProfilePage /> },
      { path: '/profile/edit', element: <ProfileEditPage /> },
      { path: '/profile/pets', element: <PetsPage /> },
      { path: '/profile/pets/new', element: <PetNewPage /> },
      { path: '/profile/pets/:id/edit', element: <PetEditPage /> },
      { path: '/membership', element: <MembershipPage /> },
      { path: '/points', element: <PointsPage /> },
      { path: '/help', element: <HelpPage /> },
    ],
  },
])

export default router
