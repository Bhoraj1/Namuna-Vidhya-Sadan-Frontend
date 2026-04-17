import { FaTrophy, FaUserGraduate, FaFlask, FaBookOpen, FaChalkboardTeacher, FaMedal } from "react-icons/fa";
import assembly from "../../assets/img/assembly.jpg";
import ground from "../../assets/img/ground.jpg";
import library from "../../assets/img/library.webp";
import computerlab from "../../assets/img/computerlab.webp";

const highlights = [
  {
    icon: FaUserGraduate,
    stat: "1200+",
    label: "Students Enrolled",
    color: "text-third-color",
    bg: "bg-blue-50",
  },
  {
    icon: FaChalkboardTeacher,
    stat: "60+",
    label: "Qualified Teachers",
    color: "text-secondary-color",
    bg: "bg-green-50",
  },
  {
    icon: FaTrophy,
    stat: "15+",
    label: "Years of Excellence",
    color: "text-primary-color",
    bg: "bg-yellow-50",
  },
  {
    icon: FaMedal,
    stat: "98%",
    label: "Pass Rate",
    color: "text-third-color",
    bg: "bg-blue-50",
  },
  {
    icon: FaFlask,
    stat: "5+",
    label: "Modern Labs",
    color: "text-secondary-color",
    bg: "bg-green-50",
  },
  {
    icon: FaBookOpen,
    stat: "10K+",
    label: "Library Books",
    color: "text-primary-color",
    bg: "bg-yellow-50",
  },
];

const facilityImages = [
  { src: assembly, label: "Assembly Hall" },
  { src: ground, label: "Sports Ground" },
  { src: library, label: "Library" },
  { src: computerlab, label: "Computer Lab" },
];

const AcademicHighlights = () => {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary-color">
            Our Achievements
          </span>
          <h2
            className="mt-2 text-3xl lg:text-4xl font-bold text-gray-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Academic <span className="text-third-color">Highlights</span>
          </h2>
          <div className="mt-3 w-12 h-0.5 bg-secondary-color mx-auto" />
          <p className="mt-4 text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            Namuna Vidhya Sadan has consistently delivered excellence in education,
            producing outstanding results and nurturing well-rounded individuals.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {highlights.map((item, i) => (
            <div
              key={i}
              className={`${item.bg} rounded-xl p-5 flex flex-col items-center text-center group hover:shadow-md transition-shadow duration-300`}
            >
              <item.icon className={`w-7 h-7 ${item.color} mb-3`} />
              <span className={`text-2xl font-bold ${item.color}`}>{item.stat}</span>
              <span className="text-xs text-gray-500 mt-1 leading-tight">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Facility Images */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {facilityImages.map((img, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl group h-44 sm:h-52">
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-sm font-semibold">
                {img.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AcademicHighlights;
