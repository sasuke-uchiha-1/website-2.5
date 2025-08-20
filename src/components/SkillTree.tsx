import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, DollarSign, Users, Palette, Shield } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: number;
  unlocked: boolean;
  x: number;
  y: number;
}

interface SkillBranch {
  name: string;
  icon: any;
  color: string;
  skills: Skill[];
  mainLevel: number;
}

const SkillTree = () => {
  const skillBranches: SkillBranch[] = [
    {
      name: "Mind",
      icon: Brain,
      color: "from-blue-500 to-purple-500",
      mainLevel: 0,
      skills: [
        { id: "reading", name: "Reading", level: 0, unlocked: false, x: 20, y: 40 },
        { id: "meditation", name: "Meditation", level: 0, unlocked: false, x: 60, y: 20 },
        { id: "learning", name: "Learning", level: 0, unlocked: false, x: 40, y: 60 },
        { id: "focus", name: "Focus", level: 5, unlocked: false, x: 80, y: 50 }
      ]
    },
    {
      name: "Body",
      icon: Heart,
      color: "from-green-500 to-blue-500",
      mainLevel: 0,
      skills: [
        { id: "strength", name: "Strength", level: 0, unlocked: false, x: 25, y: 35 },
        { id: "cardio", name: "Cardio", level: 0, unlocked: false, x: 55, y: 25 },
        { id: "flexibility", name: "Flexibility", level: 0, unlocked: false, x: 35, y: 65 },
        { id: "nutrition", name: "Nutrition", level: 0, unlocked: false, x: 75, y: 45 }
      ]
    },
    {
      name: "Wealth",
      icon: DollarSign,
      color: "from-yellow-500 to-orange-500",
      mainLevel: 0,
      skills: [
        { id: "investing", name: "Investing", level: 0, unlocked: false, x: 30, y: 40 },
        { id: "business", name: "Business", level: 0, unlocked: false, x: 70, y: 30 },
        { id: "budgeting", name: "Budgeting", level: 0, unlocked: false, x: 50, y: 70 },
        { id: "networking", name: "Networking", level: 0, unlocked: false, x: 85, y: 55 }
      ]
    }
  ];

  const renderBranch = (branch: SkillBranch, index: number) => (
    <motion.div
      key={branch.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative bg-gradient-to-br from-gray-900/50 to-slate-900/20 border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300"
    >
      {/* Branch Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 bg-gradient-to-r ${branch.color} rounded-xl`}>
          <branch.icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{branch.name}</h3>
          <p className="text-cyan-400 font-mono">Level {branch.mainLevel}</p>
        </div>
      </div>

      {/* Tree Structure */}
      <div className="relative h-80 bg-black/20 rounded-xl overflow-hidden">
        {/* Tree Trunk */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-20 bg-gradient-to-t from-amber-700 to-amber-600 rounded-t-lg" />
        
        {/* Main Branches */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id={`branch-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          
          {/* Branch lines connecting skills */}
          {branch.skills.map((skill, skillIndex) => (
            <motion.line
              key={skill.id}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: skill.unlocked ? 1 : 0.3 }}
              transition={{ duration: 1, delay: skillIndex * 0.2 }}
              x1="50%"
              y1="80%"
              x2={`${skill.x}%`}
              y2={`${skill.y}%`}
              stroke={skill.unlocked ? `url(#branch-${index})` : "#374151"}
              strokeWidth="2"
              className={skill.unlocked ? "drop-shadow-sm" : ""}
            />
          ))}
        </svg>

        {/* Skill Nodes */}
        {branch.skills.map((skill, skillIndex) => (
          <motion.div
            key={skill.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
              skill.unlocked ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
            style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
          >
            <div className={`relative group ${skill.unlocked ? 'hover:scale-110' : ''} transition-transform duration-200`}>
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                skill.unlocked 
                  ? `bg-gradient-to-r ${branch.color} border-cyan-400 shadow-lg shadow-cyan-500/20` 
                  : 'bg-gray-700 border-gray-500'
              }`}>
                <span className="text-white font-bold text-sm">{skill.level}</span>
              </div>
              
              {/* Skill tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {skill.name} - Level {skill.level}
                </div>
              </div>

              {/* Glow effect for unlocked skills */}
              {skill.unlocked && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${branch.color} opacity-20 blur-sm`}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Branch Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Branch Progress</span>
          <span>{Math.round((branch.skills.filter(s => s.unlocked).length / branch.skills.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(branch.skills.filter(s => s.unlocked).length / branch.skills.length) * 100}%` }}
            transition={{ duration: 1.5, delay: index * 0.2 }}
            className={`h-2 bg-gradient-to-r ${branch.color} rounded-full`}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Mastery Tree</h2>
        <p className="text-gray-300">Watch your skills grow like branches reaching toward mastery</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {skillBranches.map((branch, index) => renderBranch(branch, index))}
      </div>
    </div>
  );
};

export default SkillTree;