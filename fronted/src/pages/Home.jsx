import HeroSlider from "../components/home/HeroSlider.jsx";
import AboutComponents from "../components/home/AboutComponents.jsx";
import WhyChooseUs from "../components/home/WhyChooseUs.jsx";
import NoticeBoard from "../components/home/NoticeBoard.jsx";
import PrincipalMessage from "../components/home/PrincipalMessage.jsx";
import ExploreSchoolLife from "../components/home/ExploreSchoolLife.jsx";
import Faqs from "../components/faqs/Faqs.jsx";

const Home = () => {
  return (
    <main className="bg-gray-50">
      <HeroSlider />
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <AboutComponents />
        <WhyChooseUs />
        <ExploreSchoolLife />
        <NoticeBoard />
        <PrincipalMessage />
        <Faqs />
      </div>
    </main>
  );
};

export default Home;
