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
                <main className={`flex flex-row items-center justify-center w-full h-screen bg-gray-100 ${comfortaa.className}`}>
                    {children}
                </main>
            </body>
        </html>
    );
}