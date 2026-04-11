import React from "react";
import {
  FaGraduationCap,
  FaBook,
  FaUsers,
  FaCertificate,
} from "react-icons/fa";

const AcademicPrograms = () => {
  const programs = [
    {
      id: 1,
      title: "Primary Education",
      description:
        "Foundation learning for grades 1-5 with focus on basic literacy, numeracy, and social skills development.",
      icon: FaBook,
      grades: "Grade 1-5",
      subjects: [
        "English",
        "Mathematics",
        "Science",
        "Social Studies",
        "Nepali",
      ],
    },
    {
      id: 2,
      title: "Secondary Education",
      description:
        "Comprehensive education for grades 6-10 preparing students for higher secondary level.",
      icon: FaGraduationCap,
      grades: "Grade 6-10",
      subjects: [
        "Core Subjects",
        "Optional Mathematics",
        "Computer Science",
        "Arts",
      ],
    },
    {
      id: 3,
      title: "Higher Secondary",
      description:
        "Advanced level education with specialization in Science, Management, and Humanities streams.",
      icon: FaCertificate,
      grades: "Grade 11-12",
      subjects: ["Science Stream", "Management Stream", "Humanities Stream"],
    },
    {
      id: 4,
      title: "Co-Curricular Activities",
      description:
        "Holistic development through sports, arts, music, and various co-curricular activities.",
      icon: FaUsers,
      grades: "All Grades",
      subjects: ["Sports", "Music", "Arts", "Drama", "Debate", "Science Club"],
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-third-color mb-4">
            Academic Programs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive educational programs designed to nurture academic
            excellence and holistic development
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => {
            const IconComponent = program.icon;
            return (
              <div
                key={program.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 bg-third-color rounded-lg flex items-center justify-center">
                    <IconComponent className="text-white text-xl" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {program.title}
                    </h3>
                    <span className="bg-secondary-color/10 text-secondary-color text-sm font-medium px-2 py-1 rounded">
                      {program.grades}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Subjects */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Key Areas:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {program.subjects.slice(0, 3).map((subject, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {subject}
                        </span>
                      ))}
                      {program.subjects.length > 3 && (
                        <span className="text-sm text-gray-500">
                          +{program.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AcademicPrograms;
