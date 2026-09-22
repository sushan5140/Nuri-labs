import type { Metadata } from 'next';
import './globals.css';
import './interactive.css';
import './flagship.css';
export const metadata: Metadata = { title: 'NURI Labs — One little spark. A world of possibilities.', description: 'Four connected experiences for Korean learning, stories, community and studying in Korea.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
