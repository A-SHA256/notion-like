import HeroSection from './page-content/HeroSection'
import FeaturesSection from './page-content/FeaturesSection'
import TestimonialSection from './page-content/TestimonialSection';
import CallToActionSection from './page-content/CallToActionSection';

export default function PageContent() {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <TestimonialSection />
            <CallToActionSection />
        </div>
    );
}