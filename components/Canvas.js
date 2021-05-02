export default function Canvas( {children } ) {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            {children}
        </div>
    );
}