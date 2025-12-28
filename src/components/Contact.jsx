import AOS from 'aos';
import { Github, Linkedin, Mail, MapPin, Send, Share2, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';

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
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-base text-main overflow-hidden relative">
      {/* Background Elements to match Vineet style */}


      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left Side: Contact Info */}
          <div data-aos="fade-right" data-aos-duration="1000">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Collaborate</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-lg leading-relaxed">
              Have an <span className="text-purple font-medium">exciting project</span> you need help with? Send me an <span className="text-green font-medium">email</span> or contact me via <span className="text-cyan font-medium">instant message</span>!
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-all duration-300">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Email Me</h4>
                  <a href="mailto:soumabrataghosh57@gmail.com" className="text-xl font-semibold text-white hover:text-purple-400 transition-colors">
                    soumabrataghosh57@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-500/50 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Location</h4>
                  <p className="text-xl font-semibold text-white">
                    Howrah, West Bengal, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-pink-500/50 transition-all duration-300">
                  <Share2 className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Socials</h4>
                  <div className="flex gap-4 mt-2">
                    <a href="https://www.linkedin.com/in/soumabrataghosh" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-main transition-all border border-white/10">
                      <Linkedin size={20} />
                    </a>
                    <a href="https://github.com/Souma061" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gray-800 hover:text-main transition-all border border-white/10">
                      <Github size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sky-500 hover:text-main transition-all border border-white/10">
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="relative" data-aos="fade-left" data-aos-duration="1000">


            <form onSubmit={handleSubmit} className="relative bg-mantle border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl space-y-6">
              <h3 className="text-2xl font-bold text-orange mb-2">Send a Message</h3>

              {submitStatus && (
                <div
                  className={`p-4 rounded-xl ${submitStatus.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <div className="space-y-4">
                <div className="group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-main placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                    required
                  />
                </div>

                <div className="group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-main placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                    required
                  />
                </div>

                <div className="group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-main placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:bg-white/10 transition-all"
                    required
                  />
                </div>

                <div className="group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows="4"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-main placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all resize-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
