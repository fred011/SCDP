import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, HeartHandshake, Target, ArrowRight } from "lucide-react";

const About = () => {
  const values = [
    {
      title: "Community-Centred Empowerment",
      description:
        "We place communities at the heart of development. Solutions are co-created with the community, not imposed on them, ensuring ownership, relevance, and long-term sustainability.",
      color: "border-green-700",
    },
    {
      title: "Digital Inclusion & Access",
      description:
        "We believe access to technology, connectivity, and digital skills is a basic enabler of opportunity. The programme works to close the digital divide and ensure no one is left behind in the digital economy.",
      color: "border-blue-700",
    },
    {
      title: "Collaboration & Partnership",
      description:
        "Lasting impact is achieved through collaboration. We actively partner with government, private sector, academia, civil society, and local leaders to unlock shared value and collective impact.",
      color: "border-yellow-700",
    },
    {
      title: "Innovation with Purpose",
      description:
        "Innovation must solve real problems. We apply practical, scalable, and locally relevant technologies and models that improve lives, services, and economic participation.",
      color: "border-red-700",
    },
    {
      title: "Sustainable Impact & Accountability",
      description:
        "We commit to measurable outcomes, responsible use of resources, and long-term impact. Success is defined by real change—skills gained, jobs created, enterprises supported, and communities strengthened.",
      color: "border-gray-800",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gray-900 text-white min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About{" "}
              <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800 }}>
                <span className="text-green-600">S</span>
                <span className="text-yellow-500">C</span>
                <span className="text-red-500">D</span>
                <span className="text-blue-600">P</span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              A national development programme empowering underserved communities
              through digital infrastructure, skills development, green energy,
              and inclusive economic opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-2xl shadow-sm"
            >
              <div className="bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Eye className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700">
                To build interconnected, innovative, and sustainable community
                ecosystems where access to education, digital services,
                entrepreneurship, and smart infrastructure enhances quality of
                life and long-term economic growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-2xl shadow-sm"
            >
              <div className="bg-green-700 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700">
                To empower underserved communities by providing access to digital
                infrastructure, skills development, green energy, and inclusive
                economic opportunities. Through strong partnerships, we drive
                socio-economic resilience, technological advancement, and
                sustainable community development.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-yellow-600 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Our Values
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
              The principles that guide how we work with communities and partners.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {values.map((v, idx) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className={`border-t-4 ${v.color} bg-gray-50 rounded-xl p-6`}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-gray-700">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Approach
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              The Smart Community Development Framework is built on three pillars:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                "Smart Infrastructure",
                "Human Capital & Skills Development",
                "Smart Governance & Service Delivery",
              ].map((p) => (
                <li
                  key={p}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 font-semibold text-gray-800"
                >
                  {p}
                </li>
              ))}
            </ul>
            <p className="text-lg text-gray-700 mb-8">
              These pillars give rise to the Smart Community Development
              Programme, implemented using our 5-phase Smart Implementation
              Cycle.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/stakeholders"
                className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center justify-center"
              >
                Partner With Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/framework"
                className="border border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center"
              >
                Explore the Framework
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
