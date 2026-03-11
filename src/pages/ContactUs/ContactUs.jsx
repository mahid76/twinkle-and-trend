// import React, { useState } from "react";
// import Container from "../../components/layout/Container";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const [formStatus, setFormStatus] = useState({
//     submitting: false,
//     submitted: false,
//     error: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormStatus({ submitting: true, submitted: false, error: null });

//     // Simulate form submission
//     setTimeout(() => {
//       setFormStatus({ submitting: false, submitted: true, error: null });
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });

//       // Reset success message after 5 seconds
//       setTimeout(() => {
//         setFormStatus({ submitting: false, submitted: false, error: null });
//       }, 5000);
//     }, 1500);
//   };

//   return (
//     <Container>
//       <div className="py-8">
//         {/* Page Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-primary font-bold text-gray-800 mb-4">
//             Contact Us
//           </h1>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             We'd love to hear from you! Please fill out this form or reach out to us through our contact details.
//           </p>
//         </div>

//         {/* Contact Info Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           {/* Phone */}
//           <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
//             <div className="w-16 h-16 bg-[#E6A0B5] rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
//             <p className="text-gray-600">+880 1234 567890</p>
//             <p className="text-gray-600">+880 9876 543210</p>
//           </div>

//           {/* Email */}
//           <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
//             <div className="w-16 h-16 bg-[#E6A0B5] rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
//             <p className="text-gray-600">info@twinkleandtrend.com</p>
//             <p className="text-gray-600">support@twinkleandtrend.com</p>
//           </div>

//           {/* Address */}
//           <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
//             <div className="w-16 h-16 bg-[#E6A0B5] rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">Address</h3>
//             <p className="text-gray-600">123 Fashion Street</p>
//             <p className="text-gray-600">Dhaka, Bangladesh</p>
//           </div>
//         </div>

//         {/* Contact Form & Info */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Contact Form */}
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-2xl font-primary font-bold text-gray-800 mb-6">
//               Send Us a Message
//             </h2>

//             {formStatus.submitted && (
//               <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
//                 <p className="font-bold">✓ Message sent successfully!</p>
//                 <p className="text-sm">We'll get back to you within 24 hours.</p>
//               </div>
//             )}

//             {formStatus.error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
//                 <p className="font-bold">✗ Error: {formStatus.error}</p>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6A0B5]"
//                   placeholder="Your name"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6A0B5]"
//                   placeholder="your.email@example.com"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6A0B5]"
//                   placeholder="+880 1234 567890"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
//                   Subject *
//                 </label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6A0B5]"
//                   placeholder="What is this about?"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
//                   Message *
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows="5"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6A0B5] resize-none"
//                   placeholder="Write your message here..."
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 disabled={formStatus.submitting}
//                 className="w-full bg-teal-500 text-white px-8 py-3 rounded-md hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
//               >
//                 {formStatus.submitting ? "Sending..." : "Send Message"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default ContactUs;


// src/pages/ContactPage.jsx
// src/pages/ContactPage.jsx
// src/pages/ContactPage.jsx
import React, { useState } from 'react';

const ContactPage = () => {
  // Define the brand color
  const brandColor = '#E771A3';
  
  // State for form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Message sent! (This is a demo)');
  };

  return (
    // The container uses brand color with low opacity as a subtle background
    <div className="w-full min-h-screen py-16 px-6 sm:px-12"
         style={{ backgroundColor: `${brandColor}20` }}> {/* 20 = ~12% opacity */}
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            Contact <span style={{ color: brandColor }}>Us</span>
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
                  { icon: '📞', title: 'Phone', value: '(555) 123-4567' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="text-3xl" style={{ color: brandColor }}>{item.icon}</div>
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
                    className="transition-colors font-medium"
                    style={{ color: brandColor }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: The Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
            
            <div className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input 
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full text-gray-800 placeholder:text-gray-500 rounded-xl px-5 py-3.5 border-none focus:ring-2"
                  style={{ 
                    backgroundColor: `${brandColor}20`,
                    outline: 'none',
                    boxShadow: 'none'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${brandColor}80`}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>

              {/* Email Address Field - THIS IS THE ONE YOU WERE REFERRING TO */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="w-full  text-gray-800 placeholder:text-gray-500 rounded-xl px-5 py-3.5 border-none focus:ring-2"
                  style={{ 
                    backgroundColor: `${brandColor}20`,
                    outline: 'none',
                    boxShadow: 'none'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${brandColor}80`}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input 
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Product Question"
                  className="w-full text-gray-800 placeholder:text-gray-500 rounded-xl px-5 py-3.5 border-none focus:ring-2"
                  style={{ 
                    backgroundColor: `${brandColor}20`,
                    outline: 'none',
                    boxShadow: 'none'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${brandColor}80`}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea 
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you today?"
                  className="w-full text-gray-800 placeholder:text-gray-500 rounded-xl px-5 py-3.5 border-none focus:ring-2"
                  style={{ 
                    backgroundColor: `${brandColor}20`,
                    outline: 'none',
                    boxShadow: 'none'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${brandColor}80`}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ 
                  backgroundColor: brandColor,
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                }}
                onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
                onMouseUp={(e) => e.target.style.transform = 'scale(1.02)'}
              >
                Send Message
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;