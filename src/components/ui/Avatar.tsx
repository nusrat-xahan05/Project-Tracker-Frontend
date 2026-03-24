interface AvatarProps {
    name: string;
}

export default function Avatar({ name }: AvatarProps) {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    // BG Color based on the name length
    const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500'];
    const colorIndex = name.length % colors.length;

    return (
        <div
            className={`h-7 w-7 rounded-full ${colors[colorIndex]} text-white flex items-center justify-center text-xs font-bold shadow-sm`}
            title={name}>
            {initials}
        </div>
    );
}