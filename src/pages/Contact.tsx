import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, User, MessageSquare } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // reset any previous messages
    setSubmitStatus("idle");
    setStatusMessage("");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as
      | string
      | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as
      | string
      | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as
      | string
      | undefined;

    if (!serviceId || !templateId || !publicKey) {
      console.error(
        "Missing EmailJS env vars. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY",
      );
      setSubmitStatus("error");
      setStatusMessage(
        "Email service is not configured yet. Please try again later.",
      );
      return;
    }

    try {
      setIsSending(true);

      // NOTE: template params must match your EmailJS template variables
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        { publicKey },
      );

      setSubmitStatus("success");
      setStatusMessage(
        "Message sent successfully! Thanks for reaching out — we'll get back to you soon.",
      );
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setSubmitStatus("error");
      setStatusMessage("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "info@scdp.org.za",
      link: "mailto:info@scdp.org.za",
      color: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+27 12 345 6789",
      link: "tel:+27123456789",
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "South Africa",
      link: "#",
      color: "from-red-500 to-red-600",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div>
      <section className="relative bg-gray-900 text-white min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074')",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Get in touch with us to learn more about our programs or to
              partner with us
            </p>
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
              We'd Love to Hear From You
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're interested in our programs, want to partner with
              us, or have questions, we're here to help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group cursor-pointer"
              >
                <div className={`h-2 bg-gradient-to-r ${info.color}`}></div>
                <div className="p-8 text-center">
                  <div
                    className={`${info.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}
                  >
                    <info.icon className={`h-8 w-8 ${info.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-600">{info.details}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Send Us a Message
              </h3>

              {/* Popup alert */}
              {submitStatus !== "idle" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                  <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setSubmitStatus("idle")}
                    aria-hidden="true"
                  />

                  <div
                    className={`relative w-full max-w-md rounded-2xl shadow-2xl border p-6 ${
                      submitStatus === "success"
                        ? "border-green-200 bg-white"
                        : "border-red-200 bg-white"
                    }`}
                    role="alertdialog"
                    aria-modal="true"
                    aria-live="assertive"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`mt-1 h-3 w-3 rounded-full ${
                          submitStatus === "success"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      />
                      <div className="flex-1">
                        <h4
                          className={`text-lg font-bold ${
                            submitStatus === "success"
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {submitStatus === "success"
                            ? "Message sent successfully"
                            : "Message failed to send"}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{statusMessage}</p>

                        <div className="mt-6 flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => setSubmitStatus("idle")}
                            className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-white font-semibold transition ${
                              submitStatus === "success"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-red-600 hover:bg-red-700"
                            }`}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmitStatus("idle")}
                      className="absolute right-3 top-3 rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="+27 12 345 6789"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Program Information">
                      Program Information
                    </option>
                    <option value="Partnership Opportunity">
                      Partnership Opportunity
                    </option>
                    <option value="Course Enrollment">Course Enrollment</option>
                    <option value="Support">Support</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:from-green-600 disabled:hover:to-blue-600 disabled:hover:scale-100"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSending ? "Sending…" : "Send Message"}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Why Contact Us?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white p-3 rounded-lg flex-shrink-0">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Join Our Programs
                    </h4>
                    <p className="text-gray-600">
                      Learn about our digital skills training and how you can
                      enroll in our courses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white p-3 rounded-lg flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Partnership Opportunities
                    </h4>
                    <p className="text-gray-600">
                      Explore how your organization can partner with us to make
                      an impact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-600 text-white p-3 rounded-lg flex-shrink-0">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      General Inquiries
                    </h4>
                    <p className="text-gray-600">
                      Have questions about our mission, programs, or impact?
                      We're here to help.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-600 text-white p-3 rounded-lg flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Support
                    </h4>
                    <p className="text-gray-600">
                      Need assistance with our platform or courses? Our team is
                      ready to support you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Office Hours
                </h4>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-semibold">Monday - Friday:</span> 8:00
                    AM - 5:00 PM
                  </p>
                  <p>
                    <span className="font-semibold">Saturday:</span> 9:00 AM -
                    1:00 PM
                  </p>
                  <p>
                    <span className="font-semibold">Sunday:</span> Closed
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Find Us
            </h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.7373423424!2d28.0473!3d-26.2041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzE0LjgiUyAyOMKwMDInNTAuMyJF!5e0!3m2!1sen!2sza!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SCDP Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
