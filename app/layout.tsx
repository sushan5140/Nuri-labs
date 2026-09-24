import type { Metadata } from 'next';
import './globals.css';
import './atlas.css';
import './storyflow.css';
export const metadata: Metadata = { title: 'NURI Labs — Four worlds. One curious universe.', description: 'Explore four independent learning experiences for Korean language, video, stories and studying in Korea.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
