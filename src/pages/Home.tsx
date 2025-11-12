import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Users,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

const Home = () => {
  return (
    <div>
      <section className="relative bg-gray-900 text-white min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering Rural Communities Through Technology & Education
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Building a digital future for South African communities with
              innovation, access, and collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/RegisterPage"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Join Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/digital-skills"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Explore Courses
                <BookOpen className="ml-2 h-5 w-5" />
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
              About{" "}
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800 }}>
                <span className="text-green-600">S</span>
                <span className="text-yellow-500">C</span>
                <span className="text-red-500">D</span>
                <span className="text-blue-600">P</span>
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Smart Community Development Platform is a pioneering South
              African initiative dedicated to bridging the digital divide in
              rural communities through comprehensive tech education and
              sustainable innovation.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center mt-6 text-green-600 font-semibold hover:text-green-700"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
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
              Our Services
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive solutions for community empowerment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Tech Skills Training",
                description:
                  "Comprehensive digital literacy and technical skills development programs",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: Lightbulb,
                title: "Agri-Tech Solutions",
                description:
                  "Innovative agricultural technology to enhance rural farming practices",
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                icon: TrendingUp,
                title: "Entrepreneurship",
                description:
                  "Business development and entrepreneurial support for local communities",
                color: "text-yellow-600",
                bg: "bg-yellow-50",
              },
              {
                icon: Users,
                title: "Digital Inclusion",
                description:
                  "Ensuring equitable access to technology and digital resources",
                color: "text-red-600",
                bg: "bg-red-50",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div
                  className={`${service.bg} ${service.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}
                >
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center text-green-600 font-semibold hover:text-green-700"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-5xl font-bold mb-2">2,000+</div>
                <div className="text-xl">Rural Learners Trained</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-xl">Communities Reached</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">100+</div>
                <div className="text-xl">Projects Completed</div>
              </div>
            </div>
            <Link
              to="/impact"
              className="inline-flex items-center mt-8 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              View Impact Stories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
