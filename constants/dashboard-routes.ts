import { RoleId } from '@prisma/client'

import PC from '@/public/svgs/pc.svg'
import LightBulb from '@/public/svgs/light-bulb.svg'
import Shirt from '@/public/svgs/shirt.svg'
import Hut from '@/public/svgs/hut.svg'
import Analytics from '@/public/svgs/analytics.svg'
import Messages from '@/public/svgs/messages.svg'
import Gear from '@/public/svgs/gear.svg'

const brandRoutes = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    Icon: PC,
  },
  {
    title: 'My Creative Space',
    path: '/dashboard/space',
    Icon: LightBulb,
  },
  {
    title: 'My Designs',
    path: '/dashboard/designs',
    Icon: Shirt,
  },
  {
    title: 'My Virtual Store',
    path: '/dashboard/store',
    Icon: Hut,
  },
  {
    title: 'Brand Analytics',
    path: '/dashboard/analytics',
    Icon: Analytics,
  },
  {
    title: 'Messages',
    path: '/dashboard/messages',
    Icon: Messages,
  },
  {
    title: 'Account Settings',
    path: '/dashboard/account',
    Icon: Gear,
  },
]

const creatorRoutes = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    Icon: PC,
  },
  {
    title: 'Messages',
    path: '/dashboard/messages',
    Icon: Messages,
  },
  {
    title: 'Account Settings',
    path: '/dashboard/account',
    Icon: Gear,
  },
]

export const routes = {
  [RoleId.BRAND]: brandRoutes,
  [RoleId.DESIGNER]: creatorRoutes,
  [RoleId.MANUFACTURER]: creatorRoutes,
}
