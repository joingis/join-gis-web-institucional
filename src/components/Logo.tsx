import clsx from 'clsx'
import Image from 'next/image'

import logoJoinGIS from '@/images/logo.png'

type LogoProps = React.ComponentPropsWithoutRef<'span'> & {
  invert?: boolean
  filled?: boolean
  fillOnHover?: boolean
}

export function Logomark({
  className,
  invert = false,
  filled: _filled,
  fillOnHover: _fillOnHover,
  ...props
}: LogoProps) {
  return (
    <span
      {...props}
      className={clsx(
        'inline-flex shrink-0 items-center overflow-hidden',
        invert && 'rounded-md bg-white',
        className,
      )}
    >
      <Image
        src={logoJoinGIS.src}
        alt=""
        width={885}
        height={544}
        unoptimized
        className="h-full w-auto max-w-none object-contain"
      />
    </span>
  )
}

export function Logo({
  className,
  invert = false,
  filled: _filled,
  fillOnHover: _fillOnHover,
  ...props
}: LogoProps) {
  return (
    <span
      {...props}
      className={clsx(
        'inline-flex shrink-0 items-center overflow-hidden',
        invert && 'rounded-md bg-white',
        className,
      )}
    >
      <Image
        src={logoJoinGIS.src}
        alt=""
        width={885}
        height={544}
        unoptimized
        className="h-full w-auto max-w-none object-contain"
      />
    </span>
  )
}
