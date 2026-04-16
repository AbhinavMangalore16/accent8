import { tips } from "../data/tips"
import { TipCard } from "../ui/TipCard"

export function TipsPanel(){
    return(
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">What can you do?</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {
                    tips.map((tip)=>(
                       <TipCard key={tip.title} title={tip.title} description={tip.description} icon={tip.icon}
                        gradient={tip.gradient} href={tip.href} text={tip.text} tags={tip.tags} voices={tip.voices}/>
                    ))
                }
            </div>
        </div>
    )
}