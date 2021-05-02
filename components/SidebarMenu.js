export default function SidebarMenu({ children, title }) {
    return (
        <div className="p-4">
            <h3 className="text-xl py-4">{title}</h3>
            {children}
        </div>
    );
}