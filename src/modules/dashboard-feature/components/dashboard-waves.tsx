import { WavyBackground } from "@/components/ui/wavy-background";


export function DashboardWaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <WavyBackground
        colors={["#67e8f9", "#7dd3fc", "#a5b4fc", "#d8b4fe"]}
        backgroundFill="transparent"
        blur={3}
        speed="slow"
        waveOpacity={0.2}
        waveWidth={40}
        waveOffset={280}
        containerClassName="h-full"
        className="h-full w-full"
      />
    </div>
  );
}