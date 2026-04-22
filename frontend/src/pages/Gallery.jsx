import React, { useState, useMemo } from "react";
import GalleryCard from "../components/Gallery/GalleryCard.jsx";
import GalleryModal from "../components/Gallery/GalleryModal.jsx";
import { useGetGalleryQuery } from "../redux/features/contentSlice.js";
import { useGetGalleryCategoryQuery } from "../redux/features/categorySlice.js";
import HeroContainer from "../components/shared/HeroContainer";
import { GallerySkeleton } from "../components/skeleton/HomeSkeleton";
import ErrorMessage from "../components/shared/ErrorMessage";
import bgImg from "../assets/img/bggallery.jpg";
import Button from "../components/ButtonComponent.jsx";
import Pagination from "../components/shared/Pagination.jsx";

const Gallery = () => {
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentGalleryPhotos, setCurrentGalleryPhotos] = useState([]);

  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const {
    data: galleryData,
    isLoading: galleryLoading,
    error: galleryError,
  } = useGetGalleryQuery();
  const { data: categoryData, isLoading: categoryLoading } =
    useGetGalleryCategoryQuery();

  const categories = categoryData?.data || [];
  const allGalleries = galleryData?.data || [];

  // client-side category filter
  const filteredGalleries = useMemo(() => {
    if (selectedCategory === null) return allGalleries;
    return allGalleries.filter(
      (g) => (g.category_id || g.categoryId) === selectedCategory,
    );
  }, [allGalleries, selectedCategory]);

  // client-side pagination
  const totalPages = Math.ceil(filteredGalleries.length / ITEMS_PER_PAGE);
  const paginatedGalleries = filteredGalleries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const openPhotoViewer = (gallery, imageIndex = 0) => {
    const images = gallery.image_url
      .split(",")
      .map((img) => `${IMG_URL}/${img.trim()}`);
    setCurrentGalleryPhotos(images);
    setCurrentPhotoIndex(imageIndex);
    setIsModalOpen(true);
  };

  const nextPhoto = () =>
    setCurrentPhotoIndex((prev) => (prev + 1) % currentGalleryPhotos.length);
  const prevPhoto = () =>
    setCurrentPhotoIndex(
      (prev) =>
        (prev - 1 + currentGalleryPhotos.length) % currentGalleryPhotos.length,
    );

  if (galleryLoading || categoryLoading) {
    return <GallerySkeleton />;
  }

  if (galleryError) return <ErrorMessage message="Failed to load gallery." />;

  return (
    <>
      {/* Hero Section */}
      <HeroContainer
        bgImage={bgImg}
        title="gallery"
        subtitle=""
      ></HeroContainer>

      <section className="min-h-screen ml-8 mr-6 bg-linear-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8 md:py-12">
          {/* Filter Controls */}
          <div className="mb-6 sm:mb-8 md:mb-12">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-1 sm:px-2">
              <Button
                onClick={() => handleCategoryChange(null)}
                disabled={selectedCategory === null}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base ${
                  selectedCategory === null
                    ? "bg-third-color text-white shadow-lg transform scale-105 opacity-100 cursor-default"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-third-color"
                }`}
              >
                All Categories
              </Button>
              {categories.map((category) => {
                const categoryId =
                  category.id || category._id || category.category_id;
                const categoryName = category.category_name || category.name;
                const isActive = selectedCategory === categoryId;

                return (
                  <Button
                    key={categoryId || `category-${categoryName}`}
                    onClick={() => handleCategoryChange(categoryId)}
                    disabled={isActive}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base ${
                      isActive
                        ? "bg-third-color text-white shadow-md cursor-default"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-third-color"
                    }`}
                  >
                    {categoryName}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-sm sm:text-base text-gray-600">
              Showing{" "}
              <span className="font-semibold text-third-color">
                {filteredGalleries.length}
              </span>
              {filteredGalleries.length === 1 ? " item" : " items"}
              {selectedCategory !== null && (
                <span>
                  {" "}
                  in{" "}
                  <span className="font-semibold text-third-color">
                    {categories.find(
                      (cat) =>
                        (cat.id || cat._id || cat.category_id) ===
                        selectedCategory,
                    )?.category_name ||
                      categories.find(
                        (cat) =>
                          (cat.id || cat._id || cat.category_id) ===
                          selectedCategory,
                      )?.name}
                  </span>
                </span>
              )}
            </p>
          </div>

          {/* Gallery Grid */}
          {paginatedGalleries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {paginatedGalleries.map((gallery, index) => {
                const categoryName =
                  categories.find(
                    (cat) =>
                      (cat.id || cat._id || cat.category_id) ===
                      gallery.category_id,
                  )?.category_name ||
                  categories.find(
                    (cat) =>
                      (cat.id || cat._id || cat.category_id) ===
                      gallery.category_id,
                  )?.name ||
                  gallery.category;
                return (
                  <div
                    key={gallery.id}
                    className="transform transition-all duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <GalleryCard
                      gallery={{ ...gallery, category: categoryName }}
                      baseUrl={IMG_URL}
                      onImageClick={(imageIndex) =>
                        openPhotoViewer(gallery, imageIndex)
                      }
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-20 px-4">
              <div className="text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
                No items found
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto">
                Try adjusting your filter criteria
              </p>
              <Button
                onClick={() => handleCategoryChange(null)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-third-color text-white rounded-full font-medium hover:shadow-lg text-sm sm:text-base"
              >
                Show All
              </Button>
            </div>
          )}
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </section>

      {/* Photo Viewer Modal */}
      {isModalOpen && (
        <GalleryModal
          photos={currentGalleryPhotos}
          currentIndex={currentPhotoIndex}
          onClose={() => setIsModalOpen(false)}
          onNext={nextPhoto}
          onPrev={prevPhoto}
        />
      )}
    </>
  );
};

export default Gallery;
