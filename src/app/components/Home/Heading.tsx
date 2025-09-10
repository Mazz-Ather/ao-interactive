import { GooeyMarquee } from "@/app/components/ui/gooeyMarquee";

export default function Heading() {
 return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <GooeyMarquee text="Design creates culture." />
{/* 
        <p className="text-xl mt-8 text-primary/60">
          The component uses two text layers - a blurred background layer with high contrast filtering and linear gradients for the gooey effect, and a clean foreground layer for readability.
        </p> */}
      </div>
    </div>
  )
}
