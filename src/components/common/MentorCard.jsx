import React, { useState } from 'react';
import { Award, Mail, Phone, ShieldCheck, CheckCircle2, MessageSquare, Star } from 'lucide-react';
import { Modal } from './Modal';
import { useToast } from '../../context/ToastContext';

export const MentorCard = ({ mentor, isAssigned = false, onAssign }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState('');
  const { addToast } = useToast();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    addToast({
      title: `Message Sent to Coach ${mentor.name}!`,
      message: "Your note has been submitted to your coach dashboard.",
      type: "success"
    });
    setMessage('');
    setShowContactModal(false);
  };

  return (
    <>
      <div
        className={`glass-card p-6 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
          isAssigned
            ? 'border-emerald-500/50 bg-gradient-to-b from-slate-900 to-emerald-950/20 shadow-xl shadow-emerald-500/10'
            : 'border-slate-800 hover:border-slate-700'
        }`}
      >
        {isAssigned && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-md shadow-emerald-500/20">
            <CheckCircle2 className="w-3 h-3 stroke-[3]" /> Assigned Mentor
          </div>
        )}

        <div>
          {/* Avatar & Header */}
          <div className="flex items-center gap-4">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/30 shadow-md"
            />
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                {mentor.name}
              </h3>
              <p className="text-xs font-medium text-emerald-400">{mentor.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  {mentor.license}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  {mentor.experience} Exp
                </span>
              </div>
            </div>
          </div>

          {/* Philosophy */}
          {mentor.philosophy && (
            <p className="text-xs text-slate-300 italic mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 leading-relaxed">
              "{mentor.philosophy}"
            </p>
          )}

          {/* Achievements */}
          {mentor.achievements && mentor.achievements.length > 0 && (
            <div className="mt-4">
              <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400" /> Key Career Highlights
              </h4>
              <ul className="text-xs text-slate-300 space-y-1">
                {mentor.achievements.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-3">
          <button
            onClick={() => setShowContactModal(true)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
          >
            <MessageSquare className="w-4 h-4" />
            Contact Coach
          </button>

          {!isAssigned && onAssign && (
            <button
              onClick={() => onAssign(mentor.id)}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
              title="Set as Primary Assigned Mentor"
            >
              Set Primary
            </button>
          )}
        </div>
      </div>

      {/* Contact Coach Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title={`Message Coach ${mentor.name}`}
      >
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
            <img src={mentor.avatar} alt={mentor.name} className="w-12 h-12 rounded-xl object-cover" />
            <div>
              <h4 className="font-bold text-white text-sm">{mentor.name}</h4>
              <p className="text-xs text-emerald-400">{mentor.specialization}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Subject / Topic
            </label>
            <input
              type="text"
              defaultValue="Tactical Guidance & Training Feedback"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Your Message to Coach
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask for advice on your position, tasks, or request a performance review..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 outline-none resize-none"
              required
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 text-slate-950 font-bold text-xs hover:bg-emerald-500 transition-all flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" /> Send Note
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
