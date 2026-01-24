'use client'

import type * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { cn } from '../../lib/utils'
import { buttonVariants } from './button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/**
 * Composant de calendrier interactif basé sur react-day-picker v9.
 * Conçu pour s'intégrer harmonieusement avec le DSFR et les DatePickers complexes.
 */
function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('relative p-3 w-fit', className)}
      classNames={{
        root: '',
        months: 'flex flex-col sm:flex-row space-y-2 sm:space-y-0',
        month: 'space-y-2',
        month_caption: 'flex justify-center items-center h-8 mb-2',
        caption_label:
          'flex items-center gap-1 text-sm font-bold text-foreground-title rdp-caption_label',
        nav: 'flex items-center justify-between absolute inset-x-0 top-3 z-10 h-8 px-1',
        button_previous: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center'
        ),
        button_next: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center'
        ),
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday: 'text-foreground-muted w-9 font-normal text-[0.8rem] text-center',
        week: 'flex w-full mt-1',
        day: cn(
          'h-9 w-9 p-0 text-center text-sm relative group',
          'focus-within:relative focus-within:z-20'
        ),
        day_button: cn(
          'inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-background-contrast disabled:opacity-50',
          'bg-transparent hover:bg-background-open-blue-france active:bg-background-open-blue-france/80',
          'h-9 w-9 p-0 font-normal rounded-md',
          'aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:hover:bg-primary-hover aria-selected:active:bg-primary-active aria-selected:font-bold'
        ),
        selected: 'bg-background-contrast font-bold text-primary',
        today: 'bg-background-contrast font-bold text-primary',
        outside:
          'text-foreground-muted opacity-50 aria-selected:bg-background-open-blue-france/50 aria-selected:text-foreground-muted aria-selected:opacity-30',
        disabled: 'text-foreground-muted opacity-50',
        hidden: 'invisible',
        range_middle:
          '!bg-background-open-blue-france !text-primary rounded-none hover:!bg-background-open-blue-france/80 aria-selected:!bg-background-open-blue-france aria-selected:!text-primary',
        range_end: 'rounded-r-md rounded-l-none',
        range_start: 'rounded-l-md rounded-r-none',
        dropdowns: 'flex items-center justify-center gap-2 rdp-dropdowns z-20',
        dropdown_root:
          'relative inline-flex items-center gap-1 font-bold text-sm text-foreground-title hover:text-primary [&_select]:absolute [&_select]:inset-0 [&_select]:w-full [&_select]:h-full [&_select]:opacity-0 [&_select]:cursor-pointer [&_select]:z-10',
        dropdown: 'flex items-center',
        months_dropdown: '',
        years_dropdown: '',
        dropdown_icon: 'h-4 w-4 opacity-50 shrink-0',
        ...classNames,
      }}
      components={{
        Chevron: (chevronProps) => {
          if (chevronProps.orientation === 'left') {
            return (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            )
          }
          if (chevronProps.orientation === 'down') {
            return (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            )
          }
          if (chevronProps.orientation === 'up') {
            return (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            )
          }
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          )
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }

/**
 * @example
 * ```tsx
 * <Calendar mode="single" selected={date} onSelect={setDate} />
 * ```
 */
