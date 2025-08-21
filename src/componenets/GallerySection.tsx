import { motion, MotionValue } from "framer-motion";
import Gallery from "./ImageGallery";

interface GallerySectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

const GallerySection: React.FC<GallerySectionProps> = ({ opacity, y }) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-10 pl-[208px] z-40">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 items-center w-full max-w-7xl gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        style={{ opacity, y }}
      >
        <div className="flex flex-col items-start space-y-6 text-left">
          <p className="text-8xl md:text-7xl font-bold tracking-wide text-gray-200 leading-tight">
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
  );
};

export default GallerySection;