import React, { useState } from 'react';

const ContactPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission - Send to WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Your WhatsApp number (with country code for Bangladesh)
    const whatsappNumber = '8801614326888'; // 01614326888 with Bangladesh country code

    // Format the message
    const message = `*New Contact Form Message*%0A%0A
*Name:* ${formData.fullName}%0A
*Email:* ${formData.email}%0A
*Subject:* ${formData.subject}%0A
*Message:* ${formData.message}`;

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');

    // Optional: Clear form after sending
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: ''
    });

    setIsSubmitting(false);
  };

  return (
    // The container uses brand color with low opacity as a subtle background
    <div className="w-full min-h-screen py-16 px-6 sm:px-12 bg-[#E771A3]/20">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            Contact <span className="text-[#E771A3]">Us</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question about a product or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Column 1: Contact Information */}
          <div className="space-y-10">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Contact Details</h2>
              <div className="space-y-6">
                {[
                  { icon: '📍', title: 'Location', value: '123 Collectors Lane, New York, NY 10001' },
                  { icon: '📧', title: 'Email', value: 'hello@collectorhq.com' },
                  { icon: '📞', title: 'Phone', value: '+880 1614-326888' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="text-3xl text-[#E771A3]">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connect With Us</h3>
              <p className="text-gray-600 mb-4">Follow us for updates on new arrivals!</p>
              <div className="flex gap-4">
                {['Facebook', 'Instagram', 'Twitter'].map(social => (
                  <button
                    key={social}
                    className="text-[#E771A3] hover:opacity-70 transition-opacity font-medium"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp Contact */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick WhatsApp</h3>
              <p className="text-gray-600 mb-4">Chat with us instantly on WhatsApp!</p>
              <a
                href="https://wa.me/8801614326888"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl hover:bg-[#128C7E] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Column 2: The Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>

            <div className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Jane Doe"
                  className="w-full bg-[#E771A3]/20 text-gray-800 placeholder:text-gray-500 rounded-xl px-5 py-3.5 border-none focus:ring-2 focus:ring-[#E771A3]/50 outline-none"
                />
              </div>

              {/*Number Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  maxLength="11"
                  pattern="[0-9]{11}"
                  title="Please enter exactly 11 digits"
                  placeholder="015*******8"
                  className="w-full bg-[#E771A3]/20 text-gray-800 placeholder:text-gray-500 rounded-xl px-5 py-3.5 border-none focus:ring-2 focus:ring-[#E771A3]/50 outline-none"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">Enter exactly 11 digits</p>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Product Question"
                  className="w-full bg-[#E771A3]/20 text-gray-800 placeholder:text-gray-500 rounded-xl px-5 py-3.5 border-none focus:ring-2 focus:ring-[#E771A3]/50 outline-none"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you today?"
                  className="w-full bg-[#E771A3]/20 text-gray-800 placeholder:text-gray-500 rounded-xl px-5 py-3.5 border-none focus:ring-2 focus:ring-[#E771A3]/50 outline-none resize-none"
                ></textarea>
              </div>

              {/* WhatsApp Send Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 outline-none ${isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#25D366] hover:bg-[#128C7E] hover:scale-[1.02] active:scale-[0.98]'
                  }`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
                </svg>
                {isSubmitting ? 'Preparing...' : 'Send via WhatsApp'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-2">
                Clicking send will open WhatsApp with your pre-filled message
              </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;