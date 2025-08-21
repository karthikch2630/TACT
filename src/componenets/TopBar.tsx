
import { motion, MotionValue } from "framer-motion";

interface SidebarProps {
  initialAnimationComplete: boolean;
  logoY: MotionValue<number>;
  logoX: MotionValue<number>;
}

const TopBar: React.FC<SidebarProps> = ({
  initialAnimationComplete,
  logoY,
  logoX,
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
  };

  return (
    <motion.div
      className="fixed top-0 left-28 w-full h-[110px] bg-white flex items-center justify-start z-40 "
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.img
        src="/Tact-logo.png"
        alt="Tact Logo"
        className="h-[60px] w-auto object-contain ml-4 relative z-50"
        style={{ y: logoY, x: logoX }}
        animate={{ opacity: initialAnimationComplete ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onError={handleImageError}
      />
    </motion.div>
  );
};

export default TopBar;
