import React, { useState } from 'react';
import { Search, Plus, Filter, Download, Users } from 'lucide-react';
import { Task, TeamMember, RACIData } from '../types/raci';
import TaskRow from './TaskRow';
import TeamMemberHeader from './TeamMemberHeader';
import AddTaskModal from './AddTaskModal';
import AddMemberModal from './AddMemberModal';

interface RACIMatrixProps {
  data: RACIData;
  onUpdateData: (data: RACIData) => void;
}

const RACIMatrix: React.FC<RACIMatrixProps> = ({ data, onUpdateData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);

  const filteredTasks = data.tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || task.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(data.tasks.map(task => task.category)))];

  const handleTaskUpdate = (updatedTask: Task) => {
    const updatedTasks = data.tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    onUpdateData({ ...data, tasks: updatedTasks });
  };

  const handleTaskDelete = (taskId: string) => {
    const updatedTasks = data.tasks.filter(task => task.id !== taskId);
    onUpdateData({ ...data, tasks: updatedTasks });
  };

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      assignments: {}
    };
    onUpdateData({ ...data, tasks: [...data.tasks, task] });
    setShowAddTask(false);
  };

  const handleAddMember = (newMember: Omit<TeamMember, 'id'>) => {
    const member: TeamMember = {
      ...newMember,
      id: Date.now().toString()
    };
    onUpdateData({ ...data, teamMembers: [...data.teamMembers, member] });
    setShowAddMember(false);
  };

  const handleMemberDelete = (memberId: string) => {
    const updatedMembers = data.teamMembers.filter(member => member.id !== memberId);
    const updatedTasks = data.tasks.map(task => ({
      ...task,
      assignments: Object.fromEntries(
        Object.entries(task.assignments).filter(([id]) => id !== memberId)
      )
    }));
    onUpdateData({ tasks: updatedTasks, teamMembers: updatedMembers });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RACI Matrix</h1>
          <p className="text-gray-600">Manage responsibilities and accountability across your team</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddMember(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Users className="h-4 w-4" />
                Add Member
              </button>
              <button
                onClick={() => setShowAddTask(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Task
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* RACI Legend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">RACI Legend</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">R</div>
              <div>
                <div className="font-medium text-gray-900">Responsible</div>
                <div className="text-sm text-gray-600">Does the work</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold">A</div>
              <div>
                <div className="font-medium text-gray-900">Accountable</div>
                <div className="text-sm text-gray-600">Signs off on work</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center font-semibold">C</div>
              <div>
                <div className="font-medium text-gray-900">Consulted</div>
                <div className="text-sm text-gray-600">Provides input</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold">I</div>
              <div>
                <div className="font-medium text-gray-900">Informed</div>
                <div className="text-sm text-gray-600">Kept in the loop</div>
              </div>
            </div>
          </div>
        </div>

        {/* Matrix */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 min-w-64">Task</th>
                  {data.teamMembers.map(member => (
                    <TeamMemberHeader
                      key={member.id}
                      member={member}
                      onDelete={() => handleMemberDelete(member.id)}
                    />
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTasks.map(task => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    teamMembers={data.teamMembers}
                    onUpdate={handleTaskUpdate}
                    onDelete={() => handleTaskDelete(task.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredTasks.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterCategory !== 'All' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first task'}
            </p>
            {(!searchTerm && filterCategory === 'All') && (
              <button
                onClick={() => setShowAddTask(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add First Task
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddTask && (
        <AddTaskModal
          onAdd={handleAddTask}
          onClose={() => setShowAddTask(false)}
        />
      )}

      {showAddMember && (
        <AddMemberModal
          onAdd={handleAddMember}
          onClose={() => setShowAddMember(false)}
        />
      )}
    </div>
  );
};

export default RACIMatrix;