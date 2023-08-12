import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'
import Home from '../components/Home.jsx'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-light-peach">
      <Header />
      <div className="flex-grow">
        <Home />
      </div>
      <Footer />
    </div>
  )
}