import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  prepend?: React.ReactNode
  append?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, prepend, append, ...props }, ref) => {
    const input = (
      <input
        id={id}
        type={type}
        className={cn(
          'flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
          {
            'h-full flex-grow rounded-none border-none bg-transparent p-0 focus-visible:ring-0':
              prepend || append,
          },
          prepend || append ? '' : className,
        )}
        ref={ref}
        {...props}
      />
    )

    return (
      <div className="grid gap-2">
        {label && <label htmlFor={id}>{label}</label>}
        {prepend || append ? (
          <React.Fragment>
            <div
              className={cn(
                'flex h-12 w-full items-center gap-2 rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0',
                className,
              )}>
              {prepend} {input} {append}
            </div>
          </React.Fragment>
        ) : (
          input
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
