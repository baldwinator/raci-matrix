import { RACIData } from '../types/raci';

export const sampleData: RACIData = {
  teamMembers: [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Engineering',
      role: 'Senior Developer'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      department: 'Product',
      role: 'Product Manager'
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      department: 'Design',
      role: 'UX Designer'
    },
    {
      id: '4',
      name: 'Alex Rodriguez',
      email: 'alex.rodriguez@company.com',
      department: 'Engineering',
      role: 'Tech Lead'
    },
    {
      id: '5',
      name: 'Jessica Taylor',
      email: 'jessica.taylor@company.com',
      department: 'Marketing',
      role: 'Marketing Manager'
    }
  ],
  tasks: [
    {
      id: '1',
      name: 'Design User Authentication Flow',
      description: 'Create wireframes and prototypes for the new user authentication system',
      category: 'Design',
      priority: 'High',
      dueDate: '2024-02-15',
      assignments: {
        '1': 'C',
        '2': 'A',
        '3': 'R',
        '4': 'C',
        '5': 'I'
      }
    },
    {
      id: '2',
      name: 'Implement Authentication API',
      description: 'Develop backend API endpoints for user authentication and authorization',
      category: 'Development',
      priority: 'High',
      dueDate: '2024-02-28',
      assignments: {
        '1': 'R',
        '2': 'C',
        '3': 'I',
        '4': 'A',
        '5': 'I'
      }
    },
    {
      id: '3',
      name: 'Create Marketing Campaign',
      description: 'Develop and execute marketing campaign for product launch',
      category: 'Marketing',
      priority: 'Medium',
      dueDate: '2024-03-15',
      assignments: {
        '1': 'I',
        '2': 'C',
        '3': 'C',
        '4': 'I',
        '5': 'R'
      }
    },
    {
      id: '4',
      name: 'Security Audit',
      description: 'Conduct comprehensive security review of the authentication system',
      category: 'Security',
      priority: 'High',
      dueDate: '2024-03-01',
      assignments: {
        '1': 'C',
        '2': 'A',
        '3': 'I',
        '4': 'R',
        '5': 'I'
      }
    },
    {
      id: '5',
      name: 'User Testing Sessions',
      description: 'Organize and conduct user testing for the new authentication flow',
      category: 'Research',
      priority: 'Medium',
      dueDate: '2024-02-20',
      assignments: {
        '1': 'I',
        '2': 'A',
        '3': 'R',
        '4': 'I',
        '5': 'C'
      }
    },
    {
      id: '6',
      name: 'Performance Optimization',
      description: 'Optimize API response times and database queries',
      category: 'Development',
      priority: 'Low',
      dueDate: '2024-03-30',
      assignments: {
        '1': 'R',
        '2': 'C',
        '3': 'I',
        '4': 'A',
        '5': 'I'
      }
    }
  ]
};