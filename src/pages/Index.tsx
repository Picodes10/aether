
import MainLayout from "@/components/Layout/MainLayout";
import HeroSection from "@/components/Home/HeroSection";
import CategorySection from "@/components/Home/CategorySection";
import FeaturedQuizzes from "@/components/Home/FeaturedQuizzes";
import LeaderboardPreview from "@/components/Home/LeaderboardPreview";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <CategorySection />
      <FeaturedQuizzes />
      <LeaderboardPreview />
    </MainLayout>
  );
};

export default Index;
