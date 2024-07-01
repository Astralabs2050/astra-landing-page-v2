'use client'

import React, { useState, ChangeEvent } from 'react'
import Visa from '@/public/svgs/visa.svg'
import Stripe from '@/public/svgs/stripe.svg'
import Master from '@/public/svgs/master.svg'
import Paypal from '@/public/svgs/paypal.svg'
import { IoMdArrowBack } from 'react-icons/io'
import { IoArrowForward } from 'react-icons/io5'
import { Button } from '@/components/ui'
import { useRouter } from 'next-nprogress-bar'

type Props = {
  user: object
}

export function Payment({ user }: Props) {
  const router = useRouter()
  const [expiry, setExpiry] = useState('')

  console.log(user)

  const handleExpiryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const formattedExpiry = value
      .replace(/\D/g, '') // Remove non-numeric characters
      .replace(/(\d{2})(\d{1,2})/, '$1/$2') // Add "/" after the first two numbers
      .substring(0, 5) // Ensure max length of 5 characters (MM/YY)

    setExpiry(formattedExpiry)
  }

  return (
    <div className="mx-auto max-w-[673px] rounded-lg border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-[13.95px]">Billing Address</h2>

      <div className="mb-6 w-[527px] rounded-md border bg-[#F2F2F2] p-3">
        <div className="flex justify-between">
          <div className=" flex items-center gap-[10px] text-[10.9px]">
            <input
              type="checkbox"
              className="size-[10.9px] rounded-full  bg-black checked:bg-black"
            />
            Pay With Credit Card
          </div>
          <div className="flex gap-[8px]">
            <Visa className="h-[24.9px] w-[35.8px]" />
            <Stripe className="h-[24.9px] w-[35.8px]" />
            <Master className="h-[24.9px] w-[35.8px]" />
          </div>
        </div>
        <div className="mt-[20px] flex justify-between gap-[12px] ">
          <div className="">
            <label className="text-[10.9px]">Name on card</label>
            <br />
            <input
              type="text"
              className="h-[34.56px] w-[402.49px] rounded-[6.23px] border bg-white pl-[10px] outline-none"
            />
          </div>
          <div className="">
            <label htmlFor="expiry" className="text-[10.9px]">
              Expiry
            </label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              value={expiry}
              onChange={handleExpiryChange}
              maxLength={5} // Maximum length of "MM/YY"
              placeholder="MM/YY"
              className="h-[34.56px] w-[87.16px] rounded-[6.23px] border bg-white pl-[10px] outline-none"
            />
          </div>
        </div>
        {/* second */}

        <div className="mt-[20px] flex justify-between">
          <div className="">
            <p className="text-[10.9px]">Card number</p>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="h-[34.56px] w-[402.49px] rounded-[6.23px] border bg-white pl-[10px] outline-none"
            />
          </div>
          <div className="">
            <p className="text-[10.9px]">CVV</p>
            <input
              type="password"
              className="h-[34.56px] w-[87.16px] rounded-[6.23px] border bg-white pl-[10px] outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex h-[56.9px] items-center gap-4 rounded-md border p-4">
          <input
            type="radio"
            name="paymentMethod"
            id="stripe"
            className="cursor-pointer"
          />
          <label
            htmlFor="stripe"
            className="flex w-full cursor-pointer justify-between">
            <div className="text-[10.9px]">
              <p className="font-medium">Stripe</p>
              <p className="text-gray-500">
                You will be redirected to the Stripe website after submitting
                your order.
              </p>
            </div>
            <div>
              <Stripe className="h-[24.9px] w-[35.8px]" />
            </div>
          </label>
        </div>

        <div className="flex h-[56.9px] items-center gap-4 rounded-md border p-4">
          <input
            type="radio"
            name="paymentMethod"
            id="paypal"
            className="cursor-pointer"
          />
          <label
            htmlFor="paypal"
            className="flex w-full cursor-pointer justify-between">
            <div className="text-[10.9px]">
              <p className="font-medium">PayPal</p>
              <p className=" text-gray-500">
                You will be redirected to the PayPal website after submitting
                your order.
              </p>
            </div>
            <div>
              <Paypal />
            </div>
          </label>
        </div>
      </div>

      {/* Additional payment methods can be added here */}

      <div className="mt-6 flex justify-end gap-[25px]">
        <Button
          onClick={() => router.back()}
          className="flex h-[37.6px] w-[160.31px] items-center justify-center gap-[7px] rounded-[6.2px] border bg-white text-black  shadow-md hover:bg-[#e9e6e6]">
          <IoMdArrowBack />
          Back
        </Button>

        <button className="flex h-[37.6px] w-[160.31px] items-center justify-center gap-[7px] rounded-[6.2px] border bg-black text-white">
          Next
          <IoArrowForward />
        </button>
      </div>
    </div>
  )
}
