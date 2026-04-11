import Button from "../ButtonComponent.jsx";

const GalleryModal = ({ photos, currentIndex, onClose, onNext, onPrev }) => {
  if (!photos.length) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      {/* Close Button */}
      <Button
        onClick={onClose}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full z-30"
        icon={
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        }
      />

      {/* Photo Counter */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-black/50 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm z-10">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Main Photo */}
      <div className="relative max-w-5xl max-h-full mx-2 sm:mx-4">
        <img
          src={photos[currentIndex]}
          alt="Gallery photo"
          className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain rounded-lg"
        />
      </div>

      {/* Navigation Buttons */}
      {photos.length > 1 && (
        <>
          <Button
            onClick={onPrev}
            className="absolute top-1/2 left-1 sm:left-6 -translate-y-1/2 bg-black/70 hover:bg-black/80 text-white p-2 sm:p-4 rounded-full z-30 shadow-lg"
            icon={
              <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            }
          />
          <Button
            onClick={onNext}
            className="absolute top-1/2 right-1 sm:right-6 -translate-y-1/2 bg-black/70 hover:bg-black/80 text-white p-2 sm:p-4 rounded-full z-30 shadow-lg"
            icon={
              <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            }
          />
        </>
      )}
    </div>
  );
};

export default GalleryModal;
