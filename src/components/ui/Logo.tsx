import Link from 'next/link'
import { cn } from '@/lib/cn'
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
  /** When true renders a <div> instead of <Link> — useful inside nav anchors */
  asDiv?: boolean
}

const iconSize  = { sm: 'w-7 h-7',   md: 'w-8 h-8',   lg: 'w-10 h-10'  }
const textSize  = { sm: 'text-lg',   md: 'text-xl',   lg: 'text-2xl'   }
const iconText  = { sm: 'text-sm',   md: 'text-base', lg: 'text-lg'    }

/**
 * Logo
 * ─────
 * Renders the AI4Planning wordmark with its glowing icon.
 * The icon is a pure-CSS approximation of the logo's question-mark square
 * until the actual SVG/PNG asset is added to /public/logo.svg.
 *
 * To swap in the real asset:
 *   Replace <LogoIcon> with:
 *   <Image src="/logo.svg" alt="AI4Planning" width={32} height={32} />
 */
export function Logo({ size = 'md', onClick, className, asDiv }: LogoProps) {
  const inner = (
    <span
      className={cn(
        'flex items-center gap-2.5 select-none cursor-pointer',
        className
      )}
    >
      {/* <LogoIcon sizeClass={iconSize[size]} textClass={iconText[size]} />
      <span
        className={cn(
          'font-display font-normal tracking-tight leading-none',
          textSize[size]
        )}
        style={{ color: '#E8F0FF' }}
      >
        AI4
        <em
          className="not-italic"
          style={{
            color: '#00E87A',
            textShadow: '0 0 20px rgba(0,232,122,0.5)',
          }}
        >
          Planning
        </em>
      </span> */}
       <video
  width={100}
  height={200}
  autoPlay
  muted
  loop
  playsInline
>
  <source src="/logovideo.mp4" type="video/mp4" />
</video>
    </span>
  )

  if (asDiv) {
    return <div onClick={onClick}>{inner}</div>
  }

  return (
    <Link href="/" onClick={onClick} aria-label="AI4Planning home">
      {inner}
    </Link>
  )
}

// ── Logo Icon ─────────────────────────────────────────────────────
function LogoIcon({
  sizeClass,
  textClass,
}: {
  sizeClass: string
  textClass: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-lg shrink-0',
        'font-display font-semibold',
        sizeClass,
        textClass
      )}
      style={{
        background: 'linear-gradient(135deg, #00E87A 0%, #00D4FF 100%)',
        boxShadow:
          '0 0 12px rgba(0,232,122,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
        color: '#050A12',
      }}
      aria-hidden="true"
    >
      ?
    </span>
  )
}
