import AOS from 'aos';
import { Github, Linkedin, Mail, MapPin, Send, Twitter } from 'lucide-react';
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
    if (isSubmitting) return;
    if (!import.meta.env.VITE_FORMSPREE_ENDPOINT) {
      alert('VITE_FORMSPREE_ENDPOINT is not defined in your .env file!');
      return;
    }

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
          message: 'Message sent successfully!'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Check console for details.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-20 min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 z-10">

        {/* Section Title */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-cyan">Connect</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        {/* Unified Solid Panel */}
        <div
          className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden bg-[#11111b] border border-white/5 shadow-2xl flex flex-col md:flex-row"
          data-aos="fade-up"
          data-aos-delay="200"
        >

          {/* Left Side: Contact Info & Decor */}
          <div className="md:w-5/12 bg-[#11111b] p-10 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5">

            {/* Overlay Patterns */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-surface0 via-transparent to-transparent" />

            <div className="relative z-10 space-y-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Contact Information</h3>
                <p className="text-gray-400">Fill out the form or reach out directly.</p>
              </div>

              <div className="space-y-6">
                <a href="mailto:soumabrataghosh57@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-purple transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-purple/50 group-hover:bg-purple/10 transition-all">
                    <Mail size={20} />
                  </div>
                  <span className="font-medium break-all">soumabrataghosh57@gmail.com</span>
                </a>

                <div className="flex items-center gap-4 text-gray-300 hover:text-cyan transition-colors group cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan/50 group-hover:bg-cyan/10 transition-all">
                    <MapPin size={20} />
                  </div>
                  <span className="font-medium">Howrah, West Bengal, India</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-10 md:mt-0">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {[
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/soumabrata-ghosh-85862530b/", color: "hover:bg-[#0077b5] hover:border-[#0077b5]" },
                  { Icon: Github, href: "https://github.com/Souma061", color: "hover:bg-[#333] hover:border-[#333]" },
                  { Icon: Twitter, href: "https://x.com/SoumabrataGhosh", color: "hover:bg-black hover:border-black" }
                ].map((social, index) => {
                  const { Icon, href, color } = social;
                  return (
                    <a
                      key={index}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white ${color} transition-all duration-300 shadow-lg hover:-translate-y-1`}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="md:w-7/12 p-8 md:p-12 bg-transparent">
            <form onSubmit={handleSubmit} className="space-y-6">

              {submitStatus && (
                <div className={`p-4 rounded-xl text-sm font-medium ${submitStatus.type === 'success' ? 'bg-green/10 text-green border border-green/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                  {submitStatus.message}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b-2 border-gray-700 py-3 px-1 text-white placeholder-transparent focus:outline-none focus:border-purple transition-colors"
                    placeholder="Name"
                    id="contact-name"
                    required
                  />
                  <label htmlFor="contact-name" className="absolute left-1 -top-3.5 text-sm text-purple transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-purple">
                    Your Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b-2 border-gray-700 py-3 px-1 text-white placeholder-transparent focus:outline-none focus:border-cyan transition-colors"
                    placeholder="Email"
                    id="contact-email"
                    required
                  />
                  <label htmlFor="contact-email" className="absolute left-1 -top-3.5 text-sm text-cyan transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-cyan">
                    Your Email
                  </label>
                </div>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="peer w-full bg-transparent border-b-2 border-gray-700 py-3 px-1 text-white placeholder-transparent focus:outline-none focus:border-pink transition-colors"
                  placeholder="Subject"
                  id="contact-subject"
                  required
                />
                <label htmlFor="contact-subject" className="absolute left-1 -top-3.5 text-sm text-pink transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-pink">
                  Subject
                </label>
              </div>

              <div className="relative group pt-4">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="peer w-full bg-slate-900/30 rounded-xl border border-gray-700 py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue transition-all resize-none"
                  placeholder="How can I help you?"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-xl overflow-hidden transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] w-full sm:w-auto"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple via-cyan to-blue opacity-0 group-hover:opacity-20 transition-opacity" />
                  <div className="relative flex items-center justify-center gap-2">
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
