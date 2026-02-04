import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, GraduationCap, Briefcase, Award, Users } from 'lucide-react';

export const ResumeContent: React.FC = () => {
  return (
    <div className="h-full overflow-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center pb-6 border-b border-border">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-4xl mb-4">
            👤
          </div>
          <h2 className="text-2xl font-bold">Md. Mottakin Bin Arif</h2>
          <p className="text-muted-foreground">(Prottush)</p>
          <p className="text-sm text-muted-foreground mt-1">Student • Climate Advocate • Scout Member</p>
          
          <div className="flex justify-center gap-3 mt-4">
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Online
            </Button>
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Education</h3>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium">Cambrian School and College</h4>
              <p className="text-sm text-muted-foreground">Secondary School Certificate (SSC)</p>
              <p className="text-sm text-muted-foreground">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Experience</h3>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium">Secretary (Publicity)</h4>
              <p className="text-sm text-muted-foreground">Cambrian Climate Club</p>
              <p className="text-sm text-muted-foreground">2023 - Present</p>
              <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside">
                <li>Led publicity and awareness campaigns</li>
                <li>Managed social media presence</li>
                <li>Organized climate action events</li>
              </ul>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium">Publisher</h4>
              <p className="text-sm text-muted-foreground">Climate Chronicles</p>
              <p className="text-sm text-muted-foreground">2024 - Present</p>
              <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside">
                <li>Launched publication platform</li>
                <li>Amplified youth voices in climate discourse</li>
                <li>Published research and articles</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Skills</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-sm">Technical</h4>
              <p className="text-xs text-muted-foreground">React, Node.js, TypeScript, Tailwind CSS, MongoDB</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-sm">Leadership</h4>
              <p className="text-xs text-muted-foreground">Team Management, Public Speaking, Event Organization</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-sm">Climate</h4>
              <p className="text-xs text-muted-foreground">Advocacy, Research, Campaign Management</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-sm">Communication</h4>
              <p className="text-xs text-muted-foreground">Writing, Presentation, Social Media</p>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Leadership & Activities</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <span className="text-lg">🏕️</span>
              <div>
                <p className="font-medium text-sm">Scout Member</p>
                <p className="text-xs text-muted-foreground">Scout Network - Community service and development</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <span className="text-lg">🌱</span>
              <div>
                <p className="font-medium text-sm">Climate Advocate</p>
                <p className="text-xs text-muted-foreground">Youth climate movement participant</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
