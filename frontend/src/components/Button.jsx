const Button = ({ children, onClick, variant="primary", type="button" }) => {
    const styles = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
        outline: 'border border-gray-300 hover:bg-gray-100 text-gray-700'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 rounded transition-colors duration-200 font-medium ${styles[variant]}`}
        >
            {children}
        </button>
    );
};

export default Button;