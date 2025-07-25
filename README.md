# RACI Matrix Application

A beautiful, interactive RACI (Responsible, Accountable, Consulted, Informed) matrix application for managing team responsibilities and project accountability.

## 🚀 Features

- **Interactive RACI Matrix**: Easily assign and visualize team responsibilities
- **Team Management**: Add, edit, and remove team members with role information
- **Task Management**: Create tasks with categories, priorities, and due dates
- **Search & Filter**: Quickly find tasks by name, description, or category
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Data Persistence**: Your data is automatically saved in browser storage
- **Export Ready**: Built-in export functionality for sharing and reporting

## 🎯 RACI Roles Explained

- **R - Responsible**: The person who does the work
- **A - Accountable**: The person who signs off on the work
- **C - Consulted**: People who provide input and expertise
- **I - Informed**: People who need to be kept in the loop

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/raci-matrix.git
cd raci-matrix
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 📱 Usage

1. **Add Team Members**: Click "Add Member" to add team members with their roles and departments
2. **Create Tasks**: Click "Add Task" to create new tasks with descriptions, categories, and priorities
3. **Assign Roles**: Use the dropdown menus in the matrix to assign RACI roles to team members for each task
4. **Search & Filter**: Use the search bar and category filter to find specific tasks
5. **Export Data**: Click the "Export" button to download your RACI matrix

## 🎨 Customization

The application uses a modern design system with:
- Professional color palette
- Responsive breakpoints
- Smooth animations and transitions
- Accessible design patterns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

This application implements comprehensive security measures including:
- Input validation and sanitization to prevent XSS attacks
- Content Security Policy (CSP) headers
- Rate limiting to prevent abuse
- Secure local storage handling
- HTTP security headers for additional protection

For detailed security information, see [SECURITY.md](SECURITY.md).

### Security Features:
- ✅ XSS Protection through input sanitization
- ✅ CSRF Protection (client-side only app)
- ✅ Clickjacking prevention with X-Frame-Options
- ✅ Rate limiting on user actions
- ✅ Secure data validation and storage
- ✅ Content Security Policy implementation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ for better team collaboration