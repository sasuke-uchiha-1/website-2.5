import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Edit3, Save, X, Users, Target, Flame } from 'lucide-react';

interface Friend {
  id: string;
  username: string;
  level: number;
  streak: number;
  avatar: string;
  xp: number;
}

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [searchFriend, setSearchFriend] = useState('');
  const [profile, setProfile] = useState({
    myStory: "I'm on a journey to become the best version of myself through consistent daily improvement.",
    workingOn: "Building a successful side business while maintaining work-life balance",
    routines: "Morning meditation, evening journaling, daily workout, reading before bed",
    fears: "Fear of not reaching my potential, procrastination, comfort zone",
    dreamLife: "Financial freedom, meaningful relationships, continuous learning, and making a positive impact"
  });

  const [friends] = useState<Friend[]>([
    { id: '1', username: 'SenseiMike', level: 47, streak: 31, avatar: '🥋', xp: 12450 },
    { id: '2', username: 'KaizenQueen', level: 52, streak: 28, avatar: '👑', xp: 15200 },
    { id: '3', username: 'WarriorPath', level: 39, streak: 45, avatar: '⚔️', xp: 9800 },
    { id: '4', username: 'ZenMaster', level: 61, streak: 67, avatar: '🧘', xp: 18900 }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to your backend/database
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-6 bg-gradient-to-br from-gray-900/50 to-slate-900/20 border border-cyan-500/20 rounded-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Your Warrior Profile</h2>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="space-y-6">
          {Object.entries({
            myStory: "My Story",
            workingOn: "What I'm Working On",
            routines: "My Routines",
            fears: "My Challenges",
            dreamLife: "My Dream Life"
          }).map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
              {isEditing ? (
                <textarea
                  value={profile[key as keyof typeof profile]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                  rows={3}
                />
              ) : (
                <p className="text-gray-300 bg-gray-800/30 p-3 rounded-lg">
                  {profile[key as keyof typeof profile]}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Friends System */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="p-6 bg-gradient-to-br from-gray-900/50 to-slate-900/20 border border-cyan-500/20 rounded-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-cyan-400" />
            Dojo Friends
          </h2>
          <span className="text-cyan-400 font-mono">{friends.length} Warriors</span>
        </div>

        {/* Search Friends */}
        <div className="mb-6">
          <input
            type="text"
            value={searchFriend}
            onChange={(e) => setSearchFriend(e.target.value)}
            placeholder="Search for warriors by username..."
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>

        {/* Friends List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {friends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 bg-gray-800/30 border border-gray-600/30 rounded-xl hover:border-cyan-500/50 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{friend.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {friend.username}
                    </h4>
                    <p className="text-sm text-gray-400">Level {friend.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-orange-400 mb-1">
                    <Flame className="h-4 w-4" />
                    <span className="font-bold">{friend.streak}</span>
                  </div>
                  <p className="text-xs text-gray-400">{friend.xp.toLocaleString()} XP</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Friend Button */}
        <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-600 hover:border-cyan-500 text-gray-400 hover:text-cyan-400 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
          <Users className="h-5 w-5" />
          Add New Warrior Friend
        </button>
      </motion.div>

      {/* AI Challenge Personalization Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="p-6 bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border border-cyan-500/30 rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Target className="h-6 w-6 text-cyan-400" />
          Personalized Sensei Challenge
        </h2>
        <div className="bg-black/40 p-4 rounded-lg border border-cyan-500/20">
          <p className="text-cyan-400 font-mono text-lg mb-2">
            "Based on your fear of not reaching potential and your goal of building a side business..."
          </p>
          <p className="text-white text-lg">
            Challenge: Spend 2 hours today working on your side business, then record a 1-minute video 
            explaining what you accomplished and share it with someone who supports your journey.
          </p>
          <div className="flex justify-between items-center mt-4 text-sm">
            <div className="flex gap-4 text-gray-400">
              <span>Difficulty: Medium</span>
              <span>Skills: Wealth + Discipline</span>
            </div>
            <span className="text-cyan-400 font-bold">+150 XP</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mt-3">
          * Challenges are generated based on your profile information and current progress
        </p>
      </motion.div>
    </div>
  );
};

export default UserProfile;