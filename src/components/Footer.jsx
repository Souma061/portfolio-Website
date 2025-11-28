import AOS from 'aos';
import { Facebook, Github, Linkedin, Twitter } from 'lucide-react';
import { useEffect } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    AOS.refresh();
  }, []);

  const socialLinks = [
    { icon: Github, url: 'https://github.com/Souma061', label: 'GitHub' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/soumabrata-ghosh-85862530b/', label: 'LinkedIn' },
    { icon: Twitter, url: 'https://x.com/SOUMABRATAGHOS4', label: 'Twitter' },
    { icon: Facebook, url: 'https://www.facebook.com/soumabrata.ghosh.750', label: 'Facebook' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-700/50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div data-aos="fade-up" data-aos-delay="0" data-aos-duration="800">
            <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
              Portfolio
            </h3>
            <p className="text-slate-400 max-w-xs">
              Creating beautiful web experiences with modern technologies and a passion for design.
            </p>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-slate-400 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
            <h4 className="text-white font-semibold mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    aria-label={social.label}
                    className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all duration-300 hover:bg-slate-800"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
