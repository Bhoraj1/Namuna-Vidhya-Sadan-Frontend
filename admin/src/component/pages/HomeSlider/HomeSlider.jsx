import React, { useState, useEffect } from "react";
import { Trash2, Plus, X, Loader, Eye } from "lucide-react";
import {
  useGetSlidersQuery,
  useCreateSliderMutation,
  useDeleteSliderMutation,
} from "../../redux/feature/siteslice";
import ConfirmDialog from "../../shared/ConfirmDialog";
import ErrorToast from "../../shared/ErrorToast";

const BASE_URL = "https://api.namunavidhyasadan.com/";

const HomeSlider = () => {
  const { data: slidersData, isLoading, refetch } = useGetSlidersQuery();
  const [createSlider] = useCreateSliderMutation();
  const [deleteSlider] = useDeleteSliderMutation();

  const [sliders, setSliders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewImageModal, setViewImageModal] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    images: [],
  });

  useEffect(() => {
    if (slidersData?.data) {
      setSliders(slidersData.data);
    }
  }, [slidersData]);

  const handleOpenModal = () => {
    setFormData({
      title: "",
      images: [],
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", images: [] });
  };

  const handleViewImage = (slider) => {
    setViewImageUrl(`${BASE_URL}${slider.image_url}`);
    setViewImageModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (!formData.title.trim()) {
        setErrorMessage("Title is required");
        setIsSubmitting(false);
        return;
      }

      if (!formData.images.length) {
        setErrorMessage("Please upload at least one image");
        setIsSubmitting(false);
        return;
      }

      // Use FormData for file uploads - match backend expectations
      const data = new FormData();
      // Send the same title for all images
      const titles = new Array(formData.images.length).fill(
        formData.title.trim(),
      );
      data.append("titles", JSON.stringify(titles));
      formData.images.forEach((image) => {
        data.append("images", image);
      });

      await createSlider(data).unwrap();
      setSuccessMessage("Slider created successfully!");

      refetch();
      handleCloseModal();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(
        error?.data?.message || "Failed to save slider. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSlider(deleteId).unwrap();
      setSuccessMessage("Slider deleted successfully!");
      refetch();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(
        error?.data?.message || "Failed to delete slider. Please try again.",
      );
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Home Sliders</h1>
            <p className="text-gray-600 mt-1">Manage your home page sliders</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            <Plus className="w-5 h-5" />
            Add Slider
          </button>
        </div>

        {/* Error and Success Messages */}
        {errorMessage && (
          <ErrorToast
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        )}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Sliders Table */}
        {sliders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">
              No sliders found. Add one to get started!
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    S.N.
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sliders.map((slider, index) => (
                  <tr
                    key={slider.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {slider.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(slider.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleViewImage(slider)}
                          className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded font-medium transition text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteClick(slider.id)}
                          className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded font-medium transition text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">
                Add New Slider
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter slider title"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Select one or more images. PNG, JPG up to 2MB each.
                </p>
                {formData.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {formData.images.map((file) => (
                      <div
                        key={`${file.name}-${file.lastModified}`}
                        className="overflow-hidden rounded-lg border border-gray-200"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="h-24 w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition disabled:bg-blue-400 flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image View Modal */}
      {viewImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-2">
          <div className="relative w-full max-w-6xl max-h-full overflow-hidden rounded-2xl bg-transparent shadow-xl">
            <button
              onClick={() => setViewImageModal(false)}
              className="absolute top-3 right-3 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={viewImageUrl}
              alt="Slider Image"
              className="w-full h-full max-h-[calc(100vh-2rem)] object-contain rounded-2xl"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x600?text=Image+Not+Found";
              }}
            />
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Slider"
        message="Are you sure you want to delete this slider? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        onClose={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
      />
    </div>
  );
};

export default HomeSlider;
