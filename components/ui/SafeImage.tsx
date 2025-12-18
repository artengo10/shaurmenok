// components/ui/SafeImage.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'

interface SafeImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    fallbackSrc?: string
}

export default function SafeImage({
    src,
    alt,
    width,
    height,
    className,
    fallbackSrc = "/images/default/food.jpg"
}: SafeImageProps) {
    const [imgSrc, setImgSrc] = useState(src)

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            onError={() => setImgSrc(fallbackSrc)}
        />
    )
}