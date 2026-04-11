import { FaAward, FaUsers, FaBook, FaGraduationCap } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaBook className="text-4xl" />,
      title: "Quality Education",
      description:
        "Comprehensive curriculum designed to develop critical thinking and problem-solving skills.",
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Expert Faculty",
      description:
        "Experienced and dedicated teachers committed to student success and growth.",
    },
    {
      icon: <FaAward className="text-4xl" />,
      title: "Excellence",
      description:
        "Consistently achieving high academic standards and student achievements.",
    },
    {
      icon: <FaGraduationCap className="text-4xl" />,
      title: "Career Ready",
      description:
        "Preparing students for higher education and successful careers.",
    },
  ];

  return (
    <div>
      {" "}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-third-color">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 text-center"
              >
                <div className="text-secondary-color mb-4 flex justify-center p-4 bg-secondary-color/10 rounded-full w-fit mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
