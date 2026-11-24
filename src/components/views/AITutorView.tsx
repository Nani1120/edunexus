import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Image as ImageIcon, 
  Globe, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Zap, 
  RotateCcw, 
  BookOpen, 
  User, 
  Bot, 
  Clock, 
  Copy, 
  Check, 
  ArrowRight,
  Layers,
  Flame,
  Key
} from 'lucide-react';
import { AIMessage, StudentProfile, PreferredLanguage } from '../../types';
import { askAITutor, TutorMode } from '../../services/aiTutor';

interface AITutorViewProps {
  profile: StudentProfile;
  initialTopic?: string;
  chatHistory: AIMessage[];
  onSaveChats: (messages: AIMessage[]) => void;
  onNavigateToPractice: () => void;
}

const MODES: { id: TutorMode; label: string; desc: string; icon: any }[] = [
  { id: 'explain_simply', label: 'Explain Simply (ELI5)', desc: 'Real-world analogies and beginner clarity', icon: Sparkles },
  { id: 'detailed', label: 'Detailed Academic', desc: 'In-depth conceptual formulations and mechanics', icon: BookOpen },
  { id: 'exam_mode', label: '10-Mark Exam Answer', desc: 'University formatted headings, diagrams & points', icon: FileText },
  { id: 'short_notes', label: 'Short Revision Notes', desc: 'Bullet points and formula cheat sheets', icon: Zap },
  { id: 'mcq_practice', label: 'Generate MCQ Practice', desc: 'Instant interactive test question with explanation', icon: HelpCircle },
  { id: 'revision', label: 'Quick Recall', desc: 'Rapid-fire Q&A and memory triggers', icon: RotateCcw },
];

