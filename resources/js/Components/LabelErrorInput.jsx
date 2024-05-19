export default function LabelErrorInput({ message }) {
    return (
        <div className="label">
            <span className="text-xs opacity-100 text-red-500">{message}</span>
        </div>
    );
}
