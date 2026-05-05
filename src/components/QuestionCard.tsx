import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface Question {
  id: number;
  category: string;
  question: string;
  answer: string;
}

interface QuestionCardProps {
  item: Question;
}

export function QuestionCard({ item }: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getCategoryStyles = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('coding')) return 'bg-blue-50 text-blue-600';
    if (cat.includes('networking')) return 'bg-purple-50 text-purple-600';
    if (cat.includes('personal') || cat.includes('behavioral')) return 'bg-emerald-50 text-emerald-600';
    if (cat.includes('design')) return 'bg-amber-50 text-amber-600';
    return 'bg-slate-100 text-slate-600';
  };

  return (
    <div 
      className={`group border rounded-xl overflow-hidden transition-all duration-200 ${
        isOpen 
          ? 'bg-white border-slate-200 shadow-sm ring-2 ring-blue-500/10' 
          : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
      }`}
      id={`question-${item.id}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-start justify-between gap-4 focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex-1 flex gap-4">
          <span className={`px-2.5 py-0.5 mt-1 rounded text-[10px] font-bold uppercase tracking-wider h-fit ${getCategoryStyles(item.category)}`}>
            {item.category}
          </span>
          <div>
            <h3 className={`text-lg transition-colors leading-tight ${isOpen ? 'font-semibold text-slate-900' : 'font-medium text-slate-800'}`}>
              {item.question}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0 mt-1">
          {!isOpen && (
            <span className="text-sm text-slate-400 font-medium italic hidden sm:inline">View Answer</span>
          )}
          <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-slate-900' : 'text-slate-300 group-hover:text-slate-500'}`}>
            <ChevronDown size={20} />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="px-6 pb-8 ml-4 pl-16">
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {item.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
