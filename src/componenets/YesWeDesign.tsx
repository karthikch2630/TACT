import { motion, MotionValue } from "framer-motion";

interface YesWeDesignSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

const YesWeDesignSection: React.FC<YesWeDesignSectionProps> = ({ opacity, y }) => {
  return (
    <section className="h-screen flex items-center justify-end bg-white pr-36 pl-[180px] my-10">
      <motion.p
        className="text-8xl font-segoe font-bold tracking-wide text-[#f97316]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        style={{ opacity, y }}
      >
        "YES" <br />
        WE DESIGN <br />
        YOUR <br />
        THOUGHTS.
      </motion.p>
    </section>
  );
};

export default YesWeDesignSection;