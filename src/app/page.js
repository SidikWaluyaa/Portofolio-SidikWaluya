import Hero from "@/sections/Hero";
import FeaturedProjects from "@/sections/FeaturedProjects";
import ServicesOverview from "@/sections/ServicesOverview";
import TechTicker from "@/components/TechTicker";
import Skills from "@/sections/Skills";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <TechTicker />
      <FeaturedProjects />
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent max-w-7xl mx-auto" />
      <Skills />
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent max-w-7xl mx-auto" />
      <ServicesOverview />
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent max-w-7xl mx-auto" />
    </div>
  );
}
