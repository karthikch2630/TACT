import { motion, MotionValue } from "framer-motion";

interface SidebarProps {
  currentSection: number;
  initialAnimationComplete: boolean;
  logoY: MotionValue<number>;
  logoX: MotionValue<number>;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  initialAnimationComplete,
  logoY,
  logoX,
}) => {
  const tactText = "TACT".split("");
  const advertisingText = "ADVERTISING".split("");

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src =
      "https://via.placeholder.com/300x300?text=Image+Not+Found";
  };

  return (
    <motion.div
      className="fixed left-4 top-8 h-screen flex items-start z-50"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Vertical text */}
      <motion.h1
        className="font-segoe font-bold text-[95px] leading-[90px] [writing-mode:vertical-rl] rotate-180 tracking-wide text-transparent mb-2 pt-2 opacity-[0.5]"
        style={{ WebkitTextStroke: "1px gray" }}
      >
        {tactText.map((letter, index) => (
          <motion.span
            key={`tact-${letter}-${index}`}
            className="inline-block"
            style={{ WebkitTextStroke: "1px gray" }}
            animate={{
              color:
                initialAnimationComplete && index < currentSection
                  ? "#f97316"
                  : "transparent",
              opacity:
                initialAnimationComplete && index < currentSection ? 1 : 0.3,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          >
            {letter}
          </motion.span>
        ))}
        <br />
        {advertisingText.map((letter, index) => (
          <motion.span
            key={`advertising-${letter}-${index}`}
            className="inline-block"
            style={{ WebkitTextStroke: "1px gray", color: "transparent" }}
            animate={{
              opacity:
                initialAnimationComplete && index < currentSection ? 1 : 0.2,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: (tactText.length + index) * 0.15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>

      {/* Logo always bright */}
      <div className="flex flex-col items-start ml-3 mt-[40px] opacity-100">
        <motion.img
          src="/Tact-logo.png"
          alt="Tact Logo"
          className="h-[110px] w-auto object-contain mb-20 relative z-60"
          style={{ y: logoY, x: logoX }}
          animate={{ opacity: 1 }}
          onError={handleImageError}
        />
      </div>
    </motion.div>
  );
};

export default Sidebar;