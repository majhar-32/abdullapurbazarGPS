import React from 'react';
import Hero from '../components/ui/Hero';
import NoticeBoard from '../components/ui/NoticeBoard';
import EventGallery from '../components/ui/EventGallery';
import HeadmasterMessage from '../components/ui/HeadmasterMessage';
import Achievements from '../components/ui/Achievements';
import FadeInSection from '../components/ui/FadeInSection';
import SchoolFeatures from '../components/ui/SchoolFeatures';
import MapSection from '../components/ui/MapSection';

import SEO from '../components/common/SEO';

const Home = () => {
  return (
    <div>
      <SEO 
        title="Home" 
        description="Welcome to Abdullapur Bazar Government Primary School. A leading primary educational institution committed to academic excellence and character building."
      />
      <Hero />
      <FadeInSection>
        <NoticeBoard />
      </FadeInSection>
      <EventGallery />
      <FadeInSection delay={0.2}>
        <HeadmasterMessage />
      </FadeInSection>
      <FadeInSection>
        <SchoolFeatures />
      </FadeInSection>
      <Achievements />
      <MapSection />
    </div>
  );
};

export default Home;
