import AsideBar from '@/components/layout/asideBar';
import {Comfortaa} from 'next/font/google';

const comfortaa = Comfortaa({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-comfortaa',
});

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body>
                <main className={`grid grid-cols-[18%_82%] w-full h-screen bg-gray-100 ${comfortaa.className}`}>
                    <AsideBar />
                    {children}
                </main>
            </body>
        </html>
    );
}