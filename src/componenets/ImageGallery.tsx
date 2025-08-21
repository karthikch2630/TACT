import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const logosImages = [
  { src: "/gallery/SRK_Logo_Presentation10.jpg", alt: "Logo 1" },
  { src: "/gallery/SRK_Logo_Presentation12.jpg", alt: "Logo 2" },
  { src: "/gallery/SRK_Logo_Presentation16.jpg", alt: "Logo 3" },
];

const brochuresImages = [
  { src: "/gallery/SRK_Logo_Presentation20.jpg", alt: "Brochure 1" },
  { src: "/gallery/SRK_Logo_Presentation4.jpg", alt: "Brochure 2" },
];

const visitingCardsImages = [
  { src: "/gallery/SRK_Logo_Presentation8.jpg", alt: "Visiting Card 1" },
  { src: "/gallery/SRK_Logo_Presentation6.jpg", alt: "Visiting Card 2" },
];

const printMediaImages = [
  { src: "/gallery/SRK_Logo_Presentation16.jpg", alt: "Print Media 1" },
];

const websiteDesignImages = [
  { src: "/gallery/SRK_Logo_Presentation4.jpg", alt: "Website Design 1" },
];

const socialMediaMarketingImages = [
  { src: "/gallery/SRK_Logo_Presentation10.jpg", alt: "Social Media 1" },
];

const walkthroughsImages = [
  { src: "/gallery/SRK_Logo_Presentation12.jpg", alt: "Walkthrough 1" },
];

const motionGraphicsImages = [
  { src: "/gallery/SRK_Logo_Presentation16.jpg", alt: "Motion Graphics 1" },
];

const postersImages = [
  { src: "/gallery/SRK_Logo_Presentation4.jpg", alt: "Poster 1" },
];

const categories = [
  { name: "Logos", thumbnail: logosImages[0].src, images: logosImages },
  { name: "Brochures", thumbnail: brochuresImages[0].src, images: brochuresImages },
  { name: "Visiting Cards", thumbnail: visitingCardsImages[0].src, images: visitingCardsImages },
  { name: "Print Media", thumbnail: printMediaImages[0].src, images: printMediaImages },
  { name: "Website Design", thumbnail: websiteDesignImages[0].src, images: websiteDesignImages },
  { name: "Social Media Marketing", thumbnail: socialMediaMarketingImages[0].src, images: socialMediaMarketingImages },
  { name: "3D Walkthroughs", thumbnail: walkthroughsImages[0].src, images: walkthroughsImages },
  { name: "Motion Graphics", thumbnail: motionGraphicsImages[0].src, images: motionGraphicsImages },
  { name: "Posters", thumbnail: postersImages[0].src, images: postersImages },
];

const fallbackImage = "https://via.placeholder.com/300x300?text=Image+Not+Found";

export default function Gallery() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleCategoryClick = (index: number) => {
    setSelectedCategoryIndex(index);
    setSelectedImageIndex(0);
  };

  const handlePrev = () => {
    if (selectedCategoryIndex !== null) {
      const categoryImages = categories[selectedCategoryIndex].images;
      setSelectedImageIndex((prev) => (prev - 1 + categoryImages.length) % categoryImages.length);
    }
  };

  const handleNext = () => {
    if (selectedCategoryIndex !== null) {
      const categoryImages = categories[selectedCategoryIndex].images;
      setSelectedImageIndex((prev) => (prev + 1) % categoryImages.length);
    }
  };

  const handleClose = () => {
    setSelectedCategoryIndex(null);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image: ${e.currentTarget.src}`);
    e.currentTarget.src = fallbackImage;
  };

  return (
    <div className="w-[850px] h-[530px] -ml-52 mr-10 relative">
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            className="overflow-hidden shadow-md cursor-pointer bg-white w-full h-full hover:z-50 relative"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0)" }}
            onClick={() => handleCategoryClick(index)}
          >
            <img
              src={category.thumbnail}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
              {category.name}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCategoryIndex !== null && (
          <motion.div
            className="absolute top-0 left-0 w-[850px] h-[530px] bg-black bg-opacity-90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-5 right-5 text-white hover:text-gray-300"
              onClick={handleClose}
            >
              <X size={32} />
            </button>
            <button
              className="absolute left-5 text-white hover:text-gray-300"
              onClick={handlePrev}
            >
              <ChevronLeft size={40} />
            </button>
            <motion.img
              key={categories[selectedCategoryIndex].images[selectedImageIndex].src}
              src={categories[selectedCategoryIndex].images[selectedImageIndex].src}
              alt={categories[selectedCategoryIndex].images[selectedImageIndex].alt}
              className="max-h-[90%] max-w-[90%] object-contain rounded-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              onError={handleImageError}
            />
            <button
              className="absolute right-5 text-white hover:text-gray-300"
              onClick={handleNext}
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}