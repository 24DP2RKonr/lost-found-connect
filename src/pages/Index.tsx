import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import SearchSection from "@/components/home/SearchSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import RecentListingsSection from "@/components/home/RecentListingsSection";
import TrustSection from "@/components/home/TrustSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <SearchSection />
      <HowItWorksSection />
      <RecentListingsSection />
      <TrustSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
