import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Tools from "./components/Tools";
import Mail from "./components/Mail";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <Skills />
      <Tools />
      <Mail />
      <Contact />
    </main>
  );
}
