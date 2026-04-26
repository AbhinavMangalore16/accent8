"use client"

import { useRef, useState } from "react"
import { tips } from "../data/tips"
import { TipCard } from "../ui/TipCard"

export function TipsPanel(){
    const audioRef = useRef<HTMLAudioElement>(null)
    const [activeTipTitle, setActiveTipTitle] = useState<string | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const handleTogglePlay = async (tipTitle: string, previewUrl?: string) => {
        if (!audioRef.current || !previewUrl) {
            return
        }

        const audio = audioRef.current
        const isSameTip = activeTipTitle === tipTitle

        if (isSameTip && isPlaying) {
            audio.pause()
            audio.currentTime = 0
            setIsPlaying(false)
            setActiveTipTitle(null)
            return
        }

        if (!isSameTip) {
            audio.pause()
            audio.src = previewUrl
            audio.currentTime = 0
            audio.load()
        }

        try {
            await audio.play()
            setIsPlaying(true)
            setActiveTipTitle(tipTitle)
        } catch {
            setIsPlaying(false)
            setActiveTipTitle(null)
        }
    }

    const handleAudioEnded = () => {
        setIsPlaying(false)
        setActiveTipTitle(null)
    }

    return(
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">What can you do?</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {
                    tips.map((tip)=>(
                       <TipCard
                        key={tip.title}
                        title={tip.title}
                        description={tip.description}
                        icon={tip.icon}
                        gradient={tip.gradient}
                        href={tip.href}
                        animationData={tip.animationData}
                        isPlaying={isPlaying && activeTipTitle === tip.title}
                        canPlay={Boolean(tip.voices[0]?.previewUrl)}
                        onTogglePlay={() => handleTogglePlay(tip.title, tip.voices[0]?.previewUrl)}
                       />
                    ))
                }
            </div>
            <audio
                ref={audioRef}
                preload="metadata"
                crossOrigin="anonymous"
                onEnded={handleAudioEnded}
            />
        </div>
    )
}