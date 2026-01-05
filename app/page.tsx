import PortfolioHero from "@/components/ui/portfolio-hero";
import AboutSection2 from "@/components/ui/about-section-2";

export default function Home() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Antic&display=swap"
      />
      <div className="w-full">
        <PortfolioHero />
        <AboutSection2 />
      </div>
    </>
  );
}
