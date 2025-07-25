import React from 'react';
import { Trash2, Mail, Building } from 'lucide-react';
import { TeamMember } from '../types/raci';

interface TeamMemberHeaderProps {
  member: TeamMember;
  onDelete: () => void;
}

const TeamMemberHeader: React.FC<TeamMemberHeaderProps> = ({ member, onDelete }) => {
  return (
    <th className="text-center py-4 px-6 font-semibold text-gray-900 min-w-32 border-r border-gray-200 last:border-r-0">
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="text-center">
            <div className="font-semibold text-gray-900">{member.name}</div>
            <div className="text-xs text-gray-600 font-normal">{member.role}</div>
          </div>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-1 text-xs text-gray-500 font-normal">
          <div className="flex items-center justify-center gap-1">
            <Building className="h-3 w-3" />
            <span>{member.department}</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Mail className="h-3 w-3" />
            <span className="truncate">{member.email}</span>
          </div>
        </div>
      </div>
    </th>
  );
};

export default TeamMemberHeader;