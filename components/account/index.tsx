import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { GoShieldLock } from 'react-icons/go'
import { VscBell } from 'react-icons/vsc'

export default function Settings() {
  const AccountData = [
    {
      id: '1',
      icon: <CgProfile />,
      Name: 'Brand Profile Settings',
      Title: 'Your name, contact details and other personal information.',
    },
    {
      id: '2',
      icon: <GoShieldLock />,
      Name: 'Password & Security',
      Title: 'Change your password and other account security preferences.',
    },
    {
      id: '3',
      icon: <VscBell />,
      Name: 'Notifications',
      Title: 'Notification and alert preferences.',
    },
  ]

  return (
    <div className="mt-[70px] flex justify-center gap-[30px]">
      {AccountData.map(setting => (
        <div
          key={setting.id}
          className="h-[241px] w-[300px] border p-[40px] hover:bg-gray-100">
          <p className="mb-[30px] text-[50px] font-semibold">{setting.icon}</p>
          <p className="mb-[5px] text-[18px] font-semibold">{setting.Name}</p>
          <p className="text-[15px]">{setting.Title}</p>
        </div>
      ))}
    </div>
  )
}
