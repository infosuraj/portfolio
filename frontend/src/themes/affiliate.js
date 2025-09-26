// Import your shared layout components
import Preloader from "../components/Miscellaneous/Preloader";
import Header from "../components/Header/Header";
import BreadcrumbTwo from "../components/Breadcrumb/BreadcrumbTwo"; // You might want a different Breadcrumb title/text for affiliates
import CTA from "../components/CTA/CTAOne"; // Reusing your Call To Action
import Footer from "../components/Footer/Footer";
import SearchModal from "../components/Miscellaneous/SearchModal";
import OffcanvasMenu from "../components/Miscellaneous/OffcanvasMenu";
import MagicCursor from "../components/Miscellaneous/MagicCursor";
import LenisScroll from "../components/Header/LenisScroll";

// Import the AffiliateSection you previously created
import AffiliateSection from "../components/Affiliate/AffiliateSection";
import { Helmet } from "react-helmet";

const Affiliate = () => {
  // You might not need profile context here unless your affiliate page
  // also depends on user profile data. If not, you can remove these lines.
  // const { profile, loading } = useProfile();
  // const [imgSrc, setImgSrc] = useState("/img/case-1.jpg");
  // useEffect(() => {
  //     if (profile){
  //         setImgSrc(profile?.banner.replace('/upload/','/upload/w_1920,h_1200,c_fit,q_auto,f_auto/'))
  //     }
  // }, [profile, loading]);

  return (
    <>
    <Helmet>
      <title>Helpful Resources & Tools - INFOSURAJ</title>
      <meta
        name="description"
        content="Discover a curated list of helpful resources, tools, and recommended products that INFOSURAJ uses and trusts for web development and design."
      />
      <link rel="canonical" href="https://www.infosuraj.com/helpful-resources" />
      <meta property="og:title" content="Helpful Resources & Tools - INFOSURAJ" />
      <meta
        property="og:description"
        content="Discover a curated list of helpful resources, tools, and recommended products that INFOSURAJ uses and trusts for web development and design."
      />
      <meta property="og:url" content="https://www.infosuraj.com/helpful-resources" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Helpful Resources & Tools - INFOSURAJ" />
      <meta
        name="twitter:description"
        content="Discover a curated list of helpful resources, tools, and recommended products that INFOSURAJ uses and trusts for web development and design."
      />
    </Helmet>
    <div>
      <MagicCursor />
      <Preloader />
      <LenisScroll />{" "}
      {/* Assuming you want smooth scrolling on this page too */}
      <div className="main">
        <Header />
        <div id="main-wrapper" className="main-wrapper">
          <BreadcrumbTwo title="Powerful Tools" subheading="for progress" />
          {/* Your main Affiliate content goes here */}
          <AffiliateSection />
          {/* Reusable components */}
          <CTA /> {/* If you want a Call To Action at the bottom */}
          <Footer />
          <SearchModal />
          <OffcanvasMenu />
        </div>
      </div>
    </div>
    </>
  );
};

export default Affiliate;
