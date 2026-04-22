import React from "react";
import HeroContainer from "../components/shared/HeroContainer";
import { VacancySkeleton } from "../components/skeleton/HomeSkeleton";
import ErrorMessage from "../components/shared/ErrorMessage";
import bgImg from "../assets/img/scphoto.jpg";
import { useGetVacancyQuery } from "../redux/features/contentSlice";

const Vacancy = () => {
  const { data: vacancyResponse = {}, isLoading, error } = useGetVacancyQuery();
  const vacancies = (vacancyResponse?.data || []).filter(
    (job) => job.status?.toLowerCase() === "open",
  );

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full">
      <HeroContainer
        bgImage={bgImg}
        title="Vacancy"
        subtitle="Join Our Educational Excellence Team"
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-green-600">
            Careers
          </span>
          <h2
            className="mt-2 text-3xl font-bold text-gray-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Current Openings
          </h2>
          <div className="mt-3 w-12 h-0.5 bg-green-600" />
        </div>

        {isLoading && <VacancySkeleton />}
        {error && (
          <ErrorMessage message="Unable to load positions. Please contact HR directly." />
        )}

        {!isLoading && !error && vacancies.length > 0 && (
          <div className="space-y-6">
            {vacancies.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 capitalize">
                    {job.title}
                  </h3>
                  <span className="shrink-0 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                    Open
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  {job.posted_date && (
                    <span>
                      Posted:{" "}
                      <strong className="text-gray-700">
                        {formatDate(job.posted_date)}
                      </strong>
                    </span>
                  )}
                  {job.application_deadline && (
                    <span>
                      Deadline:{" "}
                      <strong className="text-gray-700">
                        {formatDate(job.application_deadline)}
                      </strong>
                    </span>
                  )}
                </div>

                {job.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {job.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && vacancies.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-semibold text-gray-500 mb-1">
              No Open Positions
            </h3>
            <p className="text-sm text-gray-400">
              We don't have any open positions at the moment. Please check back
              later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vacancy;
