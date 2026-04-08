import Header from '@/components/Header'
import StockBrowser from '@/components/StockBrowser'
import DiferenciaisSection from '@/components/DiferenciaisSection'
import AvaliacoesSection from '@/components/AvaliacoesSection'
import FinanciamentoSection from '@/components/FinanciamentoSection'
import VenderSection from '@/components/VenderSection'
import Footer from '@/components/Footer'
import WaFloat from '@/components/WaFloat'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <StockBrowser />
        <DiferenciaisSection />
        <AvaliacoesSection />
        <FinanciamentoSection />
        <VenderSection />
      </main>
      <Footer />
      <WaFloat />
    </>
  )
}
