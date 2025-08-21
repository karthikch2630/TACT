import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import Gallery from "./ImageGallery";

const TactLanding = () => {
  const { scrollYProgress } = useScroll();
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
  const [showInitialContent, setShowInitialContent] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  // Logo position values
  const logoY = useMotionValue(0);
  const logoX = useMotionValue(0);

  // Track scroll progress for TACT letter filling
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (initialAnimationComplete) {
        if (progress <= 0.25) {
          setCurrentSection(1); // T fills - YES WE DESIGN section
        } else if (progress <= 0.5) {
          setCurrentSection(2); // A fills - Gallery section
        } else if (progress <= 0.75) {
          setCurrentSection(3); // C fills - Team section
        } else {
          setCurrentSection(4); // T fills - Contact section
        }
      }
    });
    return unsubscribe;
  }, [scrollYProgress, initialAnimationComplete]);

  // Initial animation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Move logo up by 50px
      animate(logoY, -70, { duration: 0.8, ease: "easeOut" });

      // Hide initial content
      setShowInitialContent(false);

      // Mark initial animation as complete after logo moves up
      setTimeout(() => {
        setInitialAnimationComplete(true);
      }, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, [logoY]);

  // Logo horizontal movement based on scroll (only after initial animation)
  const logoXScroll = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75],
    [0, 350, 600, 1100]
  );

  // Update logo X position only after initial animation is complete
  useEffect(() => {
    if (initialAnimationComplete) {
      const unsubscribe = logoXScroll.on("change", (value) => {
        logoX.set(value);
      });
      return unsubscribe;
    }
  }, [initialAnimationComplete, logoXScroll, logoX]);

  // Section animations
  const yesWeDesignOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const yesWeDesignY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

  const galleryOpacity = useTransform(scrollYProgress, [0.25, 0.5], [1, 0]);
  const galleryY = useTransform(scrollYProgress, [0.25, 0.5], [0, -100]);

  const teamOpacity = useTransform(scrollYProgress, [0.5, 0.75], [1, 0]);
  const teamY = useTransform(scrollYProgress, [0.5, 0.75], [0, -100]);

  const contactOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const contactY = useTransform(scrollYProgress, [0.75, 1], [0, -100]);

  const tactText = "TACT".split("");
  const advertisingText = "ADVERTISING".split("");

  const handleImageError = (e) => {
    e.currentTarget.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
  };

  return (
    <div className="bg-white relative min-h-[400vh]">
      {/* Fixed Left Side - TACT ADVERTISING Text */}
      <div className="fixed left-4 top-0 h-screen flex items-start z-50">
        <motion.h1
          className="font-segoe font-bold text-[95px] leading-[90px] [writing-mode:vertical-rl] rotate-180 tracking-wide text-transparent mb-2 pt-2"
          style={{ WebkitTextStroke: "1px gray" }}
        >
          {tactText.map((letter, index) => {
            let fillColor = "transparent";
            if (initialAnimationComplete) {
              if (index === 0 && currentSection >= 1) {
                fillColor = "#f97316";
              } else if (index === 1 && currentSection >= 2) {
                fillColor = "#f97316";
              } else if (index === 2 && currentSection >= 3) {
                fillColor = "#f97316";
              } else if (index === 3 && currentSection >= 4) {
                fillColor = "#f97316";
              }
            }
            return (
              <motion.span
                key={`tact-${index}`}
                className="inline-block"
                style={{ WebkitTextStroke: "1px gray" }}
                animate={{ color: fillColor }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {letter}
              </motion.span>
            );
          })}
          <br />
          {advertisingText.map((letter, index) => (
            <motion.span
              key={`advertising-${index}`}
              className="inline-block"
              style={{ WebkitTextStroke: "1px gray", color: "transparent" }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <div className="flex flex-col items-start ml-3 mt-[83px]">
          {/* Fixed Logo */}
          <motion.img
            src="/Tact-logo.png"
            alt="Tact Logo"
            className="h-[120px] w-auto object-contain mb-20 relative z-60"
            style={{ y: logoY, x: logoX }}
            onError={handleImageError}
          />
        </div>
      </div>

      {/* Initial Content - Hello Section */}
      <motion.div
        className="fixed left-4 top-0 h-screen flex items-start z-30"
        animate={{
          opacity: showInitialContent ? 1 : 0,
          y: showInitialContent ? 0 : -50,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="ml-[180px] mt-[166px] pt-24 pl-10">
          <p className="font-segoe text-2xl font-normal mb-1">Hello!</p>
          <p className="font-segoe text-6xl font-bold mb-5">Tact Advertising</p>
          <p className="font-segoe text-[20px] leading-tight max-w-md mb-6">
            "We specialize in Branding, Brochure Design, Print Media, Website
            Design, Social Media Marketing, 3D Walkthroughs and Motion
            Graphics."
          </p>
          <div className="flex space-x-8 mb-8">
            <div className="text-center">
              <p className="font-segoe text-4xl font-bold text-[#f97316]">7+</p>
              <p className="font-segoe text-sm">Years Of Experience</p>
            </div>
            <div className="text-center">
              <p className="font-segoe text-4xl font-bold text-[#f97316]">100+</p>
              <p className="font-segoe text-sm">Successful Projects</p>
            </div>
          </div>
          <p className="font-segoe text-3xl font-bold mb-2 px-6 py-1 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-white rounded-sm shadow-md inline-block tracking-wide">
            AVAILABLE SOON
          </p>
          <p className="font-segoe text-[18px] max-w-md">
            We are preparing something extraordinary for you!
          </p>
        </div>
      </motion.div>

      {/* Initial Right Side Images */}
      {showInitialContent && (
        <motion.div
          className="fixed right-32 top-0 h-screen flex items-center justify-center z-30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="/Web-01.png"
            alt="Welcome to Tact"
            className="h-[600px] w-[560px] object-contain"
            onError={handleImageError}
          />
          <img
            src="/Web-02.png"
            alt="Circular Tact Advertising"
            className="absolute bottom-20 right-[435px] h-[100px] w-[100px] object-contain animate-spin-slow"
            onError={handleImageError}
          />
        </motion.div>
      )}

      {/* Scrollable Content - Only appears after initial animation */}
      {initialAnimationComplete && (
        <div className="relative z-10">
          {/* YES WE DESIGN Section */}
          <section className="h-screen flex items-center justify-end bg-white pr-36 pl-[180px]">
            <motion.p
              className="text-8xl font-segoe font-bold tracking-wide text-[#f97316]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              style={{
                opacity: yesWeDesignOpacity,
                y: yesWeDesignY,
              }}
            >
              "YES" <br />
              WE DESIGN <br />
              YOUR <br />
              THOUGHTS.
            </motion.p>
          </section>

          {/* TAKE IT TACT Gallery Section */}
          <section className="min-h-screen flex items-center justify-center bg-white px-10 pl-[180px]">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 items-center w-full max-w-7xl gap-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              style={{
                opacity: galleryOpacity,
                y: galleryY,
              }}
            >
              <div className="flex flex-col items-start space-y-6 text-left">
                <p className="text-6xl md:text-7xl font-bold tracking-wide text-gray-200 leading-tight">
                  TAKE <br />
                  IT <br />
                  <span className="text-[#f97316]">TACT</span> <br />
                  ON <br />
                  YOUR <br />
                  BRAND
                </p>
              </div>
              <div className="w-full h-[500px] bg-white relative z-20 mb-4">
                <Gallery />
              </div>
            </motion.div>
          </section>

          {/* Team Section */}
          <section className="min-h-screen flex items-center justify-center bg-white pl-[180px] py-20">
            <motion.div
              className="w-full max-w-7xl px-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              style={{
                opacity: teamOpacity,
                y: teamY,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side - Text */}
                <div className="space-y-6">
                  <h2 className="text-8xl font-bold text-gray-200 leading-tight">
                    THE <br />
                    TEAM <br />
                    <span className="text-[#f97316]">TACT</span>
                  </h2>
                </div>

                {/* Right Side - Team Grid */}
                <div className="relative">
                  {/* Main Large Image */}
                  <div className="mb-8">
                    <div className="relative bg-gray-200 rounded-lg overflow-hidden w-[400px] h-[500px] mx-auto">
                      <img
                        src="/team-main.jpg"
                        alt="Gannesh Krishna Ettam"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face";
                        }}
                      />
                      <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full opacity-70"></div>
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-lg font-medium text-gray-800">Gannesh Krishna Ettam</p>
                      <p className="text-sm text-gray-600">Founder & CEO</p>
                    </div>
                  </div>

                  {/* Grid of smaller images */}
                  <div className="grid grid-cols-4 gap-3">
                    {[...Array(8)].map((_, index) => (
                      <div key={index} className="relative">
                        <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square">
                          <img
                            src={`/team-${index + 1}.jpg`}
                            alt="Gannesh Krishna Ettam"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `https://images.unsplash.com/photo-150700321116${index % 10}-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face`;
                            }}
                          />
                          <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-70"></div>
                        </div>
                        <div className="text-center mt-2">
                          <p className="text-xs font-medium text-gray-800">Gannesh Krishna Ettam</p>
                          <p className="text-xs text-gray-600">Founder & CEO</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Contact Section */}
          <section className="min-h-screen flex items-center justify-center bg-white pl-[180px] py-20">
            <motion.div
              className="w-full max-w-7xl px-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              style={{
                opacity: contactOpacity,
                y: contactY,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side - Large Text */}
                <div className="space-y-6">
                  <h2 className="text-7xl font-bold text-gray-200 leading-tight">
                    WARM <br />
                    TEA <br />
                    BOLD <br />
                    IDEAS <br />
                    AT <br />
                    <span className="text-[#f97316]">TACT</span>
                  </h2>
                </div>

                {/* Right Side - Contact Form */}
                <div className="space-y-8">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-600 mb-2">MEET UP AT</h3>
                    <p className="text-gray-500 text-sm">Let&#39;s talk over a brew and take your brand further.</p>
                  </div>

                  <form className="space-y-6">
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-2">
                        Your Tactical Name*
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-2">
                        E-Mail*
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-2">
                        We&#39;re listening*
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gray-600 text-white py-3 px-6 font-medium hover:bg-gray-700 transition-colors duration-300"
                    >
                      Ready to Roll
                    </button>
                  </form>

                  <div className="text-left text-sm text-gray-500 space-y-1">
                    <p>Kalyan&#39;s Anshita Pride,</p>
                    <p>Beside City Union Bank,</p>
                    <p>Manikonda, Hyderabad,</p>
                    <p>Telangana - 500 089.</p>
                    <br />
                    <p>design.tactadvertising@gmail.com</p>
                    <p>mkt.tactadvertising@gmail.com</p>
                    <br />
                    <p>+91 7731 88 44 77</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      )}
    </div>
  );
};

export default TactLanding;