import { cn } from '@/lib/cn'

interface HeroHeadlineProps {
  id?: string
  className?: string
}

export function HeroHeadline({
  id,
  className,
}: HeroHeadlineProps) {
  return (
    <h1 className="font-display text-center text-[72px] tracking-[-0.04em] mb-10 md:mb-12">
  <span className="block leading-[0.95]">What do you want</span>
  <span className="block leading-[0.95]">to do with your</span>
  <span className="block leading-[0.9] italic text-[#00E87A]">
    property?
  </span>
    </h1>

     
    
  )
}