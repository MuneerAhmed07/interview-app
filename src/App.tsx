import { useState, useMemo } from 'react';
import { Search, Brain, Filter, Github } from 'lucide-react';
import { motion } from 'motion/react';
import questionsData from './data/questions.json';
import { QuestionCard, type Question } from './components/QuestionCard';

const categories = ['All', ...new Set(questionsData.map(q => q.category))];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredQuestions = useMemo(() => {
    return questionsData.filter((q: Question) => {
      const matchesSearch = 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 px-6 md:px-10 pt-8 pb-6 md:pt-12 md:pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Interview.Bank</h1>
              <p className="text-slate-300 mt-2 text-base">A curated repository of high-impact engineering questions.</p>
            </div>
            <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] items-center">
              <span>v2.4.0</span>
              <span className="w-px h-3 bg-slate-200" />
              <span>Updated Today</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Search size={22} />
              </div>
              <input
                type="text"
                placeholder="Search questions, keywords, or topics..."
                className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-lg text-slate-900 placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                All Questions
              </button>
              {categories.filter(c => c !== 'All').map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main List */}
      <main className="flex-1 bg-slate-50/30 px-6 md:px-10 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q) => (
                <motion.div
                  key={q.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <QuestionCard item={q} />
                </motion.div>
              ))
            ) : (
              <div className="py-24 text-center space-y-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <Search size={32} />
                </div>
                <h3 className="text-slate-900 font-semibold text-lg">No matches found</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Try adjusting your search terms or filters to find what you're looking for.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                  className="text-blue-600 font-medium text-sm hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="px-6 md:px-10 py-6 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs text-slate-500 font-medium tracking-tight">Local Repository Synced</span>
            </div>
            <span className="text-slate-200">|</span>
            <span className="text-xs text-slate-500 font-medium tracking-tight">
              {questionsData.length} Questions Total
            </span>
          </div>
          <div className="flex gap-6">
            <button className="text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors">Export to PDF</button>
            <button className="text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors">Documentation</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
