import { cn } from '@dsfrkit/react'
import type * as React from 'react'

export interface DSFRKitLogoProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean
}

export function DSFRKitLogo({ iconOnly = true, className, ...props }: DSFRKitLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={iconOnly ? '0 0 200 200' : '0 0 800 200'}
      fill="none"
      aria-hidden="true"
      className={cn('h-auto', className)}
      {...props}
    >
      <rect
        x="10"
        y="10"
        width="180"
        height="180"
        rx="48"
        className="fill-blue-600/5 dark:fill-white/10"
      />
      <mask id="dsfrkit-d-mask">
        <rect width="200" height="200" fill="white" />
        <circle cx="60" cy="100" r="12" fill="black" />
        <path d="M60 75H95C115 75 115 125 95 125H60Z" fill="black" />
      </mask>
      <path
        d="M60 45V155C60 155 120 155 140 120C155 90 140 45 60 45Z"
        className="fill-blue-600 dark:fill-blue-400"
        mask="url(#dsfrkit-d-mask)"
      />
      <path
        d="M95 100L145 45M95 100L145 155"
        className="stroke-foreground dark:stroke-white"
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="145" cy="100" r="16" className="fill-red-500 dark:fill-red-400" />

      {!iconOnly && (
        <text
          x="220"
          y="145"
          className="fill-foreground dark:fill-white font-extrabold text-[110px]"
          style={{
            fontFamily: "'Marianne', system-ui, -apple-system, sans-serif",
            letterSpacing: '-2px',
          }}
        >
          DSFR
          <tspan className="fill-blue-600 dark:fill-blue-400">Kit</tspan>
        </text>
      )}
    </svg>
  )
}
