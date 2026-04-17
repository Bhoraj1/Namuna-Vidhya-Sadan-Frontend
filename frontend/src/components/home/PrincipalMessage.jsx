import principle_photo from "../../assets/img/principle_image.jpg";
import { principleData } from "../../data/principledata";

const PrincipalMessage = () => {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image — left */}
          <div className="relative">
            {/* Decorative bg block */}
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-secondary-color/10 rounded-2xl -z-10" />
            <img
              src={principle_photo}
              alt="Principal"
              className="w-full h-[420px] object-cover object-top rounded-2xl shadow-lg"
            />
            {/* Name badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 shadow-md">
              <p className="text-sm font-bold text-gray-800">
                {principleData.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {principleData.title}
              </p>
            </div>
          </div>

          {/* Content — right */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-green-600">
              Leadership
            </span>
            <h2
              className="mt-2 text-3xl lg:text-4xl font-bold text-gray-800 leading-snug mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Message from the{" "}
              <span className="text-third-color">Principal</span>
            </h2>
            <div className="w-12 h-0.5 bg-green-600 mb-6" />

            {/* Quote mark */}
            <div className="text-6xl text-secondary-color/30 font-serif leading-none mb-2">
              "
            </div>

            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {principleData.message}
            </p>

            <blockquote className="border-l-4 border-secondary-color pl-4 text-gray-500 italic text-sm leading-relaxed">
              "{principleData.quote}"
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;
