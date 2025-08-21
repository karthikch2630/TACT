import { motion } from "framer-motion";

interface IntroSectionProps {
  showInitialContent: boolean;
}

const IntroSection: React.FC<IntroSectionProps> = ({ showInitialContent }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
  };

  return (
    <>
      <motion.div
        className="fixed left-4 top-0 h-screen flex items-start z-50"
        animate={{
          opacity: showInitialContent ? 1 : 0,
          y: showInitialContent ? 0 : -50,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="ml-[180px] mt-[166px] pt-24 pl-10 mb-8">
          <p className="font-segoe text-2xl font-normal mb-1">Hello!</p>
          <p className="font-segoe text-6xl font-bold mb-5">Tact Advertising</p>
          <p className="font-segoe text-[20px] leading-tight max-w-md mb-6">
            "We specialize in Branding, Brochure Design, Print Media, Website
            Design, Social Media Marketing, 3D Walkthroughs and Motion
            Graphics."
          </p>
          
          <p className="font-segoe text-3xl font-bold mb-2 px-6 py-1 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-white rounded-sm shadow-md inline-block tracking-wide">
            AVAILABLE SOON
          </p>
          <p className="font-segoe text-[18px] max-w-md">
            We are preparing something extraordinary for you!
          </p>
        </div>
      </motion.div>

      {showInitialContent && (
        <motion.div
          className="fixed right-32 top-0 h-screen flex items-center justify-center z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="/Web-01.png"
            alt="Welcome to Tact"
            className="h-[600px] w-[560px] object-contain z-50"
            onError={handleImageError}
          />
          <img
            src="/Web-02.png"
            alt="Circular Tact Advertising"
            className="absolute bottom-20 right-[435px] h-[100px] w-[100px] object-contain animate-spin-slow z-50"
            onError={handleImageError}
          />
        </motion.div>
      )}
    </>
  );
};

export default IntroSection;