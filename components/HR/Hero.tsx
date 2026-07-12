import Image from 'next/image'

export function Hero() {
  return (
    <section className="w-full bg-[#ffffff]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-10 px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:gap-16 lg:px-20 lg:py-24">
        {/* Text column */}
        <div className="w-full lg:flex-1">
          <h1 className="font-sans text-4xl font-extrabold uppercase leading-[1.15] tracking-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">
            Turn followers into{' '}
            <span className="inline-block rounded-tr-4xl rounded-bl-4xl rounded-tl-none rounded-br-none bg-[var(--color-accent)] px-[0.25em] pb-[0.08em] leading-none text-white">
              paid
            </span>{' '}
            clients.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            The 5-step system that converts DMs and comments into a booked, paid
            calendar — without chasing anyone for payment.
          </p>
        </div>

        {/* Image column */}
        <div className="w-full lg:flex-1">
          <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-2xl lg:ml-auto lg:mr-0">
            <Image
              src="/HR.png"
              alt="Portrait of a smiling professional consultant"
              fill
              sizes="(max-width: 1024px) 100vw, 448px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}