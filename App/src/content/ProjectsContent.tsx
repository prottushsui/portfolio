import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Download, ArrowLeft } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  role: string;
  techStack: string[];
  impact: string;
  github?: string;
  live?: string;
  pdf?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Climate Action Platform',
    category: 'Climate',
    problem: 'Students lack accessible platforms to engage in climate advocacy',
    solution: 'Built a web platform connecting students with local climate initiatives',
    role: 'Full-stack Developer & Project Lead',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    impact: '500+ students engaged, 20+ initiatives launched',
    github: '#',
    live: '#'
  },
  {
    id: '2',
    title: 'Youth Leadership Portal',
    category: 'Tech',
    problem: 'Difficulty coordinating youth leadership programs across regions',
    solution: 'Created a management system for tracking and organizing youth programs',
    role: 'Lead Developer',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    impact: 'Used by 10+ organizations, 1000+ participants tracked',
    github: '#'
  },
  {
    id: '3',
    title: 'Climate Research Publication',
    category: 'Writing',
    problem: 'Limited youth voices in climate research discourse',
    solution: 'Co-authored research paper on youth climate engagement',
    role: 'Researcher & Co-author',
    techStack: ['Research', 'Data Analysis', 'Academic Writing'],
    impact: 'Published in youth climate journal, 500+ reads',
    pdf: '#'
  }
];

const categories = ['All', 'Climate', 'Tech', 'Writing'];

export const ProjectsContent: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (selectedProject) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="h-full overflow-auto p-4"
      >
        <Button 
          variant="ghost" 
          onClick={() => setSelectedProject(null)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
        
        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{selectedProject.category}</Badge>
            <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Problem</h3>
              <p className="text-muted-foreground">{selectedProject.problem}</p>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Solution</h3>
              <p className="text-muted-foreground">{selectedProject.solution}</p>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Your Role</h3>
              <p className="text-muted-foreground">{selectedProject.role}</p>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map(tech => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Impact / Results</h3>
              <p className="text-muted-foreground">{selectedProject.impact}</p>
            </div>
            
            <div className="flex gap-3 pt-4">
              {selectedProject.github && (
                <Button variant="outline" size="sm">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              )}
              {selectedProject.live && (
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </Button>
              )}
              {selectedProject.pdf && (
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="h-full overflow-auto p-4">
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <Button
            key={category}
            variant={filter === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{project.category}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{project.solution}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map(tech => (
                        <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-muted-foreground">→</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
