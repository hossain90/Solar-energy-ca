import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "General",
    question: "How do solar panels work?",
    answer: "Solar panels work by converting sunlight into electricity through photovoltaic cells. When sunlight hits these cells, it creates an electric field that generates direct current (DC) electricity, which is then converted to alternating current (AC) by an inverter for home use."
  },
  {
    category: "General",
    question: "How long do solar panels last?",
    answer: "Most solar panels come with a 25-30 year warranty and can continue producing electricity for even longer. While their efficiency may slightly decrease over time (about 0.5% per year), they're designed to operate effectively for decades."
  },
  {
    category: "Installation",
    question: "How long does installation take?",
    answer: "A typical residential solar installation takes 1-3 days for the physical installation. However, the entire process, including permits and inspections, usually takes 2-3 months from signing the contract to system activation."
  },
  {
    category: "Installation",
    question: "Do I need to modify my roof?",
    answer: "Most solar installations don't require major roof modifications. However, your roof should be in good condition and able to support the weight of the system. We'll conduct a thorough assessment to ensure your roof is suitable."
  },
  {
    category: "Cost & Finance",
    question: "What incentives are available?",
    answer: "Various incentives are available, including the federal Investment Tax Credit (ITC), state-specific rebates, and local utility incentives. The specific incentives available depend on your location and the size of your system."
  },
  {
    category: "Cost & Finance",
    question: "How much can I save on electricity?",
    answer: "Savings vary based on your energy consumption, local electricity rates, and system size. Most homeowners save 50-90% on their electricity bills. Use our calculator to get a personalized estimate."
  },
  {
    category: "Maintenance",
    question: "How do I maintain solar panels?",
    answer: "Solar panels require minimal maintenance. Regular cleaning (2-4 times per year) and occasional inspections are typically sufficient. Most issues can be detected through your monitoring system."
  },
  {
    category: "Maintenance",
    question: "What happens during power outages?",
    answer: "For safety reasons, grid-tied solar systems shut off during power outages unless you have battery backup. If you want power during outages, consider adding a battery storage system to your installation."
  },
  {
    category: "Technical",
    question: "What happens on cloudy days?",
    answer: "Solar panels still work on cloudy days, though at reduced efficiency (about 10-25% of their normal output). Your system is designed to account for weather variations and still meet your annual energy needs."
  },
  {
    category: "Technical",
    question: "How much roof space do I need?",
    answer: "The space needed depends on your energy requirements and panel efficiency. As a rough estimate, you'll need about 100 square feet for every 1 kW of solar panels. An average home installation (6-8 kW) requires 600-800 square feet."
  }
];

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  const filteredFaqs = activeCategory 
    ? faqs.filter(faq => faq.category === activeCategory)
    : faqs;

  return (
    <div className="pt-24 pb-16">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about solar energy, installation, maintenance, and more.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeCategory === null
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All Questions
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenItem(openItem === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openItem === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openItem === index && (
                <div className="px-6 pb-6 prose max-w-none">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Can't find what you're looking for?{' '}
            <a href="/contact" className="text-blue-500 hover:text-blue-700">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;