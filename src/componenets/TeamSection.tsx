import { motion, MotionValue } from "framer-motion";

interface TeamSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

const TeamSection: React.FC<TeamSectionProps> = ({ opacity, y }) => {
  // Array of unique fallback images for each team member
  const fallbackImages = [
    "https://res.cloudinary.com/diqux3y0a/image/upload/v1753703594/Gannesh_2_cijnix.jpg", // Main picture
    "https://res.cloudinary.com/diqux3y0a/image/upload/v1753703594/Gannesh_2_cijnix.jpg", // Team 1
    "https://res.cloudinary.com/diqux3y0a/image/upload/v1753703594/Gannesh_2_cijnix.jpg", // Team 2
    "https://res.cloudinary.com/diqux3y0a/image/upload/v1753703594/Gannesh_2_cijnix.jpg", // Team 3
    "https://res.cloudinary.com/diqux3y0a/image/upload/v1753703594/Gannesh_2_cijnix.jpg", // Team 4
    "https://res.cloudinary.com/diqux3y0a/image/upload/v1753703594/Gannesh_2_cijnix.jpg", // Team 5
    "https://res.cloudinary.com/diqux3y0a/image/upload/v1753703594/Gannesh_2_cijnix.jpg", // Team 6
    "https://res.cloudinary.com/diqux3y0a/image/upload/v1753703594/Gannesh_2_cijnix.jpg", // Team 7
    "https://res.cloudinary.com/diqux3y0a/image/upload/v1753703594/Gannesh_2_cijnix.jpg", // Team 8
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const index = parseInt(e.currentTarget.alt.slice(-1)) - 1 || 0;
    e.currentTarget.src = fallbackImages[index % fallbackImages.length] || fallbackImages[0];
    e.currentTarget.className.includes("w-full")
      ? `${e.currentTarget.src}?w=400&h=500&fit=crop&crop=face&brightness=75`
      : `${e.currentTarget.src}?w=200&h=200&fit=crop&crop=face&brightness=75`;
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white pl-[180px] py-20">
      <motion.div
        className="w-full max-w-7xl px-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: opacity, y: y }} // Sync with MotionValue props
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ opacity, y }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <h2 className="text-8xl font-bold text-gray-200 leading-[0.85] -ml-10">
              THE <br />
              TEAM <br />
              <span className="text-[#f97316]">TACT</span>
            </h2>
          </div>
          {/* Middle Column - Main Picture */}
          <div className="relative">
            <div className="mb-8">
              <div className="relative bg-white rounded-lg overflow-hidden w-[400px] h-[500px] -ml-28">
                <motion.img
                  src="/team-main.jpg"
                  alt="Gannesh Krishna Ettam 1"
                  className="w-full h-full object-cover brightness-125"
                  onError={handleImageError}
                  style={{ opacity: 1 }} // Ensure full opacity for images
                />
                <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="text-center mt-4 -ml-36">
                <p className="text-lg font-medium text-gray-800">
                  Gannesh Krishna Ettam
                </p>
                <p className="text-sm text-gray-600">Founder & CEO</p>
              </div>
            </div>
          </div>
          {/* Right Column - Small Pictures */}
          <div className="grid grid-cols-4 grid-rows-2 gap-4 -ml-20">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg overflow-hidden aspect-square">
                  <motion.img
                    src={`/team-${index + 1}.jpg`}
                    alt={`Gannesh Krishna Ettam ${index + 2}`}
                    className="w-full h-full object-cover brightness-125"
                    onError={handleImageError}
                    style={{ opacity: 1 }} // Ensure full opacity for images
                  />
                  <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="text-center mt-2">
                  <p className="text-xs font-medium text-gray-800">
                    Gannesh Krishna Ettam
                  </p>
                  <p className="text-xs text-gray-600">Founder & CEO</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TeamSection;