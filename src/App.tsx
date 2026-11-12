import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Background } from "./components/Background";
import { Cursor } from "./components/Cursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { Process } from "./components/Process";
import { Stack } from "./components/Stack";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { DemoLanding } from "./components/demos/DemoLanding";
import { DemoBot } from "./components/demos/DemoBot";
import { DemoDashboard } from "./components/demos/DemoDashboard";
import { useHashRoute, type DemoRoute } from "./lib/router";

function MainSite() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Stack />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function DemoView({ route }: { route: DemoRoute }) {
  if (route === "landing") return <DemoLanding />;
  if (route === "bot") return <DemoBot />;
  return <DemoDashboard />;
}

function App() {
  const route = useHashRoute();
  const reduce = useReducedMotion();
  const savedScroll = useRef(0);

  useEffect(() => {
    if (route) {
      savedScroll.current = window.scrollY;
    } else {
      // ждём, пока главная страница смонтируется после exit-анимации
      window.setTimeout(
        () =>
          window.scrollTo({
            top: savedScroll.current,
            behavior: "instant" as ScrollBehavior,
          }),
        520
      );
    }
  }, [route]);

  // Только opacity: transform на обёртке сломал бы position: fixed у навигации
  const page = route ? (
    <motion.div
      key={"demo-" + route}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <DemoView route={route} />
    </motion.div>
  ) : (
    <motion.div
      key="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <MainSite />
    </motion.div>
  );

  return (
    <div className="relative">
      <Background />
      <Cursor />
      <ScrollProgress />
      {reduce ? (
        page
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          {page}
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;
