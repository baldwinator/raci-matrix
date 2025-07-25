export interface TeamMember {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
  assignments: {
    [memberId: string]: 'R' | 'A' | 'C' | 'I' | null;
  };
}

export interface RACIData {
  tasks: Task[];
  teamMembers: TeamMember[];
}