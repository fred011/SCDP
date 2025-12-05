import { motion } from "framer-motion";
import { BookOpen, Lightbulb, Wifi, Users } from "lucide-react";

const Framework = () => {
  const pillars = [
    {
      icon: BookOpen,
      title: "Education",
      description:
        "Comprehensive digital literacy and skills training programs designed for rural contexts",
      color: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      details: [
        "Digital literacy courses for all ages",
        "Technical skills training in coding, web design, and IT",
        "Certification programs aligned with industry standards",
        "Mentorship and continuous learning support",
      ],
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Fostering creative problem-solving and technological solutions within communities",
      color: "from-yellow-500 to-yellow-600",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      details: [
        "Innovation hubs in rural areas",
        "Hackathons and coding competitions",
        "Agri-tech and local business solutions",
        "Entrepreneurship incubation programs",
      ],
    },
    {
      icon: Wifi,
      title: "Access",
      description:
        "Ensuring equitable access to technology infrastructure and digital resources",
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      details: [
        "Community technology centers",
        "Device lending programs",
        "Internet connectivity initiatives",
        "Free educational resources and platforms",
      ],
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Building partnerships between communities, government, and private sector",
      color: "from-red-500 to-red-600",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      details: [
        "Public-private partnerships",
        "Community engagement programs",
        "Strategic stakeholder alliances",
        "Knowledge sharing networks",
      ],
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
              <span
                style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800 }}
              >
                <span className="text-green-600">S</span>
                <span className="text-yellow-500">C</span>
                <span className="text-red-500">D</span>
                <span className="text-blue-600">P</span>
              </span>{" "}
              Strategic Framework
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto px-4">
              Four foundational pillars driving sustainable community
              development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 px-2">
              Building Tomorrow's Digital Communities
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Our strategic framework is built on four interconnected pillars
              that work together to create lasting impact and sustainable
              development in rural communities across South Africa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className={`h-2 bg-gradient-to-r ${pillar.color}`}></div>
                <div className="p-6 sm:p-8">
                  <div
                    className={`${pillar.iconBg} w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6`}
                  >
                    <pillar.icon
                      className={`h-7 w-7 sm:h-8 sm:w-8 ${pillar.iconColor}`}
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    {pillar.description}
                  </p>
                  <div className="space-y-2 sm:space-y-3">
                    {pillar.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start">
                        <div
                          className={`w-2 h-2 rounded-full ${pillar.iconColor.replace(
                            "text",
                            "bg"
                          )} mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0`}
                        ></div>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Works Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto">
              <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 sm:mb-10 px-2">
                How Our Framework Works
              </h2>
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
                {/* Left Side - Circular Diagram */}
                <div className="space-y-0">
                  <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-400 py-4 sm:py-6 px-4 sm:px-8 rounded-t-2xl sm:rounded-t-3xl">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight">
                      Our Solution: Smart Community Framework
                    </h3>
                  </div>
                  <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-none md:rounded-b-3xl p-0 md:p-8 shadow-xl">
                    <img
                      src="/image.png"
                      alt="Smart Community Framework Circular Diagram"
                      className="w-full h-auto max-w-2xl rounded-none md:rounded-2xl"
                    />
                  </div>
                </div>

                {/* Right Side - Information Panel */}
                <div className="space-y-4 sm:space-y-6 bg-white p-2 md:p-6 rounded-2xl shadow-lg">
                  {/* Vision and Mission */}
                  <div className="bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl flex-shrink-0">
                        🎯
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-blue-600 inline text-sm sm:text-base">
                          Vision:
                        </h4>
                        <span className="text-gray-800 ml-2 text-sm sm:text-base">
                          To create vibrant, digitally inclusive communities
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl flex-shrink-0">
                        🤝
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-cyan-600 inline text-sm sm:text-base">
                          Mission:
                        </h4>
                        <span className="text-gray-800 ml-2 text-sm sm:text-base">
                          Empower underserved communities through strategic
                          partnerships and innovative initiatives, bridging the
                          digital divide, and nurturing digital skills and
                          entrepreneurship
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Infrastructure Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl">💡</span>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                        Infrastructure
                      </h4>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-6 sm:ml-8 text-sm sm:text-base">
                      <li>Broadband Access Network</li>
                      <li>Energy and Water</li>
                      <li>Digital Hubs</li>
                      <li>Environmental</li>
                    </ul>
                  </div>

                  {/* Human Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl">💡</span>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                        Human
                      </h4>
                    </div>
                    <div className="space-y-2 ml-6 sm:ml-8">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          Education:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 ml-3 sm:ml-4 text-sm sm:text-base">
                          <li>
                            Hybrid Educational Programs, School Solutions, LMS
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          Social Programs:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 ml-3 sm:ml-4 text-sm sm:text-base">
                          <li>Sports, Art Culture</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          Healthcare:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 ml-3 sm:ml-4 text-sm sm:text-base">
                          <li>
                            Remote Monitoring, Asset Management, Telemedicine
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          Public Safety and Security:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 ml-3 sm:ml-4 text-sm sm:text-base">
                          <li>Law Enforcement</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Planning and Management Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl">💡</span>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                        Planning and Management
                      </h4>
                    </div>
                    <div className="space-y-2 ml-6 sm:ml-8">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          E-Government:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 ml-3 sm:ml-4 text-sm sm:text-base">
                          <li>
                            Online Records, Compliant Management, Payment
                            Gateways
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          Governance and Compliance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Framework;
