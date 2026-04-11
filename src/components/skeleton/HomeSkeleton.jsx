export const HomeSkeleton = () => (
  <div className="relative h-[85vh] min-h-[520px] overflow-hidden bg-slate-800 animate-pulse">
    {/* Simulated gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-slate-700/80 via-slate-700/40 to-slate-700/20" />
    {/* Left-aligned content skeleton */}
    <div className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-24">
      <div className="max-w-2xl w-full space-y-5">
        {/* School name tag */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-slate-500" />
          <div className="h-3 w-32 bg-slate-600 rounded" />
        </div>
        {/* Title */}
        <div className="space-y-3">
          <div className="h-10 w-3/4 bg-slate-600 rounded" />
          <div className="h-10 w-1/2 bg-slate-600 rounded" />
        </div>
        {/* Subtitle */}
        <div className="space-y-2">
          <div className="h-4 w-full max-w-md bg-slate-600 rounded" />
          <div className="h-4 w-2/3 bg-slate-600 rounded" />
        </div>
        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <div className="h-12 w-36 bg-yellow-600/40 rounded" />
          <div className="h-12 w-36 border border-slate-500 rounded" />
        </div>
      </div>
    </div>
    {/* Vertical dots — right side */}
    <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
      {[0,1,2,3].map((i) => (
        <div key={i} className={`rounded-full bg-slate-600 ${i === 0 ? "w-1.5 h-6" : "w-1.5 h-1.5"}`} />
      ))}
    </div>
  </div>
);

// Gallery Skeleton
export const GallerySkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="h-96 bg-gray-200 animate-pulse relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-48 bg-gray-300 animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-64 bg-gray-300 animate-pulse rounded mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Category Filter Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-300 animate-pulse rounded-full"></div>
          ))}
        </div>

        {/* Gallery Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-64 bg-gray-300"></div>
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Notice Skeleton
export const NoticeSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="h-96 bg-gray-200 animate-pulse relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-48 bg-gray-300 animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-64 bg-gray-300 animate-pulse rounded mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Category Filter Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-28 bg-gray-300 animate-pulse rounded-full"></div>
          ))}
        </div>

        {/* Notice Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-8 w-20 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Team Skeleton
export const TeamSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="h-96 bg-gray-200 animate-pulse relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-48 bg-gray-300 animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-64 bg-gray-300 animate-pulse rounded mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Category Filter Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-32 bg-gray-300 animate-pulse rounded-full"></div>
          ))}
        </div>

        {/* Team Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 text-center animate-pulse">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <div className="h-6 w-3/4 bg-gray-300 rounded mx-auto mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded mx-auto mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-300 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Blog Skeleton
export const BlogSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="h-96 bg-gray-200 animate-pulse relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-48 bg-gray-300 animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-64 bg-gray-300 animate-pulse rounded mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Category Filter Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-28 bg-gray-300 animate-pulse rounded-full"></div>
          ))}
        </div>

        {/* Blog Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                <div className="h-6 w-full bg-gray-300 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-300 rounded"></div>
                  <div className="h-4 w-full bg-gray-300 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Question Bank Skeleton
export const QuestionBankSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="h-96 bg-gray-200 animate-pulse relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-48 bg-gray-300 animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-64 bg-gray-300 animate-pulse rounded mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Search and Filter Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="h-12 flex-1 bg-gray-300 animate-pulse rounded-lg"></div>
          <div className="h-12 w-32 bg-gray-300 animate-pulse rounded-lg"></div>
          <div className="h-12 w-32 bg-gray-300 animate-pulse rounded-lg"></div>
        </div>

        {/* Question Bank Cards Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-10 w-24 bg-gray-300 rounded"></div>
                  <div className="h-10 w-24 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Vacancy Skeleton
export const VacancySkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="h-96 bg-gray-200 animate-pulse relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-48 bg-gray-300 animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-64 bg-gray-300 animate-pulse rounded mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Vacancy Cards Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-10 w-32 bg-gray-300 rounded mt-4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Contact Skeleton
export const ContactSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="h-96 bg-gray-200 animate-pulse relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-48 bg-gray-300 animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-64 bg-gray-300 animate-pulse rounded mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Contact Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="h-12 w-64 bg-gray-300 animate-pulse rounded mx-auto"></div>
          <div className="h-6 w-96 bg-gray-300 animate-pulse rounded mx-auto"></div>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-8 text-center animate-pulse">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <div className="h-6 w-3/4 bg-gray-300 rounded mx-auto mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded mx-auto"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <div className="h-8 w-48 bg-gray-300 animate-pulse rounded mx-auto mb-6"></div>
          <div className="h-96 bg-gray-300 animate-pulse rounded-lg"></div>
        </div>

        {/* Office Hours & Department Info */}
        <div className="grid lg:grid-cols-2 gap-12">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-8 animate-pulse">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-gray-300 rounded"></div>
                  <div className="h-4 w-48 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Academic Skeleton
export const AcademicSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="h-96 bg-gray-200 animate-pulse relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-48 bg-gray-300 animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-64 bg-gray-300 animate-pulse rounded mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Academic Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="w-16 h-16 bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              </div>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center animate-pulse">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <div className="h-5 w-3/4 bg-gray-300 rounded mx-auto mb-2"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// About Skeleton
export const AboutSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="h-96 bg-gray-200 animate-pulse relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-48 bg-gray-300 animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-64 bg-gray-300 animate-pulse rounded mx-auto"></div>
          </div>
        </div>
      </div>

      {/* About Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="h-8 w-3/4 bg-gray-300 animate-pulse rounded"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            </div>
            <div className="h-12 w-40 bg-gray-300 animate-pulse rounded"></div>
          </div>
          <div className="h-80 bg-gray-300 animate-pulse rounded-lg"></div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center animate-pulse">
              <div className="h-12 w-20 bg-gray-300 rounded mx-auto mb-2"></div>
              <div className="h-4 w-16 bg-gray-300 rounded mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Mission/Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-8 animate-pulse">
              <div className="w-16 h-16 bg-gray-300 rounded-lg mb-6"></div>
              <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
// FAQ Skeleton
export const FAQSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="h-96 bg-gray-200 animate-pulse relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-64 bg-gray-300 animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-80 bg-gray-300 animate-pulse rounded mx-auto"></div>
          </div>
        </div>
      </div>

      {/* FAQ Content Skeleton */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="h-12 w-96 bg-gray-300 animate-pulse rounded mx-auto mb-12"></div>
        
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-5 w-5 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Events Skeleton
export const EventsSkeleton = () => (
  <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 md:py-10">
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
          <div className="h-40 sm:h-44 md:h-48 bg-gray-300" />
          <div className="p-4 sm:p-5 space-y-2">
            <div className="h-5 w-3/4 bg-gray-300 rounded" />
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// LatestEvents Skeleton (inline section)
export const LatestEventsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden animate-pulse">
        <div className="h-40 sm:h-44 md:h-48 bg-gray-300" />
        <div className="p-4 sm:p-5 space-y-2">
          <div className="h-5 w-3/4 bg-gray-300 rounded" />
          <div className="h-4 w-1/2 bg-gray-300 rounded" />
        </div>
      </div>
    ))}
  </div>
);
