import Footer from '../components/footer'
import Meta from '../components/meta'
import TopNav from "./generic/nav/topnav";

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <TopNav></TopNav>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
