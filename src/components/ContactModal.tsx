import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Phone as WhatsApp, X } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const contacts = [
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      value: SOCIAL_LINKS.email,
      href: `mailto:${SOCIAL_LINKS.email}`,
      color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      value: 'Mikael Andrew Susanto',
      href: SOCIAL_LINKS.linkedin,
      color: 'bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-[var(--bg-color)] border border-subtle shadow-2xl"
          >
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Let's Connect</h2>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-[var(--text-secondary)]/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-muted leading-relaxed">
                Choose your preferred way to reach out. I'm usually responsive within 24 hours.
              </p>
              
              <div className="grid gap-3">
                {contacts.map((contact) => (
                  <a
                    key={contact.name}
                    href={contact.href}
                    target={contact.name !== 'Email' ? '_blank' : undefined}
                    rel={contact.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${contact.color}`}
                  >
                    <div className="p-2 rounded-xl bg-current opacity-20 group-hover:opacity-100 group-hover:bg-transparent">
                        {contact.icon}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{contact.name}</div>
                      <div className="text-xs opacity-70 truncate max-w-[200px]">{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="bg-[var(--text-secondary)]/5 p-4 text-center">
              <p className="text-[10px] uppercase tracking-widest text-muted font-bold">
                Available for worldwide projects
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
