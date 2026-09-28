import React, { useState } from 'react';
import { Plus, Filter, ClipboardCheck, Dumbbell, ShieldAlert, Activity, Brain, Sparkles } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { TaskCard } from '../components/common/TaskCard';
import { Modal } from '../components/common/Modal';

export const Tasks = () => {
  const { tasks, toggleTaskStatus, addTask } = useAcademy();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form state
  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    description: '',
    category: 'Technical',
    difficulty: 'Medium',
    duration: '30 mins',
    dueDate: new Date().toISOString().split('T')[0],
    coachNote: '',
  });

  const categories = ['All', 'Technical', 'Tactical', 'Fitness', 'Mental', 'Recovery'];
  const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

  // Filter logic
  const filteredTasks = tasks.filter((t) => {
    const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchStatus = selectedStatus === 'All' || t.status === selectedStatus;
    return matchCat && matchStatus;
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskForm.title.trim()) return;

    addTask(newTaskForm);
    setNewTaskForm({
      title: '',
      description: '',
      category: 'Technical',
      difficulty: 'Medium',
      duration: '30 mins',
      dueDate: new Date().toISOString().split('T')[0],
      coachNote: '',
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <ClipboardCheck className="w-7 h-7 text-emerald-400" /> Training Tasks & Assignments
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete daily drills assigned by your coach to increase your performance index & streak
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add Self-Assigned Task
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2 text-xs text-slate-400 w-full md:w-auto justify-end">
          <span className="font-semibold uppercase tracking-wider">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
          >
            {statuses.map((st) => (
              <option key={st} value={st} className="bg-slate-900 text-white">
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggleStatus={toggleTaskStatus} />
          ))
        ) : (
          <div className="col-span-full glass-card p-12 rounded-3xl border border-slate-800 text-center text-slate-400">
            <ClipboardCheck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No training tasks found</h3>
            <p className="text-xs text-slate-400 mt-1">Try clearing filters or adding a new self-assigned task.</p>
          </div>
        )}
      </div>

      {/* ADD TASK MODAL */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Training Task"
      >
        <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Task Title *</label>
            <input
              type="text"
              value={newTaskForm.title}
              onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
              placeholder="e.g. 50 Non-dominant Foot Target Passes"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Description</label>
            <textarea
              rows={3}
              value={newTaskForm.description}
              onChange={(e) => setNewTaskForm({ ...newTaskForm, description: e.target.value })}
              placeholder="Detail the drill instructions, sets, repetitions or target zones..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Category</label>
              <select
                value={newTaskForm.category}
                onChange={(e) => setNewTaskForm({ ...newTaskForm, category: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
              >
                {categories.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Difficulty</label>
              <select
                value={newTaskForm.difficulty}
                onChange={(e) => setNewTaskForm({ ...newTaskForm, difficulty: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
              >
                <option value="Easy" className="bg-slate-900">Easy</option>
                <option value="Medium" className="bg-slate-900">Medium</option>
                <option value="Hard" className="bg-slate-900">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Duration</label>
              <input
                type="text"
                value={newTaskForm.duration}
                onChange={(e) => setNewTaskForm({ ...newTaskForm, duration: e.target.value })}
                placeholder="30 mins"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Due Date</label>
              <input
                type="date"
                value={newTaskForm.dueDate}
                onChange={(e) => setNewTaskForm({ ...newTaskForm, dueDate: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:bg-emerald-400 transition-all"
            >
              Assign Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
