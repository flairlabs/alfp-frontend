import Footer from '../components/footer'
import Meta from '../components/meta'
import TopNav from "./generic/nav/topnav";
import MasterNavbar from "./generic/nav/master-nav";

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
          <MasterNavbar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
