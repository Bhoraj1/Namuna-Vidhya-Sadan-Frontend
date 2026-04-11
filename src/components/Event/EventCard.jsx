export const EventCard = ({ event }) => {
  const imgurl = import.meta.env.VITE_IMG_URL;

  // Use image_url if available, else pdf_url, else fallback
  const fallback = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=300&fit=crop&auto=format&q=80";
  const imageSrc = event.image_url
    ? `${imgurl}/${event.image_url}`
    : event.pdf_url
    ? `${imgurl}/${event.pdf_url}`
    : fallback;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallback;
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Category badge on image */}
        {event.category && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
            {event.category}
          </span>
        )}

        {/* Date on image bottom */}
        <p className="absolute bottom-3 left-3 text-white text-xs flex items-center gap-1">
          📅 {new Date(event.event_date).toDateString()}
        </p>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h2 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {event.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  );
};
