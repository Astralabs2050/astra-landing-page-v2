import { Role, RoleId } from '@prisma/client'

export const roles: Omit<Role, 'key'>[] = [
  {
    id: RoleId.BRAND,
    title: 'Brand',
    description: 'Are you a fashion brand looking to bring your ideas to life?',
    icon: 'https://humgswhkgxacucnrzpam.supabase.co/storage/v1/object/public/images/role-1.png',
  },
  {
    id: RoleId.DESIGNER,
    title: 'Digital Fashion Designer',
    description: 'Are you a Clo 3D Artist, Fashion designer, Developer e.t.c.?',
    icon: 'https://humgswhkgxacucnrzpam.supabase.co/storage/v1/object/public/images/role-1.png',
  },
  {
    id: RoleId.MANUFACTURER,
    title: 'Outfit Manufacturer',
    description:
      'Are you a Tailor, Fashion Designer and you can bring digital outfits to reality?',
    icon: 'https://humgswhkgxacucnrzpam.supabase.co/storage/v1/object/public/images/role-1.png',
  },
]
