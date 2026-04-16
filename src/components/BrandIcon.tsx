type BrandIconProps = {
  src: string
  label: string
  className?: string
}

export function BrandIcon({ src, label, className }: BrandIconProps) {
  return (
    <span
      aria-label={label}
      role="img"
      className={`inline-block bg-current ${className ?? ''}`}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  )
}







