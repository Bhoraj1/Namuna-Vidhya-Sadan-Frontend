import { Outlet } from "react-router-dom";

import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import Navbar from "../components/shared/Navbar";
import ScrollToTop from "../components/shared/ScrollTop";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      {/* Header */}
      <Header />

      {/* Navbar - positioned between header and content */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-8 -mt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
