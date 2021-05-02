export default function Sidebar( {children, isDark} ) {
    return (
        <div className="hidden sm:flex flex-initial bg-gray-100 text-black dark:bg-gray-900 dark:text-white p-4">
            <aside className>
                {children}            
            </aside>
        </div>
    );
}