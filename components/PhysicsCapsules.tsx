'use client'

import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from 'react'
import Matter from 'matter-js'

type CapsuleColor = 'green' | 'white' | 'blue' | 'orange'

interface CapsuleDef {
  label: string
  color: CapsuleColor
}

const CAPSULES: CapsuleDef[] = [
  { label: 'Business First', color: 'white' },
  { label: 'Ships Fast', color: 'green' },
  { label: 'Clean Code', color: 'orange' },
  { label: 'Startup Minded', color: 'white' },
  { label: 'AI-Ready', color: 'green' },
  { label: 'SEO Aware', color: 'blue' },
  { label: 'Product Thinker', color: 'green' },
  { label: 'No Bloat', color: 'orange' },
  { label: 'On-site & Remote', color: 'blue' },
]

const COLOR_CLASSES: Record<CapsuleColor, string> = {
  green: 'bg-[#B5E64D] text-neutral-900',
  white: 'bg-white text-neutral-900',
  blue: 'bg-[#6C6CF5] text-white',
  orange: 'bg-[#FF4F2B] text-white',
}

const COLOR_SHADOW: Record<CapsuleColor, string> = {
  green: '0 14px 34px -14px rgba(181,230,77,0.65)',
  white: '0 14px 34px -16px rgba(255,255,255,0.45)',
  blue: '0 14px 34px -14px rgba(108,108,245,0.7)',
  orange: '0 14px 34px -14px rgba(255,79,43,0.7)',
}

export function PhysicsCapsules() {
  const sceneRef = useRef<HTMLDivElement | null>(null)

  const capsuleRefs = useRef<Array<HTMLDivElement | null>>([])

  const engineRef = useRef<Matter.Engine | null>(null)

  const rafRef = useRef<number | null>(null)

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const [started, setStarted] = useState<boolean>(false)

  const [height, setHeight] = useState<number>(300)

  useLayoutEffect(() => {
    const update = () => {
      setHeight(window.innerWidth < 640 ? 360 : 300)
    }

    update()

    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const element = sceneRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.25,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return

    const scene = sceneRef.current

    if (!scene) return

    const width = scene.clientWidth
    const trayHeight = scene.clientHeight

    const {
      Engine,
      World,
      Bodies,
      Composite,
      Body,
      Sleeping,
    } = Matter

    const engine = Engine.create()

    engine.gravity.y = 1.1

    engineRef.current = engine

    const wall = 80

    const staticOptions = {
      isStatic: true,
      restitution: 0.2,
    }

    const floor = Bodies.rectangle(
      width / 2,
      trayHeight + wall / 2,
      width * 2,
      wall,
      staticOptions,
    )

    const leftWall = Bodies.rectangle(
      -wall / 2,
      trayHeight / 2,
      wall,
      trayHeight * 3,
      staticOptions,
    )

    const rightWall = Bodies.rectangle(
      width + wall / 2,
      trayHeight / 2,
      wall,
      trayHeight * 3,
      staticOptions,
    )

    World.add(engine.world, [floor, leftWall, rightWall])

    const count = capsuleRefs.current.length

    const margin = 70

    const usableWidth = Math.max(
      60,
      width - margin * 2,
    )

    const order = [...Array(count).keys()].sort(
      () => Math.random() - 0.5,
    )

    const bodies = capsuleRefs.current.map(
      (node, index): Matter.Body => {
        const capsuleWidth = node?.offsetWidth ?? 140
        const capsuleHeight = node?.offsetHeight ?? 48

        const lane = order.indexOf(index)

        const laneX =
          margin +
          (usableWidth / count) * (lane + 0.5)

        const startX =
          laneX + (Math.random() - 0.5) * 24

        const body = Bodies.rectangle(
          startX,
          -120 - index * 24,
          capsuleWidth,
          capsuleHeight,
          {
            chamfer: {
              radius: capsuleHeight / 2,
            },
            restitution: 0.08,
            friction: 0.9,
            frictionStatic: 1,
            frictionAir: 0.02,
            density: 0.0014,
            isSleeping: true,
          },
        )

        Body.setAngle(
          body,
          (Math.random() - 0.5) * 0.25,
        )

        return body
      },
    )

    bodies.forEach((body, index) => {
      const timeout = setTimeout(() => {
        Sleeping.set(body, false)

        Body.setAngularVelocity(
          body,
          (Math.random() - 0.5) * 0.08,
        )

        Body.setVelocity(body, {
          x: 0,
          y: 2,
        })

        World.add(engine.world, body)

        const element =
          capsuleRefs.current[index]

        if (element) {
          element.style.opacity = '1'
        }
      }, index * 200)

      timersRef.current.push(timeout)
    })

    let lastTime = performance.now()

    const tick = (currentTime: number) => {
      const delta = Math.min(
        currentTime - lastTime,
        33,
      )

      lastTime = currentTime

      Engine.update(engine, delta)

      bodies.forEach((body, index) => {
        const element =
          capsuleRefs.current[index]

        if (!element) return

        const { x, y } = body.position

        element.style.transform = `
          translate(
            ${x - element.offsetWidth / 2}px,
            ${y - element.offsetHeight / 2}px
          )
          rotate(${body.angle}rad)
        `
      })

      rafRef.current =
        requestAnimationFrame(tick)
    }

    rafRef.current =
      requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }

      timersRef.current.forEach((timeout) => {
        clearTimeout(timeout)
      })

      timersRef.current = []

      Composite.clear(engine.world, false)

      Engine.clear(engine)
    }
  }, [started, height])

  return (
    <div
      ref={sceneRef}
      className="relative w-full overflow-hidden"
      style={{ height }}
      aria-label="Working principles"
    >
      {CAPSULES.map((capsule, index) => (
        <div
          key={capsule.label}
          ref={(element) => {
            capsuleRefs.current[index] = element
          }}
          style={{
            opacity: 0,
            boxShadow: COLOR_SHADOW[capsule.color],
            willChange: 'transform',
          }}
          className={`absolute left-0 top-0 select-none whitespace-nowrap rounded-full px-6 py-3 font-sans text-sm font-semibold sm:text-[15px] ${COLOR_CLASSES[capsule.color]}`}
        >
          {capsule.label}
        </div>
      ))}
    </div>
  )
}