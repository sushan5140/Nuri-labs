import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'NURI Labs — Learn, connect, go further', description: 'A student-led educational technology initiative connecting Korean learning, stories and study opportunities.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
