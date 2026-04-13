import { useGetFaqsQuery } from "../../redux/features/SiteSlice";
import { BsCheckLg } from "react-icons/bs";
import { FAQSkeleton } from "../skeleton/HomeSkeleton";

const Faqs = () => {
  const { data: faqData, isLoading, error } = useGetFaqsQuery();

  if (isLoading) return <FAQSkeleton />;
  if (error)
    return (
      <div className="text-center py-10 text-red-500 text-sm">
        Error fetching FAQs!
      </div>
    );
  if (!faqData?.data || faqData.data.length === 0)
    return (
      <div className="text-center py-10 text-gray-400 text-sm">
        No FAQs available.
      </div>
    );

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="sm:text-3xl text-2xl font-semibold text-blue-700 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqData.data.map((faq) => (
            <div key={faq.id} className="flex items-start">
              <div className="flex-shrink-0">
                <BsCheckLg className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-slate-900">
                  {faq.question}
                </h3>
                <p className="text-[15px] text-slate-600 mt-4 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
