import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Lightbulb, Users } from "lucide-react";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Building Smart, Connected, and Inclusive Communities
            </h1>
            <p className="text-lg md:text-2xl mb-6 text-gray-100 max-w-4xl mx-auto">
              A national development programme empowering underserved
              communities through digital infrastructure, skills, innovation,
              and sustainable service delivery.
            </p>
            <p className="text-lg md:text-xl mb-10 text-gray-100 max-w-3xl mx-auto font-semibold">
              Connectivity. Skills. Innovation. Opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about"
                className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/stakeholders"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-700 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Partner With Us
                <Users className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-700 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Contact
                <Globe className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <p className="mt-10 text-base md:text-lg text-gray-100 max-w-5xl mx-auto">
              The Smart Community Development Programme (SCDP) is a national
              initiative designed to transform underserved, rural, township, and
              peri-urban communities into digitally empowered, economically
              active, and resilient smart communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
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
              What We Do
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The programme is delivered through three integrated pillars that
              combine infrastructure, skills, and modernised service delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Infrastructure",
                description:
                  "Digital connectivity, energy resilience, environmental sustainability, and circular economy systems.",
                icon: Lightbulb,
                color: "text-green-700",
                bg: "bg-green-50",
              },
              {
                title: "Human Capital & Skills Development",
                description:
                  "Digital skills, workforce training, social programmes, youth development, entrepreneurship, and smart economy activation.",
                icon: Users,
                color: "text-blue-700",
                bg: "bg-blue-50",
              },
              {
                title: "Smart Governance & Service Delivery",
                description:
                  "Modernising municipalities through e-government systems, digital tools, open data, and predictive planning.",
                icon: Globe,
                color: "text-yellow-700",
                bg: "bg-yellow-50",
              },
            ].map((p, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div
                  className={`${p.bg} ${p.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}
                >
                  <p.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {p.title}
                </h3>
                <p className="text-gray-600">{p.description}</p>
                <div className="mt-6">
                  <Link
                    to="/framework"
                    className="inline-flex items-center text-green-700 font-semibold hover:text-green-800"
                  >
                    View the Framework
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Smart Communities Matter */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Why Smart Communities Matter
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                South Africa’s underserved communities face challenges in digital
                access, unemployment, weak service delivery, and stagnant
                economic activity.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our programme establishes integrated solutions to support:
              </p>
              <ul className="space-y-3 text-gray-700">
                {[
                  "Digital transformation",
                  "Youth and workforce development",
                  "SME growth and job creation",
                  "Smart utility systems",
                  "Safer and healthier communities",
                  "Sustainable local government",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-green-700 flex-shrink-0"></span>
                    <span className="text-base md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                Get Involved
              </h3>
              <p className="text-gray-600 mb-6">
                Build smart, connected, and future-ready communities — together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors text-center"
                >
                  Contact Us
                </Link>
                <Link
                  to="/stakeholders"
                  className="border border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors text-center"
                >
                  Become a Partner
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
