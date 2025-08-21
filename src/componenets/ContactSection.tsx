import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white py-20">
      <div className="w-full max-w-6xl px-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Column - Large Text */}
          <div className="col-span-4 space-y-0">
            <h2 className="text-8xl font-bold text-gray-200 leading-[0.85] tracking-tight">
              WARM<br />
              TEA<br />
              BOLD<br />
              IDEAS<br />
              AT<br />
              <span className="text-[#f97316]">TACT</span>
            </h2>
          </div>

          {/* Middle Column - Form */}
          <div className="col-span-5 space-y-6 ">
            <div className="text-right mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-1">
                MEET UP AT
              </h3>
              <p className="text-gray-500 text-sm">
                Let's talk over a brew and take your brand further.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Your Tactical Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  E-Mail*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  We're listening*
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2.5 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  required
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gray-600 text-white py-3 px-6 text-sm font-medium hover:bg-gray-700 transition-colors duration-300 mt-6"
              >
                Ready to Roll
              </button>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="col-span-3 text-right text-sm text-gray-500 space-y-1 pt-16">
            <div className="space-y-0.5 mb-4">
              <p>Kalyan's Anshita Pride,</p>
              <p>Beside City Union Bank,</p>
              <p>Manikonda, Hyderabad,</p>
              <p>Telangana - 500 089.</p>
            </div>
            
            <div className="space-y-0.5 mb-4">
              <p>design.tactadvertising@gmail.com</p>
              <p>mkt.tactadvertising@gmail.com</p>
            </div>
            
            <div>
              <p>+91 7731 88 44 77</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;