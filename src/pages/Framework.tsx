import { motion } from "framer-motion";
import {
  Cpu,
  Factory,
  Leaf,
  ShieldCheck,
  Signal,
  Stethoscope,
  Users,
  Wallet,
  Building2,
  ClipboardList,
  LineChart,
} from "lucide-react";

type PillarSection = {
  title: string;
  items: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
};

type Pillar = {
  title: string;
  description: string;
  sections: PillarSection[];
  headerGradient: string;
};

const Framework = () => {
  const pillars: Pillar[] = [
    {
      title: "Pillar 1: Smart Infrastructure",
      description:
        "Digital connectivity, energy resilience, environmental sustainability, and circular economy systems.",
      headerGradient: "from-green-600 to-emerald-600",
      sections: [
        {
          title: "Broadband Access",
          icon: Signal,
          color: "text-green-700",
          bg: "bg-green-50",
          items: [
            "Last-mile connectivity for rural and township communities",
            "Public Wi-Fi hotspots",
            "Community internet centres",
            "Smart meters (water & electricity)",
            "Network resilience and maintenance programmes",
          ],
        },
        {
          title: "Alternative Energy Solutions",
          icon: Cpu,
          color: "text-yellow-700",
          bg: "bg-yellow-50",
          items: [
            "Solar microgrids",
            "Renewable energy for community facilities",
            "Smart utility solutions",
            "Green energy transition support",
            "Demand-side energy management",
          ],
        },
        {
          title: "Digital Hubs & Innovation Centres",
          icon: Factory,
          color: "text-blue-700",
          bg: "bg-blue-50",
          items: [
            "Accredited digital skills training",
            "Co-working spaces for entrepreneurs",
            "Computer labs & community digital classrooms",
            "Business development support",
            "Incubators and SME mentorship",
          ],
        },
        {
          title: "Environmental Sustainability & Circular Economy",
          icon: Leaf,
          color: "text-emerald-700",
          bg: "bg-emerald-50",
          items: [
            "Waste-to-energy solutions",
            "Recycling ecosystems",
            "Smart agriculture technologies",
            "Water conservation systems",
            "Disaster preparedness and climate resilience",
          ],
        },
      ],
    },
    {
      title: "Pillar 2: Human Capital & Skills Development",
      description:
        "Digital skills, workforce training, social programmes, youth development, entrepreneurship, and smart economy activation.",
      headerGradient: "from-blue-600 to-cyan-600",
      sections: [
        {
          title: "Education & Training",
          icon: Users,
          color: "text-blue-700",
          bg: "bg-blue-50",
          items: [
            "SETA-accredited programmes",
            "Digital skills & ICT training",
            "Workforce development pathways",
            "Teacher digital enablement",
            "Learning Management Systems (LMS)",
            "Hybrid learning models",
          ],
        },
        {
          title: "Social Programmes",
          icon: ClipboardList,
          color: "text-purple-700",
          bg: "bg-purple-50",
          items: [
            "Arts, sports & cultural development",
            "Youth leadership and civic participation",
            "Community engagement with traditional authorities",
            "School partnerships",
            "Social cohesion initiatives",
          ],
        },
        {
          title: "Healthcare & Wellness",
          icon: Stethoscope,
          color: "text-red-700",
          bg: "bg-red-50",
          items: [
            "Telemedicine",
            "Remote monitoring devices",
            "Digital health records",
            "AI diagnostics",
            "Integration with EMS & community health workers",
            "Mobile clinics & health outreach",
          ],
        },
        {
          title: "Public Safety & Security",
          icon: ShieldCheck,
          color: "text-amber-700",
          bg: "bg-amber-50",
          items: [
            "AI surveillance and smart camera systems",
            "Integrated emergency response",
            "Community alert platforms",
            "Cybersecurity awareness",
            "Digital policing tools (dashboards, data analytics)",
          ],
        },
      ],
    },
    {
      title: "Pillar 3: Smart Governance & Service Delivery",
      description:
        "Modernising municipalities through e-government systems, digital tools, open data, and predictive planning.",
      headerGradient: "from-yellow-500 to-orange-500",
      sections: [
        {
          title: "E-Government Systems",
          icon: Building2,
          color: "text-yellow-800",
          bg: "bg-yellow-50",
          items: [
            "Digital citizen applications",
            "Online records & municipal integrations",
            "Smart payment gateways",
            "Mobile-based service access",
            "Complaints management systems",
          ],
        },
        {
          title: "Service Delivery Modernisation",
          icon: LineChart,
          color: "text-orange-800",
          bg: "bg-orange-50",
          items: [
            "Real-time smart dashboards",
            "Open data and transparency tools",
            "Predictive municipal planning",
            "Interdepartmental data integration",
            "Smart policy implementation",
            "Digital anti-corruption mechanisms",
            "Citizen performance reporting",
          ],
        },
      ],
    },
  ];

  const principles = [
    {
      title: "People First",
      description:
        "Solutions are co-created with local residents, leaders, schools, and small businesses, ensuring high adoption and community ownership.",
    },
    {
      title: "Technology as an Enabler",
      description:
        "Connectivity, digital tools, AI and IoT are used to solve real problems — not as expensive standalone solutions.",
    },
    {
      title: "Multi-Stakeholder Collaboration",
      description:
        "Government (national, provincial, municipal), private sector, academia, NGOs and community structures participate in shared delivery.",
    },
    {
      title: "Sustainability & Local Capacity",
      description:
        "The framework prioritizes local talent development, community-based operations, and revenue models that ensure longevity.",
    },
    {
      title: "Data, Monitoring & Continuous Learning",
      description:
        "A digital dashboard measures progress, captures lessons, and informs future rollouts.",
    },
  ];

  const cycle = [
    {
      title: "Phase 1: Community Analysis & Assessment",
      items: [
        "Needs analysis",
        "Digital readiness baseline",
        "Stakeholder mapping",
        "Socio-economic profiling",
        "Infrastructure audits",
      ],
    },
    {
      title: "Phase 2: Co-Design & Integrated Planning",
      items: [
        "Planning with municipalities, traditional leaders, and communities",
        "Programme customisation",
        "Funding and partnership mobilisation",
        "Change management planning",
      ],
    },
    {
      title: "Phase 3: Deployment & Build",
      items: [
        "Connectivity installation",
        "Hub establishment",
        "Skills programme rollout",
        "SME onboarding",
        "Smart systems deployment (energy, water, safety)",
      ],
    },
    {
      title: "Phase 4: Operations, Support & Monitoring",
      items: [
        "Local operations teams",
        "Helpdesk & technical support",
        "System monitoring",
        "Partner reporting",
      ],
    },
    {
      title: "Phase 5: Growth, Scale & Innovation",
      items: [
        "Expansion to new wards or districts",
        "Additional services & new technologies",
        "Impact measurement",
        "Community-driven innovation loops",
      ],
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-gray-900 text-white min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/55"></div>
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
              Smart Community Development Framework
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto px-4">
              The strategic blueprint that guides all programmes, projects, and
              partnerships.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How Our Framework Works (Diagram) */}
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
                  <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-none md:rounded-b-3xl p-0 md:p-0 shadow-xl">
                    <img
                      src="/framework.png"
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
                          To build interconnected, innovative, and sustainable
                          community ecosystems where access to education,
                          digital services, entrepreneurship, and smart
                          infrastructure enhances quality of life and long-term
                          economic growth.
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
                          To empower underserved communities by providing access
                          to digital infrastructure, skills development, green
                          energy, and inclusive economic opportunities. Through
                          strong partnerships, we drive socio-economic
                          resilience, technological advancement, and sustainable
                          community development.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pillars (Summary) */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl">💡</span>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                        Smart Infrastructure
                      </h4>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-6 sm:ml-8 text-sm sm:text-base">
                      <li>Broadband access</li>
                      <li>Alternative energy solutions</li>
                      <li>Digital hubs & innovation centres</li>
                      <li>Environmental sustainability & circular economy</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl">💡</span>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                        Human Capital & Skills Development
                      </h4>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-6 sm:ml-8 text-sm sm:text-base">
                      <li>Education & training</li>
                      <li>Social programmes</li>
                      <li>Healthcare & wellness</li>
                      <li>Public safety & security</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl">💡</span>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                        Smart Governance & Service Delivery
                      </h4>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-6 sm:ml-8 text-sm sm:text-base">
                      <li>E-government systems</li>
                      <li>Service delivery modernisation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
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
              The Three Pillars
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Three integrated pillars that enable inclusive digital
              transformation, community resilience, and sustainable local
              growth.
            </p>
          </motion.div>

          <div className="space-y-10">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div
                  className={`px-6 sm:px-8 py-6 bg-gradient-to-r ${pillar.headerGradient}`}
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-white/90 mt-2">{pillar.description}</p>
                </div>

                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pillar.sections.map((section) => (
                    <div
                      key={section.title}
                      className="rounded-xl border border-gray-100 p-5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`${section.bg} ${section.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                        >
                          <section.icon className="h-6 w-6" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {section.title}
                        </h4>
                      </div>
                      <ul className="space-y-2 text-gray-700">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-2 h-2 w-2 rounded-full bg-gray-300 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Framework Design Principles
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              The entire model is built on five principles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 p-6 text-left"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {i + 1}. {p.title}
                </h3>
                <p className="text-gray-700">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                <Wallet className="h-6 w-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                Smart Community Development Programme
              </h2>
            </div>
            <p className="text-gray-700 text-base sm:text-lg mb-6">
              The programme turns the framework into practical, community-driven
              implementation.
            </p>
            <p className="text-gray-700 text-base sm:text-lg mb-4">
              The programme includes:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-800">
              {[
                "Community connectivity expansion",
                "Digital hubs & training centres",
                "Youth digital acceleration initiatives",
                "Entrepreneurship & SME programmes",
                "Smart utility upgrades (solar, water, waste)",
                "Digital health and safety systems",
                "Modernising municipal operations",
                "Community transformation through tech-enabled models",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-700 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Implementation Cycle */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              The 5-Phase Smart Implementation Cycle
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Our project methodology ensures scalable, replicable, and
              measurable implementation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cycle.map((phase) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {phase.title}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-gray-300 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Framework;
