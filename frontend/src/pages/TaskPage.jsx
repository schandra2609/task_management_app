import { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaFilter, FaClipboardList, FaSearch, FaSortAmountDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getTasks, createTask, updateTask, updateTaskStatus, deleteTask } from '../services/taskService.js';
import TaskItem from '../components/TaskItem.jsx';
import TaskForm from '../components/TaskForm.jsx';

const TaskPage = () => {
    // --- State Management ---
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // --- Server-side Query States ---
    const [filter, setFilter] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(null);

    // --- Debounced search ---
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1); // Reset to page 1 on new search
        }, 400);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // --- Map sort option to API params ---
    const getSortParams = (sortOption) => {
        switch (sortOption) {
            case 'newest': return { sortBy: 'createdAt', order: 'desc' };
            case 'oldest': return { sortBy: 'createdAt', order: 'asc' };
            case 'dueDate': return { sortBy: 'dueDate', order: 'asc' };
            case 'title': return { sortBy: 'title', order: 'asc' };
            default: return { sortBy: 'createdAt', order: 'desc' };
        }
    };

    // --- Data Fetching ---
    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const { sortBy: sortField, order } = getSortParams(sortBy);
            const response = await getTasks({
                page: currentPage,
                limit: 6,
                status: filter,
                search: debouncedSearch,
                sortBy: sortField,
                order,
            });
            setTasks(Array.isArray(response.data) ? response.data : []);
            setPagination(response.pagination || null);
        } catch (err) {
            console.error("Fetch Error:", err);
            setTasks([]);
            setPagination(null);
        } finally {
            setLoading(false);
        }
    }, [currentPage, filter, debouncedSearch, sortBy]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // --- Action Handlers ---
    const handleSave = async (taskData) => {
        try {
            if (editingTask?._id) await updateTask(editingTask._id, taskData);
            else await createTask(taskData);
            setIsModalOpen(false);
            setEditingTask(null);
            fetchTasks();
        } catch (err) {
            console.error("Save Error:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await deleteTask(id);
                fetchTasks();
            } catch (err) {
                console.error("Delete Error:", err);
            }
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await updateTaskStatus(taskId, newStatus);
            fetchTasks();
        } catch (err) {
            console.error("Status Update Error:", err);
        }
    };

    // --- Reset to page 1 when filter/sort changes ---
    const handleFilterChange = (value) => {
        setFilter(value);
        setCurrentPage(1);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        setCurrentPage(1);
    };

    return (
        <div className="max-w-6xl mx-auto py-6 px-4 sm:py-10">
            {/* Page Header */}
            <div className="mb-8 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold font-times text-slate-900 flex items-center justify-center md:justify-start gap-3">
                    <FaClipboardList className="text-blue-600" />
                    My Workspace
                </h2>
                <p className="text-gray-500 mt-2 text-sm md:text-base">
                    Efficiently manage, search, and organize your tasks.
                </p>
            </div>

            {/* Controls Section: Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                
                {/* Search Bar */}
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text"
                        placeholder="Search title"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Status Filter */}
                <div className="relative">
                    <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <select 
                        className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl bg-white outline-none appearance-none cursor-pointer shadow-sm font-medium"
                        value={filter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="IN-PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>

                {/* Sort Controls */}
                <div className="relative">
                    <FaSortAmountDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <select 
                        className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl bg-white outline-none appearance-none cursor-pointer shadow-sm font-medium"
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        <option value="newest">Newest Created</option>
                        <option value="oldest">Oldest Created</option>
                        <option value="dueDate">Due Date (Closest)</option>
                        <option value="title">Title (A-Z)</option>
                    </select>
                </div>

                {/* Add New Task Button */}
                <button 
                    onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
                >
                    <FaPlus /> <span>New Task</span>
                </button>
            </div>

            {/* Task List Section */}
            {loading ? (
                <div className="flex flex-col justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-500 font-medium">Syncing with server...</p>
                </div>
            ) : tasks.length > 0 ? (
                <>
                    <div className="grid gap-4 animate-fadeIn">
                        {tasks.map(task => (
                            <TaskItem 
                                key={task._id} 
                                task={task} 
                                onDelete={handleDelete}
                                onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-10">
                            <button
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                disabled={!pagination.hasPrevPage}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                                    pagination.hasPrevPage 
                                        ? 'bg-white border border-gray-200 text-slate-700 hover:bg-gray-50 shadow-sm' 
                                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                }`}
                            >
                                <FaChevronLeft className="text-sm" /> Previous
                            </button>

                            <div className="flex items-center gap-2">
                                {/* Generate page numbers */}
                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                                    .filter(page => {
                                        // Show first, last, current, and adjacent pages
                                        return page === 1 
                                            || page === pagination.totalPages 
                                            || Math.abs(page - currentPage) <= 1;
                                    })
                                    .reduce((acc, page, idx, arr) => {
                                        // Insert ellipsis markers
                                        if (idx > 0 && page - arr[idx - 1] > 1) {
                                            acc.push('...');
                                        }
                                        acc.push(page);
                                        return acc;
                                    }, [])
                                    .map((item, idx) =>
                                        item === '...' ? (
                                            <span key={`dots-${idx}`} className="px-2 text-gray-400">…</span>
                                        ) : (
                                            <button
                                                key={item}
                                                onClick={() => setCurrentPage(item)}
                                                className={`w-10 h-10 rounded-xl font-medium transition-all ${
                                                    currentPage === item
                                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                                        : 'bg-white border border-gray-200 text-slate-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                {item}
                                            </button>
                                        )
                                    )
                                }
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                disabled={!pagination.hasNextPage}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                                    pagination.hasNextPage 
                                        ? 'bg-white border border-gray-200 text-slate-700 hover:bg-gray-50 shadow-sm' 
                                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                }`}
                            >
                                Next <FaChevronRight className="text-sm" />
                            </button>
                        </div>
                    )}

                    {/* Results Summary */}
                    {pagination && (
                        <p className="text-center text-sm text-gray-400 mt-4">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </p>
                    )}
                </>
            ) : (
                <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaSearch className="text-gray-300 text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">No tasks found</h3>
                    <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                        Try adjusting your search, filters, or add a new task to get started.
                    </p>
                    {(searchTerm || filter !== 'ALL') && (
                        <button 
                            onClick={() => { setSearchTerm(''); setFilter('ALL'); setCurrentPage(1); }}
                            className="mt-4 text-blue-600 font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            )}

            {/* Modal for Add/Edit */}
            <TaskForm 
                key={editingTask?._id || 'new-task'}
                isOpen={isModalOpen} 
                onClose={() => { setIsModalOpen(false); setEditingTask(null); }} 
                onSave={handleSave}
                initialData={editingTask}
            />
        </div>
    );
};

export default TaskPage;