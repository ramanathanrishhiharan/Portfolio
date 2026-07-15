'use client'
import React from 'react'
import { motion } from 'framer-motion'
export type CalendarDemoStep = 0 | 1 | 2
type CalendarDemoStepsProps = {
  step: CalendarDemoStep
  reduceMotion: boolean | null
}
const days = [
  {
    label: 'MON',
    date: '14',
  },
  {
    label: 'TUE',
    date: '15',
  },
  {
    label: 'WED',
    date: '16',
  },
  {
    label: 'THU',
    date: '17',
  },
  {
    label: 'FRI',
    date: '18',
  },
]
const times = ['10:30', '11:45', '2:00', '3:30']
const enterEase = [0.22, 1, 0.36, 1] as const
const raisedTile =
  'border border-white/85 bg-[#EDF0F7] shadow-[-6px_-6px_12px_rgba(255,255,255,0.88),6px_7px_13px_rgba(122,135,159,0.34),inset_1px_1px_1px_rgba(255,255,255,0.9)]'
export function CalendarDemoSteps({
  step,
  reduceMotion,
}: CalendarDemoStepsProps) {
  if (step === 0) return <ChooseDay reduceMotion={reduceMotion} />
  if (step === 1) return <ChooseTime reduceMotion={reduceMotion} />
  return <BookingConfirmed reduceMotion={reduceMotion} />
}
function ChooseDay({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: -16,
              rotateZ: -1,
            }
      }
      animate={{
        opacity: 1,
        x: 0,
        rotateZ: 0,
      }}
      exit={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              x: -14,
            }
      }
      transition={{
        duration: 0.3,
        ease: enterEase,
      }}
    >
      <p className="text-[9px] font-bold tracking-[0.14em] text-[#6E7789] sm:text-[10px] sm:tracking-[0.16em]">
        01 / CHOOSE A DAY
      </p>
      <h2 className="mt-1.5 text-[23px] font-semibold tracking-[-0.045em] text-[#202633] sm:mt-2 sm:text-[28px]">
        What works for you?
      </h2>
      <div className="mt-3.5 grid grid-cols-5 gap-1.5 sm:mt-5 sm:gap-2">
        {days.map((day, index) => {
          const selected = index === 3
          return (
            <motion.div
              key={day.label}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 10,
                      scale: 0.9,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay: index * 0.045,
                type: 'spring',
                stiffness: 300,
                damping: 23,
              }}
              className={`relative min-h-[58px] rounded-xl px-1 py-2 text-center sm:min-h-[72px] sm:rounded-2xl sm:py-3 ${selected ? 'border border-[#D4EC8D] bg-[#B5E64D] text-[#1D270D] shadow-[-6px_-6px_12px_rgba(238,255,197,0.75),6px_7px_13px_rgba(76,104,20,0.35),inset_1px_1px_2px_rgba(255,255,255,0.72)' : `${raisedTile} text-[#3A4352]`}`}
            >
              <span className="block text-[8px] font-bold tracking-wide opacity-60 sm:text-[9px]">
                {day.label}
              </span>
              <span className="mt-0.5 block text-[17px] font-bold tracking-[-0.04em] sm:mt-1 sm:text-xl">
                {day.date}
              </span>
              {selected && (
                <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#33480D] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.35),0_2px_4px_rgba(255,255,255,0.65)] sm:h-2.5 sm:w-2.5" />
              )}
            </motion.div>
          )
        })}
      </div>
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 7,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.32,
          duration: 0.25,
        }}
        className="mt-4 flex items-center justify-between rounded-xl border border-[#D7DCE7] bg-[#E9ECF3] px-3 py-2.5 text-[#303846] shadow-[inset_3px_3px_6px_rgba(142,154,178,0.24),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] sm:mt-5 sm:rounded-2xl sm:px-4 sm:py-3"
      >
        <span className="text-[13px] font-bold sm:text-sm">Thu, 17 July</span>
        <span className="rounded-lg bg-[#DDE3EC] px-2 py-1 text-[9px] font-bold tracking-[0.13em] text-[#526073] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9),2px_2px_4px_rgba(126,140,166,0.2)] sm:rounded-xl sm:px-2.5 sm:text-[10px]">
          NEXT
        </span>
      </motion.div>
    </motion.div>
  )
}
function ChooseTime({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: 16,
              rotateZ: 1,
            }
      }
      animate={{
        opacity: 1,
        x: 0,
        rotateZ: 0,
      }}
      exit={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              x: -14,
            }
      }
      transition={{
        duration: 0.3,
        ease: enterEase,
      }}
    >
      <p className="text-[9px] font-bold tracking-[0.14em] text-[#6E7789] sm:text-[10px] sm:tracking-[0.16em]">
        02 / CHOOSE A TIME
      </p>
      <div className="mt-1.5 flex items-end justify-between">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em] text-[#202633] sm:text-[28px]">
          Thursday, 17th
        </h2>
        <span className="rounded-lg border border-white bg-[#EDF0F7] px-2 py-1 text-[9px] font-bold tracking-[0.12em] text-[#687488] shadow-[-3px_-3px_6px_rgba(255,255,255,0.9),3px_3px_6px_rgba(122,135,159,0.3)] sm:rounded-xl sm:text-[10px]">
          GMT+1
        </span>
      </div>
      <div className="mt-3.5 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
        {times.map((time, index) => {
          const selected = time === '2:00'
          return (
            <motion.div
              key={time}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.84,
                      y: 8,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.055,
                type: 'spring',
                stiffness: 320,
                damping: 24,
              }}
              className={`relative flex min-h-[45px] items-center justify-center rounded-xl text-[13px] font-bold sm:min-h-[53px] sm:rounded-2xl sm:text-sm ${selected ? 'border border-[#D4EC8D] bg-[#B5E64D] text-[#1D270D] shadow-[-6px_-6px_12px_rgba(238,255,197,0.78),6px_7px_13px_rgba(76,104,20,0.35),inset_1px_1px_2px_rgba(255,255,255,0.7)' : `${raisedTile} text-[#3A4352]`}`}
            >
              {time} PM
              {selected && (
                <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-[#40580D] shadow-[inset_1px_1px_1px_rgba(0,0,0,0.35)] sm:right-3 sm:top-2.5 sm:h-2 sm:w-2" />
              )}
            </motion.div>
          )
        })}
      </div>
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
              }
        }
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.25,
        }}
        className="mt-4 flex items-center justify-between rounded-xl border border-[#D7DCE7] bg-[#E9ECF3] px-3 py-2.5 text-[12px] shadow-[inset_3px_3px_6px_rgba(142,154,178,0.24),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] sm:mt-5 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
      >
        <span className="font-semibold text-[#657084]">Your selection</span>
        <span className="font-bold text-[#303846]">Thu, 17 · 2:00 PM</span>
      </motion.div>
    </motion.div>
  )
}
function BookingConfirmed({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.9,
              rotateZ: -2,
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
        rotateZ: 0,
      }}
      exit={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              x: -14,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 22,
      }}
      className="flex min-h-[202px] flex-col items-center justify-center text-center sm:min-h-[221px]"
    >
      <motion.span
        initial={
          reduceMotion
            ? false
            : {
                scale: 0.75,
              }
        }
        animate={{
          scale: 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 330,
          damping: 19,
        }}
        className="relative flex h-[62px] w-[62px] items-center justify-center rounded-[20px] border border-[#D4EC8D] bg-[#B5E64D] text-[10px] font-extrabold tracking-[0.12em] text-[#1D270D] shadow-[-7px_-7px_14px_rgba(238,255,197,0.8),7px_8px_15px_rgba(76,104,20,0.38),inset_1px_1px_3px_rgba(255,255,255,0.72)] sm:h-[72px] sm:w-[72px] sm:rounded-[23px] sm:text-[12px]"
      >
        {!reduceMotion && (
          <motion.span
            initial={{
              scale: 0.7,
              opacity: 0.5,
            }}
            animate={{
              scale: 2.1,
              opacity: 0,
            }}
            transition={{
              duration: 0.85,
            }}
            className="absolute inset-0 rounded-[20px] border border-[#B5E64D] sm:rounded-[23px]"
          />
        )}
        BOOKED
      </motion.span>
      <h2 className="mt-3 text-[25px] font-semibold tracking-[-0.045em] text-[#202633] sm:mt-4 sm:text-[29px]">
        You&apos;re booked.
      </h2>
      <p className="mt-1 text-[13px] font-medium text-[#6E7789] sm:text-sm">
        Thu, 17 July · 2:00 PM
      </p>
      <span
        className={`mt-3 rounded-xl px-3 py-2 text-[11px] font-bold text-[#4D586A] sm:mt-4 sm:rounded-2xl sm:px-4 sm:py-2.5 sm:text-xs ${raisedTile}`}
      >
        Invite sent to your inbox
      </span>
    </motion.div>
  )
}
