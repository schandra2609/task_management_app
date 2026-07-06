import { useState } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';

const TaskForm = ({ isOpen, onClose, onSave, initialData }) => {
    const [task, setTask] = useState(initialData || { 
        title: '', 
        description: '', 
        status: 'PENDING', 
        dueDate: '' 
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold">{initialData?._id ? 'Edit Task' : 'Add New Task'}</h2>
                    <button onClick={onClose} className="hover:rotate-90 transition-transform"><FaTimes /></button>
                </div>
                
                <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onSave(task); }}>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Task Title *</label>
                        <input 
                            required
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            value={task.title}
                            onChange={(e) => setTask({...task, title: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Description</label>
                        <textarea 
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none h-24"
                            value={task.description}
                            onChange={(e) => setTask({...task, description: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Status</label>
                            <select 
                                className="w-full p-2 border rounded bg-white"
                                value={task.status}
                                onChange={(e) => setTask({...task, status: e.target.value})}
                            >
                                <option value="PENDING">Pending</option>
                                <option value="IN-PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Due Date</label>
                            <input 
                                type="date"
                                className="w-full p-2 border rounded"
                                value={task.dueDate ? task.dueDate.split('T')[0] : ''}
                                onChange={(e) => setTask({...task, dueDate: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-2 border rounded-md hover:bg-gray-100 transition">Cancel</button>
                        <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2">
                            <FaSave /> <span>Save Task</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;