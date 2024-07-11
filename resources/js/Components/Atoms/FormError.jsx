export default function FormError({ message, className = "", ...props }) {
    return message ? (
        <small {...props} className={"text-red-700 -mt-1 text-xs" + className}>
            {message}
        </small>
    ) : null;
}
