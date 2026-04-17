import React from "react";

import bgImg from "../assets/img/scphoto.jpg";
import HeroContainer from "../components/shared/HeroContainer";
import MissionVision from "../components/About/Mision";
import Facilities from "../components/About/Facilities";
import RecentAchievements from "../components/About/RecentAchievements";
import StudentReviews from "../components/About/StudentReviews";
import AcademicPrograms from "../components/About/AcademicPrograms";
import Stat from "../components/About/Stat";
import Features from "../components/About/Features";
import Story from "../components/About/Story";

const About = () => {
  return (
    <div className="w-full ">
      {/* Hero Section */}
      <HeroContainer
        bgImage={bgImg}
        title="about us"
        subtitle="Namuna bidhya sadan"
      />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
        {/* stats */}
        <Stat />
        {/* Our Story Section */}
        <Story />
        {/* mision vision and corevalue */}
        <MissionVision />
        {/* Facilities Section */}
        <Facilities />
        {/* Academic Programs Section */}
        <AcademicPrograms />
        {/* Recent Achievements Section
      <RecentAchievements /> */}
        {/* Features Section */}
        <Features />
        {/* Student Reviews Section */}
        <StudentReviews />
      </div>
    </div>
  );
};

export default About;
