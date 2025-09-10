import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enhanced Hero Component Demo',
  description: 'A demonstration of the premium hero component with A/B testing variants',
};

export default function HeroDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  );
}