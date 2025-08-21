import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import Sidebar from "./SideBar";
import IntroSection from "./IntroSection";
import YesWeDesignSection from "./YesWeDesign";
import GallerySection from "./GallerySection";
import TeamSection from "./TeamSection";
import ContactSection from "./ContactSection";
import TopBar from "./TopBar";

const TactLanding: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
  const [showInitialContent, setShowInitialContent] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  // Logo position values
  const logoY = useMotionValue(0);
  const logoX = useMotionValue(0);

  // Track scroll progress for TACT letter filling - with smoother transitions
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (initialAnimationComplete) {
        // Smoother section transitions with overlapping ranges
        if (progress <= 0.2) {
          setCurrentSection(1); // YES WE DESIGN section
        } else if (progress <= 0.4) {
          setCurrentSection(2); // Gallery section
        } else if (progress <= 0.7) {
          setCurrentSection(3); // Team section
        } else {
          setCurrentSection(4); // Contact section
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, initialAnimationComplete]);

  // Initial animation after 3 seconds - smoother
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(logoY, -70, { 
        duration: 1.2, 
        ease: [0.25, 0.1, 0.25, 1] // Custom cubic bezier for smoothness
      });
      setShowInitialContent(false);
      setTimeout(() => {
        setInitialAnimationComplete(true);
      }, 1200);
    }, 3000);

    return () => clearTimeout(timer);
  }, [logoY]);

  // Logo horizontal movement based on scroll - smoother curve
  const logoXScroll = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.6, 1], 
    [0, 400, 600, 1100]
  );

  useEffect(() => {
    if (initialAnimationComplete) {
      const unsubscribe = logoXScroll.on("change", (value) => {
        animate(logoX, value, {
          duration: 0.1,
          ease: "linear"
        });
      });
      return () => unsubscribe();
    }
  }, [initialAnimationComplete, logoXScroll, logoX]);

  // Section animations - smoother overlapping transitions
  const yesWeDesignOpacity = useTransform(
    scrollYProgress, 
    [0, 0.05, 0.15, 0.25], 
    [1, 1, 1, 0]
  );
  const yesWeDesignY = useTransform(
    scrollYProgress, 
    [0, 0.25], 
    [0, -50]
  );

  const galleryOpacity = useTransform(
    scrollYProgress, 
    [0.15, 0.25, 0.4, 0.5], 
    [0, 1, 1, 0]
  );
  const galleryY = useTransform(
    scrollYProgress, 
    [0.25, 0.5], 
    [50, -50]
  );

  const teamOpacity = useTransform(
    scrollYProgress, 
    [0.4, 0.5, 0.65, 0.75], 
    [0, 1, 1, 0]
  );
  const teamY = useTransform(
    scrollYProgress, 
    [0.5, 0.75], 
    [50, -50]
  );

  const contactOpacity = useTransform(
    scrollYProgress, 
    [0.65, 0.75], 
    [0, 1]
  );
  const contactY = useTransform(
    scrollYProgress, 
    [0.75], 
    [0]
  );

  return (
    <div className="bg-white relative min-h-[400vh]" style={{ scrollBehavior: 'smooth' }}>
      <Sidebar
        currentSection={currentSection}
        initialAnimationComplete={initialAnimationComplete}
        logoY={logoY}
        logoX={logoX}
      />
      <TopBar />
      <IntroSection showInitialContent={showInitialContent} />
      {initialAnimationComplete && (
        <motion.div 
          className="relative z-10 mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            style={{
              opacity: yesWeDesignOpacity,
              y: yesWeDesignY,
            }}
          >
            <YesWeDesignSection opacity={yesWeDesignOpacity} y={yesWeDesignY} />
          </motion.div>
          
          <motion.div
            style={{
              opacity: galleryOpacity,
              y: galleryY,
            }}
          >
            <GallerySection opacity={galleryOpacity} y={galleryY} />
          </motion.div>
          
          <motion.div
            style={{
              opacity: teamOpacity,
              y: teamY,
            }}
          >
            <TeamSection opacity={teamOpacity} y={teamY} />
          </motion.div>
          
          <motion.div
            style={{
              opacity: contactOpacity,
              y: contactY,
            }}
          >
            <ContactSection opacity={contactOpacity} y={contactY} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default TactLanding;