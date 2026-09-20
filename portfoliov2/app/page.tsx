import SmoothScroll from "./components/SmoothScroll";
import SiteNav from "./components/SiteNav";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import FeaturedWork from "./components/FeaturedWork";
import Skills from "./components/Skills";
import Tools from "./components/Tools";
import Mail from "./components/Mail";
import Footer from "./components/Footer";
import ScrollDial from "./components/ScrollDial";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SiteNav />
      <main>
        <Hero />
        <AboutMe />
        <FeaturedWork />
        <Skills />
        <Tools />
        <Mail />
      </main>
      <Footer />
      <ScrollDial />
    </>
  );
}
