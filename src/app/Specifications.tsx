'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const specifications = [
  {
    id: 'cooling',
    title: 'Cooling Performance',
    items: [
      'Cooling Capacity: 18,000 BTU/h',
      'Cooling Area Coverage: Up to 180 sq. ft.',
      'Compressor Type: Rotary/Inverter',
      'Cooling Technology: Fast Cooling, Turbo Mode',
    ],
  },
  {
    id: 'power',
    title: 'Power & Energy Efficiency',
    items: [
      'Power Supply: 220-240V, 50Hz',
      'Rated Power Input: 1500W',
      'Energy Efficiency Ratio (EER): 3.5',
      'Star Rating: 5-Star (BEE Certified)',
      'Annual Power Consumption: 1200 kWh',
    ],
  },
  {
    id: 'dimensions',
    title: 'Dimensions & Weight',
    items: [
      'Indoor Unit (WxHxD): 89.8 x 29.5 x 21.5 cm',
      'Outdoor Unit (WxHxD): 84.5 x 54 x 30.4 cm',
      'Indoor Unit Weight: 11.5 kg',
      'Outdoor Unit Weight: 35 kg',
    ],
  },
  {
    id: 'features',
    title: 'Special Features',
    items: [
      '4-Way Swing: Yes',
      'Auto Restart: Yes',
      'Sleep Mode: Yes',
      'Timer: 24 Hours',
      'Remote Control: Digital with LCD',
      'Air Filter: Washable',
    ],
  },
  {
    id: 'warranty',
    title: 'Warranty & Support',
    items: [
      'Compressor: 10 Years',
      'PCB: 5 Years',
      'Gas Charging: 5 Years',
      'Service: 1 Year Comprehensive',
      'Customer Support: 24/7 Helpline',
    ],
  },
];

export default function Specifications() {
  const [openSection, setOpenSection] = useState<string | null>('cooling');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Technical Specifications</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Detailed technical specifications of the CoolAir X1000 for your reference
            </p>
          </motion.div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {specifications.map((spec, index) => (
              <div 
                key={spec.id}
                className={`border-b border-gray-100 last:border-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <button
                  onClick={() => toggleSection(spec.id)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{spec.title}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openSection === spec.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {openSection === spec.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <ul className="space-y-3">
                          {spec.items.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <svg
                                className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Download Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Need More Information?</h3>
              <p className="text-gray-600 mb-6">
                Download our detailed product brochure for complete specifications, installation guide, and maintenance tips.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  Download Brochure (PDF)
                </button>
                <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium">
                  View Installation Manual
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
