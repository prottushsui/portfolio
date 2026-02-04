import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Users, Code, Calendar } from 'lucide-react';

export const AboutContent: React.FC = () => {
  return (
    <div className="h-full overflow-auto p-4">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="values">Values</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-4xl">
                👤
              </div>
              <div>
                <h2 className="text-2xl font-bold">Hello, I'm Prottush.</h2>
                <p className="text-muted-foreground">Student • Climate Advocate • Scout Member</p>
              </div>
            </div>
            
            <p className="text-foreground/80 leading-relaxed">
              I'm an SSC candidate at <strong>Cambrian School and College</strong> in Dhaka, Bangladesh, 
              serving as <strong>Secretary (Publicity)</strong> of the Cambrian Climate Club and 
              <strong> Publisher of Climate Chronicles</strong>. I'm passionate about climate action, 
              youth leadership, and using technology for social impact. My work focuses on empowering 
              youth voices in the sustainability movement through ethical leadership and long-term thinking.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <Leaf className="h-6 w-6 text-green-500 mb-2" />
              <h3 className="font-semibold">Climate Action</h3>
              <p className="text-sm text-muted-foreground">Leading initiatives for environmental awareness</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <Users className="h-6 w-6 text-blue-500 mb-2" />
              <h3 className="font-semibold">Youth Leadership</h3>
              <p className="text-sm text-muted-foreground">Empowering the next generation</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <Code className="h-6 w-6 text-purple-500 mb-2" />
              <h3 className="font-semibold">Technology</h3>
              <p className="text-sm text-muted-foreground">Building solutions for impact</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-500 mb-2" />
              <h3 className="font-semibold">Scouting</h3>
              <p className="text-sm text-muted-foreground">Community service & development</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="values" className="space-y-4">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">Climate & Sustainability</h3>
                <p className="text-sm text-muted-foreground">
                  Committed to environmental action and sustainable solutions. Leading campaigns 
                  for climate awareness and organizing initiatives that make a real difference.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">Leadership & Scouting</h3>
                <p className="text-sm text-muted-foreground">
                  Building communities and empowering youth through leadership. As a scout member, 
                  I believe in service, teamwork, and personal development.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Code className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">Technology for Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Using tech to solve real-world problems and create positive change. From web 
                  development to data analysis, technology is a tool for transformation.
                </p>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-l-2 border-primary pl-4 pb-4"
            >
              <div className="text-sm font-semibold text-muted-foreground mb-1">2023</div>
              <h3 className="font-semibold">Climate Club Secretary (Publicity)</h3>
              <p className="text-sm text-muted-foreground">
                Began role at Cambrian Climate Club, leading publicity and awareness campaigns
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="border-l-2 border-primary pl-4 pb-4"
            >
              <div className="text-sm font-semibold text-muted-foreground mb-1">2024</div>
              <h3 className="font-semibold">Climate Chronicles Publisher</h3>
              <p className="text-sm text-muted-foreground">
                Launched Climate Chronicles publication platform to amplify youth voices
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border-l-2 border-primary pl-4"
            >
              <div className="text-sm font-semibold text-muted-foreground mb-1">2025</div>
              <h3 className="font-semibold">Continuing Leadership</h3>
              <p className="text-sm text-muted-foreground">
                Ongoing work in climate advocacy and youth leadership initiatives
              </p>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
