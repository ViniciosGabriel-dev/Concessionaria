import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Top Multimarcas | Compre seu carro com segurança',
  description:
    'Top Multimarcas: encontre veículos seminovos e usados com procedência, financiamento facilitado e atendimento transparente. Fale pelo WhatsApp agora.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
