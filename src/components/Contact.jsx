import emailjs from '@emailjs/browser';
import AOS from 'aos';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useEffect, useState } from 'react';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
        setSubmitStatus({
          type: 'error',
          message: 'Email service not configured. Please configure EmailJS keys in Contact.jsx',
        });
        console.log('Demo - Form would send:', formData);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
        return;
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: 'your-email@example.com',
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );

      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
      console.error('Email error:', error);
      console.error('Error details:', {
        status: error.status,
        text: error.text,
        message: error.message,
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-slate-950">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16 text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 mt-4 sm:mt-6 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Have a project in mind? Let's discuss how I can help you bring your ideas to life.
          </p>
        </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div
            className="bg-slate-900 p-6 sm:p-8 rounded-lg border border-slate-800 hover:border-blue-500 transition-colors"
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-duration="800"
          >
            <Mail className="w-6 sm:w-8 h-6 sm:h-8 text-blue-400 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Email</h3>
            <p className="text-slate-400 text-sm sm:text-base break-all">soumabrataghosh57@gmail.com</p>
          </div>

          <div
            className="bg-slate-900 p-6 sm:p-8 rounded-lg border border-slate-800 hover:border-cyan-500 transition-colors"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="800"
          >
            <Phone className="w-6 sm:w-8 h-6 sm:h-8 text-cyan-400 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Phone</h3>
            <p className="text-slate-400 text-sm sm:text-base">+1 (555) 123-4567</p>
          </div>

          <div
            className="bg-slate-900 p-6 sm:p-8 rounded-lg border border-slate-800 hover:border-purple-500 transition-colors"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="800"
          >
            <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-purple-400 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Location</h3>
            <p className="text-slate-400 text-sm sm:text-base">Howrah, WestBengal, India</p>
          </div>
        </div>

        <div className="bg-linear-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-lg p-6 sm:p-8 md:p-12">
          <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
              {submitStatus && (
                <div
                  className={`p-4 rounded-lg mb-6 ${
                    submitStatus.type === 'success'
                      ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                      : 'bg-red-500/20 border border-red-500/50 text-red-400'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Discussion"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="5"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-colors duration-300 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-5 py-2 rounded-lg text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg transform ${
                  isSubmitting
                    ? 'bg-slate-600 cursor-not-allowed opacity-75'
                    : 'bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:shadow-blue-500/50 hover:scale-105'
                }`}
              >
                <Send size={16} />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
