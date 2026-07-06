import { FaTrash, FaEdit, FaCheckCircle, FaClock, FaSpinner, FaArrowRight, FaUndo } from 'react-icons/fa';

const TaskItem = ({ task, onDelete, onEdit, onStatusChange }) => {
    const statusStyles = {
        'PENDING': 'bg-yellow-100 text-yellow-700 border-yellow-200',
        'IN-PROGRESS': 'bg-blue-100 text-blue-700 border-blue-200',
        'COMPLETED': 'bg-green-100 text-green-700 border-green-200'
    };

    const statusIcons = {
        'PENDING': <FaClock />,
        'IN-PROGRESS': <FaSpinner className="animate-spin-slow" />,
        'COMPLETED': <FaCheckCircle />
    };

    const statusLabels = {
        'PENDING': 'Pending',
        'IN-PROGRESS': 'In Progress',
        'COMPLETED': 'Completed'
    };

    // Status workflow: define what the "next" action is for each state
    const statusActions = {
        'PENDING': { next: 'IN-PROGRESS', label: 'Start', icon: <FaArrowRight />, color: 'text-blue-600 hover:bg-blue-50' },
        'IN-PROGRESS': { next: 'COMPLETED', label: 'Complete', icon: <FaCheckCircle />, color: 'text-green-600 hover:bg-green-50' },
        'COMPLETED': { next: 'PENDING', label: 'Reopen', icon: <FaUndo />, color: 'text-yellow-600 hover:bg-yellow-50' },
    };

    const currentAction = statusActions[task.status];

    return (
        <div className={`bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${task.status === 'COMPLETED' ? 'opacity-75' : ''}`}>
            <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full border flex items-center gap-1 ${statusStyles[task.status]}`}>
                        {statusIcons[task.status]} {statusLabels[task.status]}
                    </span>
                    {task.dueDate && <span className="text-xs text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                </div>
                <h3 className={`text-lg font-bold ${task.status === 'COMPLETED' ? 'line-through text-gray-400' : 'text-slate-800'}`}>
                    {task.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>
            </div>

            <div className="flex items-center space-x-2 border-t md:border-t-0 pt-3 md:pt-0">
                {/* Status workflow button */}
                <button 
                    onClick={() => onStatusChange(task._id, currentAction.next)} 
                    className={`p-2 rounded-lg transition flex items-center gap-1 text-sm font-medium ${currentAction.color}`} 
                    title={`${currentAction.label} Task`}
                >
                    {currentAction.icon}
                    <span className="hidden sm:inline">{currentAction.label}</span>
                </button>
                <button onClick={() => onEdit(task)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit Task">
                    <FaEdit className="text-xl" />
                </button>
                <button onClick={() => onDelete(task._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete Task">
                    <FaTrash className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;