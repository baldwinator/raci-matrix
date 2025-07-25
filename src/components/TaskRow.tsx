import React, { useState } from 'react';
import { Edit2, Trash2, Calendar, Flag } from 'lucide-react';
import { Task, TeamMember } from '../types/raci';

interface TaskRowProps {
  task: Task;
  teamMembers: TeamMember[];
  onUpdate: (task: Task) => void;
  onDelete: () => void;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, teamMembers, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleRoleChange = (memberId: string, role: 'R' | 'A' | 'C' | 'I' | null) => {
    const updatedTask = {
      ...task,
      assignments: {
        ...task.assignments,
        [memberId]: role
      }
    };
    onUpdate(updatedTask);
  };

  const getRoleColor = (role: string | null) => {
    switch (role) {
      case 'R': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'A': return 'bg-green-100 text-green-700 border-green-200';
      case 'C': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'I': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-400 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6 border-r border-gray-200">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{task.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              {task.category}
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
              <Flag className="h-3 w-3" />
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="inline-flex items-center gap-1 text-gray-500">
                <Calendar className="h-3 w-3" />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </td>
      {teamMembers.map(member => (
        <td key={member.id} className="py-4 px-6 text-center border-r border-gray-200 last:border-r-0">
          <div className="flex justify-center">
            <select
              value={task.assignments[member.id] || ''}
              onChange={(e) => handleRoleChange(member.id, e.target.value as any || null)}
              className={`w-12 h-12 rounded-full border-2 text-center font-semibold text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${getRoleColor(task.assignments[member.id])}`}
            >
              <option value="">-</option>
              <option value="R">R</option>
              <option value="A">A</option>
              <option value="C">C</option>
              <option value="I">I</option>
            </select>
          </div>
        </td>
      ))}
    </tr>
  );
};

export default TaskRow;