import React, { useState, useMemo } from "react";
import { useGetEventQuery } from "../redux/features/academicSlice";
import HeroContainer from "../components/shared/HeroContainer";
import { EventCard } from "../components/Event/EventCard";
import { EventsSkeleton } from "../components/skeleton/HomeSkeleton";
import ErrorMessage from "../components/shared/ErrorMessage";
import Pagination from "../components/shared/Pagination";
import bgImg from "../assets/img/student.jpg";

// Number of events per page
const ITEMS_PER_PAGE = 8;

const Events = () => {
  const { data: events, isLoading, error } = useGetEventQuery();
  const [currentPage, setCurrentPage] = useState(1);

  const allEvents = events?.data || [];

  const totalPages = Math.ceil(allEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = useMemo(
    () =>
      allEvents.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [allEvents, currentPage],
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <HeroContainer
        title="Our Events"
        subtitle="Explore our school activities and programs"
        bgImage={bgImg}
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8 md:py-10">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Latest Events
          </h2>
          <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
            Stay updated with our recent programs and activities
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <EventsSkeleton />
        ) : error ? (
          /* Error State */
          <ErrorMessage message="Failed to load events. Please try again." />
        ) : (
          <>
            {/* Events Grid - API + Static combined, 8 per page */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
