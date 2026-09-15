import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import FeaturedWork from "./components/FeaturedWork";
import Skills from "./components/Skills";
import Tools from "./components/Tools";
import Mail from "./components/Mail";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <FeaturedWork />
      <Skills />
      <Tools />
      <Mail />
      <Contact />
    </main>
  );
}
