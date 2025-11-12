import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Code,
  Palette,
  Database,
  Smartphone,
  TrendingUp,
  Clock,
  Award,
  ArrowRight,
  Users,
} from "lucide-react";

const DigitalSkills = () => {
  const courses = [
    {
      icon: BookOpen,
      title: "Digital Literacy Fundamentals",
      level: "Beginner",
      duration: "4 Weeks",
      description:
        "Master the basics of computers, internet, and essential digital tools for everyday life.",
      topics: [
        "Computer basics and operations",
        "Internet browsing and email",
        "Microsoft Office Suite",
        "Online safety and security",
        "Digital communication tools",
      ],
      color: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Code,
      title: "Web Development Bootcamp",
      level: "Intermediate",
      duration: "12 Weeks",
      description:
        "Learn to build modern websites and web applications from scratch.",
      topics: [
        "HTML5, CSS3, and JavaScript",
        "Responsive web design",
        "React framework",
        "Git and GitHub",
        "Portfolio project development",
      ],
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Palette,
      title: "Digital Content Creation",
      level: "Beginner",
      duration: "6 Weeks",
      description:
        "Create engaging digital content for social media and online platforms.",
      topics: [
        "Graphic design with Canva",
        "Video editing basics",
        "Photography fundamentals",
        "Social media content strategy",
        "Personal branding",
      ],
      color: "from-yellow-500 to-yellow-600",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: Database,
      title: "Data Analytics Essentials",
      level: "Intermediate",
      duration: "8 Weeks",
      description:
        "Analyze and visualize data to make informed business decisions.",
      topics: [
        "Excel data analysis",
        "Data visualization techniques",
        "Introduction to SQL",
        "Statistical analysis basics",
        "Business intelligence tools",
      ],
      color: "from-red-500 to-red-600",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      level: "Advanced",
      duration: "16 Weeks",
      description:
        "Build cross-platform mobile applications for Android and iOS.",
      topics: [
        "React Native fundamentals",
        "Mobile UI/UX design",
        "API integration",
        "App deployment",
        "Mobile app monetization",
      ],
      color: "from-indigo-500 to-indigo-600",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing & E-Commerce",
      level: "Intermediate",
      duration: "8 Weeks",
      description:
        "Launch and grow your online business with digital marketing strategies.",
      topics: [
        "Social media marketing",
        "SEO fundamentals",
        "E-commerce platform setup",
        "Email marketing",
        "Digital advertising basics",
      ],
      color: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const features = [
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Learn at your own pace with online and in-person options",
    },
    {
      icon: Award,
      title: "Certified Courses",
      description: "Earn recognized certifications upon completion",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from experienced industry professionals",
    },
  ];

  return (
    <div>
      <section className="relative bg-gray-900 text-white min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Digital Skills Training
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              Comprehensive courses designed to equip you with in-demand digital
              skills for the modern workplace
            </p>
            
            {/* Sign Up and Login Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                to="/RegisterPage"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Sign Up
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/verify"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Courses?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              Our courses are specifically designed for rural learners,
              combining world-class content with practical, hands-on experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-xl"
                >
                  <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <feature.icon className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Available Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive catalog of digital skills courses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                <div className="p-6">
                  <div
                    className={`${course.iconBg} w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <course.icon className={`h-7 w-7 ${course.iconColor}`} />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {course.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 mb-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full ${course.iconBg} ${course.iconColor} font-semibold`}
                    >
                      {course.level}
                    </span>
                    <span className="text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">
                      What you'll learn:
                    </h4>
                    <ul className="space-y-1">
                      {course.topics.map((topic, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 flex items-start"
                        >
                          <span className="text-green-600 mr-2">✓</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className={`w-full mt-6 bg-gradient-to-r ${course.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center`}
                  >
                    Enroll Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Learning Pathways
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Follow structured learning paths to achieve your career goals
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Career Starter Path
                </h3>
                <p className="text-gray-600 mb-4">
                  Perfect for beginners entering the digital workforce
                </p>
                <ol className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 text-sm">
                      1
                    </span>
                    <span className="text-gray-700">
                      Digital Literacy Fundamentals
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 text-sm">
                      2
                    </span>
                    <span className="text-gray-700">
                      Digital Content Creation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 text-sm">
                      3
                    </span>
                    <span className="text-gray-700">
                      Digital Marketing & E-Commerce
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Developer Path
                </h3>
                <p className="text-gray-600 mb-4">
                  For aspiring software developers and programmers
                </p>
                <ol className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 text-sm">
                      1
                    </span>
                    <span className="text-gray-700">
                      Digital Literacy Fundamentals
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 text-sm">
                      2
                    </span>
                    <span className="text-gray-700">
                      Web Development Bootcamp
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 text-sm">
                      3
                    </span>
                    <span className="text-gray-700">
                      Mobile App Development
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of learners who have transformed their careers
              through our digital skills programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/digital-skills" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center justify-center">
                Browse All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 inline-flex items-center justify-center">
                Contact an Advisor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DigitalSkills;