export const AITutorView: React.FC<AITutorViewProps> = ({
  profile,
  initialTopic,
  chatHistory,
  onSaveChats,
  onNavigateToPractice
}) => {
  const [messages, setMessages] = useState<AIMessage[]>(chatHistory);
  const [inputQuery, setInputQuery] = useState(initialTopic || '');
  const [selectedMode, setSelectedMode] = useState<TutorMode>('explain_simply');
  const [selectedLanguage, setSelectedLanguage] = useState<PreferredLanguage>(profile.preferredLanguage || 'en');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedMCQOption, setSelectedMCQOption] = useState<{ [msgId: string]: number }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query && !attachedImage) return;

    const userMessage: AIMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      content: query || (attachedImage ? `Please analyze and solve the question in this image: ${attachedImage}` : ''),
      timestamp: new Date().toISOString(),
      mode: selectedMode,
      language: selectedLanguage
    };

    const updated = [...messages, userMessage];
    setMessages(updated);
    setInputQuery('');
    const currentAttachment = attachedImage;
    setAttachedImage(null);
    setIsLoading(true);

    try {
      const response = await askAITutor({
        prompt: query,
        mode: selectedMode,
        language: selectedLanguage,
        profile,
        attachedImageName: currentAttachment || undefined,
        apiKey: apiKey || undefined
      });

      const finalMessages = [...updated, response];
      setMessages(finalMessages);
      onSaveChats(finalMessages);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulateImageUpload = () => {
    const sampleImages = [
      'Circuit_Mesh_Analysis_Q4.png',
      'AVL_Tree_Double_Rotation_Graph.png',
      'Cardiac_Wiggers_Diagram_ECG.png',
      'Class10_Optics_Concave_Mirror_Ray.png'
    ];
    const picked = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setAttachedImage(picked);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (confirm('Clear chat history?')) {
      const resetMsg: AIMessage[] = [{
        id: 'msg-welcome-new',
        sender: 'assistant',
        content: `Chat cleared. Ready for your next academic question in ${selectedLanguage === 'te' ? 'Telugu' : selectedLanguage === 'hi' ? 'Hindi' : 'English'}!`,
        timestamp: new Date().toISOString()
      }];
      setMessages(resetMsg);
      onSaveChats(resetMsg);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[850px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-fadeIn">
      
      {/* Top Header & Mode Switcher */}
      <div className="p-4 bg-slate-50/90 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent text-white flex items-center justify-center shadow-md shadow-brand-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  EduNexus AI Academic Tutor
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300">
                  {profile.category.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Level-aware intelligence • Multi-language verified reasoning
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="flex items-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-0.5 text-xs">
              <button
                onClick={() => setSelectedLanguage('en')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  selectedLanguage === 'en' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setSelectedLanguage('te')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  selectedLanguage === 'te' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setSelectedLanguage('hi')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  selectedLanguage === 'hi' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* API Key Modal Toggle */}
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="p-2 text-slate-500 hover:text-brand-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Add Custom Gemini API Key (Optional)"
            >
              <Key className="w-4 h-4" />
            </button>

            {/* Clear history */}
            <button
              onClick={handleClearHistory}
              className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Clear Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Optional Custom API Key drawer */}
        {showKeyInput && (
          <div className="p-3 bg-brand-50 dark:bg-brand-950/60 rounded-xl border border-brand-200 dark:border-brand-800 flex items-center gap-2 text-xs">
            <Key className="w-4 h-4 text-brand-600 shrink-0" />
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste Google Gemini API Key for live AI responses (or leave empty to use built-in engine)..."
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs"
            />
            <button
              onClick={() => setShowKeyInput(false)}
              className="px-3 py-1.5 bg-brand-600 text-white rounded-lg font-bold"
            >
              Done
            </button>
          </div>
        )}

        {/* 6 Modes Pill Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {MODES.map((mode) => {
            const Icon = mode.icon;
            const isSelected = selectedMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-2xs ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-600 to-brand-accent text-white shadow-brand-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
                title={mode.desc}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${
                isUser 
                  ? 'bg-slate-800 dark:bg-slate-200 dark:text-slate-900' 
                  : 'bg-gradient-to-tr from-brand-600 to-brand-accent shadow-sm'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 sm:p-5 shadow-xs ${
                isUser
                  ? 'bg-brand-600 text-white rounded-tr-none'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none'
              }`}>
                
                {/* Message Header tags */}
                {!isUser && msg.mode && (
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300">
                      {msg.mode.replace('_', ' ')}
                    </span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}

                {/* Formatted Content */}
                <div 
                  className={`text-xs sm:text-sm leading-relaxed prose dark:prose-invert max-w-none ${isUser ? 'text-white' : ''}`}
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/### (.*)/g, '<h3 class="font-bold text-base mt-2 mb-1">$1</h3>')
                      .replace(/## (.*)/g, '<h2 class="font-bold text-lg mt-3 mb-2">$1</h2>')
                      .replace(/# (.*)/g, '<h1 class="font-black text-xl mt-4 mb-2">$1</h1>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                      .replace(/\n/g, '<br/>')
                  }}
                />

                {/* Interactive Quiz Card if generated */}
                {msg.quizData && (
                  <div className="mt-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-2">
                      {msg.quizData.question}
                    </h5>
                    <div className="space-y-1.5">
                      {msg.quizData.options.map((opt, optIdx) => {
                        const isChosen = selectedMCQOption[msg.id] === optIdx;
                        const isCorrect = optIdx === msg.quizData!.answerIndex;
                        const hasSelected = selectedMCQOption[msg.id] !== undefined;

                        let style = 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200';
                        if (hasSelected) {
                          if (isCorrect) style = 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border-emerald-500';
                          else if (isChosen) style = 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-200 border-red-500';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={hasSelected}
                            onClick={() => setSelectedMCQOption({ ...selectedMCQOption, [msg.id]: optIdx })}
                            className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold border border-transparent transition-all flex items-center justify-between ${style}`}
                          >
                            <span>{opt}</span>
                            {hasSelected && isCorrect && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                    {selectedMCQOption[msg.id] !== undefined && (
                      <div className="mt-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-[11px] text-slate-600 dark:text-slate-300">
                        <strong className="block text-slate-900 dark:text-white mb-0.5">Explanation:</strong>
                        {msg.quizData.explanation}
                      </div>
                    )}
                  </div>
                )}

                {/* Citations / Reference Attribution */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] text-slate-400">
                    <strong className="font-semibold text-slate-500 dark:text-slate-400">Citations: </strong>
                    <span>{msg.citations.join(' • ')}</span>
                  </div>
                )}

                {/* Follow up suggestions */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Suggested Follow-Ups:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(prompt)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950/60 text-[11px] font-medium border border-slate-200 dark:border-slate-700 transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-brand-accent text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-tl-none flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs font-semibold text-slate-500 ml-1">
                Synthesizing academic explanation...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Tray & Attachment Preview */}
      <div className="p-4 bg-slate-50/90 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800">
        {attachedImage && (
          <div className="mb-2 p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 flex items-center justify-between text-xs text-brand-700 dark:text-brand-300">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span className="font-bold truncate max-w-[200px]">{attachedImage}</span>
              <span className="text-[10px] bg-brand-200 dark:bg-brand-900 px-1.5 py-0.5 rounded">Ready for OCR Analysis</span>
            </div>
            <button
              onClick={() => setAttachedImage(null)}
              className="text-slate-400 hover:text-red-500 font-bold px-1"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Question Photo Upload Simulation */}
          <button
            onClick={handleSimulateImageUpload}
            className="p-3 text-slate-500 hover:text-brand-600 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl transition-all hover:scale-105 shadow-xs"
            title="Upload or take photo of exam question / textbook page"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            placeholder={`Ask in ${selectedLanguage === 'te' ? 'Telugu' : selectedLanguage === 'hi' ? 'Hindi' : 'English'} (e.g. "Explain AVL tree rotations with code")...`}
            className="flex-1 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
          />

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={(!inputQuery.trim() && !attachedImage) || isLoading}
            className="p-3 bg-gradient-to-r from-brand-600 to-brand-accent hover:from-brand-700 hover:to-brand-accentHover text-white rounded-2xl disabled:opacity-50 transition-all shadow-md shadow-brand-500/20 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
};
