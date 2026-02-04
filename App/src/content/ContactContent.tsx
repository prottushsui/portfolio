import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Facebook, ExternalLink, Mail, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ContactLink {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const contactLinks: ContactLink[] = [
  {
    id: 'linkedin',
    title: 'LinkedIn',
    subtitle: 'Md. Mottakin Bin Arif',
    icon: <Linkedin className="h-5 w-5" />,
    href: 'https://www.linkedin.com/in/md-mottakin-bin-arif-7551a8307',
    color: 'bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5]',
  },
  {
    id: 'instagram',
    title: 'Instagram',
    subtitle: '@prottush',
    icon: <Instagram className="h-5 w-5" />,
    href: 'https://www.instagram.com/prottush',
    color: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-pink-600',
  },
  {
    id: 'facebook',
    title: 'Facebook',
    subtitle: 'Prottush',
    icon: <Facebook className="h-5 w-5" />,
    href: 'https://www.facebook.com/share/1K7v8vNf56/',
    color: 'bg-[#1877f2]/10 hover:bg-[#1877f2]/20 text-[#1877f2]',
  },
  {
    id: 'scout',
    title: 'Scout Network',
    subtitle: 'prottushfromdhaka',
    icon: <span className="text-lg">🏕️</span>,
    href: 'https://pass.scout.org/connect?did=did:web:scoutnetwork.org:users:prottushfromdhaka',
    color: 'bg-green-500/10 hover:bg-green-500/20 text-green-600',
  },
];

export const ContactContent: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@prottush.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="h-full overflow-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
          <p className="text-muted-foreground">No forms. No friction. Just reach out directly.</p>
        </div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
          onClick={copyEmail}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="font-medium">contact@prottush.com</div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            {copiedEmail ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </motion.div>

        {/* Social Links */}
        <div className="space-y-3">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`flex items-center justify-between p-4 rounded-lg transition-all ${link.color}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                  {link.icon}
                </div>
                <div>
                  <div className="text-xs opacity-70">{link.title}</div>
                  <div className="font-medium">{link.subtitle}</div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 opacity-50" />
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center pt-4"
        >
          <p className="text-sm text-muted-foreground">
            Looking forward to connecting with you!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
