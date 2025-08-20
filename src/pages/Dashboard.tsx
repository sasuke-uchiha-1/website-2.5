import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useQuests } from '../hooks/useQuests';
import { useUserStats } from '../hooks/useUserStats';
import SkillTree from '../components/SkillTree';
import QuestModal from '../components/QuestModal';
import UserProfile from '../components/UserProfile';
import StreakSystem from '../components/StreakSystem';
import BossQuest from '../components/BossQuest';
import ReflectionCompanion from '../components/ReflectionCompanion';
import QuestLog from '../components/QuestLog';
import { 
  User, 
  Target, 
  TrendingUp, 
  Zap, 
  Calendar,
  Award,
  Star,
  CheckCircle,
  Plus,
  Brain,
  Heart,
  DollarSign,
  Users,
  Palette,
  Shield,
  Flame,
  Settings,
  Crown,
  BookOpen
} from 'lucide-react';

const Dashboard = () => {
  const { user, userProfile, loading: authLoading, signOut } = useAuth();
  const { quests, loading: questsLoading, addQuest, toggleQuestComplete } = useQuests();
  const { xpData, streakData, skillsData, loading: statsLoading } = useUserStats();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);

  // Redirect if not authenticated
  if (!user && !authLoading) {
    return <Navigate to="/auth" replace />;
  }

  if (authLoading || questsLoading || statsLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate derived values
  const currentLevel = xpData?.level || 1;
  const currentXP = xpData?.total_xp || 0;
  const xpToNext = currentLevel * 1000; // 1000 XP per level
  const streak = streakData?.current_streak || 0;
  const xpMultiplier = 1 + (streak * 0.05); // 5% bonus per day
  const streakStatus: 'active' | 'warning' | 'broken' = streak > 0 ? 'active' : 'broken';

  // Convert quests to the format expected by the UI
  const dailyQuests = quests.map(quest => ({
    id: quest.id,
    title: quest.title,
    category: quest.category,
    completed: quest.status === 'completed',
    xp: quest.xp_reward
  }));

  const skillTrees = [
    { name: "Mind", level: skillsData.find(s => s.skill_name === 'Mind')?.level || 1, icon: Brain, color: "from-blue-500 to-purple-500", progress: ((skillsData.find(s => s.skill_name === 'Mind')?.xp || 0) % 100) },
    { name: "Body", level: skillsData.find(s => s.skill_name === 'Body')?.level || 1, icon: Heart, color: "from-green-500 to-blue-500", progress: ((skillsData.find(s => s.skill_name === 'Body')?.xp || 0) % 100) },
    { name: "Wealth", level: skillsData.find(s => s.skill_name === 'Wealth')?.level || 1, icon: DollarSign, color: "from-yellow-500 to-orange-500", progress: ((skillsData.find(s => s.skill_name === 'Wealth')?.xp || 0) % 100) },
    { name: "Relationships", level: skillsData.find(s => s.skill_name === 'Relationships')?.level || 1, icon: Users, color: "from-pink-500 to-red-500", progress: ((skillsData.find(s => s.skill_name === 'Relationships')?.xp || 0) % 100) },
    { name: "Creativity", level: skillsData.find(s => s.skill_name === 'Creativity')?.level || 1, icon: Palette, color: "from-purple-500 to-pink-500", progress: ((skillsData.find(s => s.skill_name === 'Creativity')?.xp || 0) % 100) },
    { name: "Discipline", level: skillsData.find(s => s.skill_name === 'Discipline')?.level || 1, icon: Shield, color: "from-red-500 to-purple-500", progress: ((skillsData.find(s => s.skill_name === 'Discipline')?.xp || 0) % 100) }
  ];

  const recentAchievements = [
    { title: "Week Warrior", description: "7-day streak completed", icon: Flame },
    { title: "Mind Master", description: "Mind skill reached level 15", icon: Brain },
    { title: "Quest Crusher", description: "100 quests completed", icon: Target }
  ];

  const aiChallenge = {
    title: "Record a 2-minute video explaining one thing you learned today and share it with someone who would benefit",
    difficulty: "Boss Level",
    xp: 200,
    skills: ["Mind", "Creativity", "Relationships"]
  };

  const bossQuests = [
    {
      title: "The 7-Day Discipline Forge",
      description: "Complete all daily training sessions for 7 consecutive days without missing a single one. Forge your discipline in the fires of consistency.",
      difficulty: 'Elite' as const,
      xpReward: 500,
      timeLimit: "7 Days",
      requirements: ["Discipline Level 10+", "3-day streak minimum"],
      skillCategory: "Discipline",
      isUnlocked: true,
      isCompleted: false
    },
    {
      title: "The Public Speaking Samurai",
      description: "Record and share a 5-minute video explaining something you're passionate about. Face your fear and become a communication warrior.",
      difficulty: 'Master' as const,
      xpReward: 750,
      requirements: ["Mind Level 15+", "Creativity Level 10+"],
      skillCategory: "Mind",
      isUnlocked: false,
      isCompleted: false
    },
    {
      title: "The Wealth Builder's Gauntlet",
      description: "Generate $1000 in additional income through a side project or skill monetization within 30 days.",
      difficulty: 'Legendary' as const,
      xpReward: 1500,
      timeLimit: "30 Days",
      requirements: ["Wealth Level 20+", "Complete 10 wealth quests"],
      skillCategory: "Wealth",
      isUnlocked: false,
      isCompleted: false
    }
  ];

  const handleAddQuest = (newQuest: { title: string; category: string; xp: number }) => {
    addQuest(newQuest.title, newQuest.category, newQuest.xp);
  };

  const handleToggleQuest = (questId: string) => {
    toggleQuestComplete(questId);
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Target },
    { id: 'skills', name: 'Mastery Tree', icon: TrendingUp },
    { id: 'boss', name: 'Boss Quests', icon: Crown },
    { id: 'log', name: 'Quest Log', icon: BookOpen },
    { id: 'profile', name: 'Profile', icon: Settings }
  ];

  return (
    <div className="pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-headline">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Kaizen Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-300">Welcome back, Warrior. Time to embrace kaizen.</p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="flex bg-gray-800/50 rounded-xl p-1 mb-8 max-w-2xl"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Character & Level Section */}
        {activeTab === 'dashboard' && (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Character Card */}
          <div className="lg:col-span-1 p-6 bg-gradient-to-br from-gray-900/50 to-slate-900/20 border border-cyan-500/20 rounded-2xl">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{userProfile?.avatar_emoji || '🎯'}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{userProfile?.username || 'Warrior'}</h3>
              <p className="text-cyan-400 font-mono text-lg">Level {currentLevel}</p>
              <div className="mt-4 flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-400" />
                <span className="text-orange-400 font-bold">{streak} day streak</span>
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="lg:col-span-2 p-6 bg-gradient-to-br from-gray-900/50 to-slate-900/20 border border-cyan-500/20 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Experience Progress</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Current XP: {currentXP.toLocaleString()}</span>
                <span>Next Level: {xpToNext.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentXP / xpToNext) * 100}%` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </motion.div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">{currentXP.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total XP</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">{xpToNext - currentXP}</div>
                <div className="text-sm text-gray-400">XP to Level {currentLevel + 1}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">{Math.round((currentXP / xpToNext) * 100)}%</div>
                <div className="text-sm text-gray-400">Progress</div>
              </div>
            </div>
          </div>
        </motion.div>
        )}

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Quests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 bg-gradient-to-br from-gray-900/50 to-slate-900/20 border border-cyan-500/20 rounded-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Today's Training</h3>
                <button 
                  className="p-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all"
                >
                  <Plus className="h-5 w-5 text-white" />
                </button>
              </div>
              <div className="space-y-4">
                {dailyQuests.map((quest, index) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-4 border rounded-xl transition-all cursor-pointer ${
                      quest.completed 
                        ? 'bg-green-900/20 border-green-500/30' 
                        : 'bg-gray-800/30 border-gray-600/30 hover:border-cyan-500/50'
                    }`}
                    onClick={() => toggleQuestComplete(quest.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${quest.completed ? 'bg-green-600' : 'bg-gray-600'}`}>
                          {quest.completed ? (
                            <CheckCircle className="h-5 w-5 text-white" />
                          ) : (
                            <Target className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className={`font-semibold ${quest.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                            {quest.title}
                          </h4>
                          <p className="text-sm text-gray-400">{quest.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${quest.completed ? 'text-green-400' : 'text-cyan-400'}`}>
                          +{quest.xp} XP
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-6 bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border border-cyan-500/30 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Sensei Challenge</h3>
                <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 text-sm rounded-full border border-yellow-500/30">
                  {aiChallenge.difficulty}
                </span>
              </div>
              <p className="text-lg text-gray-300 mb-4">{aiChallenge.title}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {aiChallenge.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-cyan-600/20 text-cyan-400 text-sm rounded-full border border-cyan-500/30">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-cyan-400 font-bold">+{aiChallenge.xp} XP</div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                    Skip
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-all">
                    Accept Challenge
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Streak System */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <StreakSystem 
                streak={streak} 
                xpMultiplier={xpMultiplier} 
                status={streakStatus} 
              />
            </motion.div>

            {/* Skill Trees */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-6 bg-gradient-to-br from-gray-900/50 to-slate-900/20 border border-cyan-500/20 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Mastery Paths</h3>
              <div className="space-y-4">
                {skillTrees.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-gradient-to-r ${skill.color} rounded-lg group-hover:rotate-12 transition-transform`}>
                          <skill.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-semibold text-white">{skill.name}</span>
                      </div>
                      <span className="text-sm font-mono text-cyan-400">Lv.{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                        className={`h-2 bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="p-6 bg-gradient-to-br from-gray-900/50 to-slate-900/20 border border-cyan-500/20 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Recent Honors</h3>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-xl"
                  >
                    <div className="p-2 bg-yellow-600 rounded-lg">
                      <achievement.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-400">{achievement.title}</h4>
                      <p className="text-sm text-gray-300">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        )}

        {/* Skill Tree Tab */}
        {activeTab === 'skills' && <SkillTree />}

        {/* Boss Quests Tab */}
        {activeTab === 'boss' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Crown className="h-8 w-8 text-yellow-400" />
                Boss Quests
              </h2>
              <p className="text-gray-300">Epic challenges that test your mastery and unlock legendary rewards</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bossQuests.map((quest, index) => (
                <BossQuest
                  key={index}
                  {...quest}
                  onAccept={() => console.log(`Accepted boss quest: ${quest.title}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quest Log Tab */}
        {activeTab === 'log' && <QuestLog />}

        {/* Profile Tab */}
        {activeTab === 'profile' && <UserProfile />}

        {/* Quest Modal */}
        <QuestModal
          isOpen={isQuestModalOpen}
          onClose={() => setIsQuestModalOpen(false)}
          onAddQuest={handleAddQuest}
        />

        {/* Reflection Companion */}
        <ReflectionCompanion />

        {/* Logout Button (temporary for testing) */}
        <button
          onClick={() => signOut()}
          className="fixed top-20 right-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors z-10"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;