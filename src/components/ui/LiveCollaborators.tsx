import { useLiveCollaborators } from '../../hooks/useLiveCollaborators';

export default function LiveCollaborators() {
    const collaborators = useLiveCollaborators();

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden py-1 px-1">
                {collaborators.map((user) => (
                    <div key={user.id}
                        className="relative group cursor-help transition-transform hover:-translate-y-1 hover:z-20">
                        {/* Avatar Circle */}
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white
                            ${user.color}`}>
                            {getInitials(user.name)}
                        </div>

                        {/* Status Indicator Dot */}
                        <div className={`
                            absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white
                            ${user.action === 'editing' ? 'bg-orange-400 animate-pulse' :
                                user.action === 'viewing' ? 'bg-blue-400' : 'bg-gray-300'}
                        `} />

                        {/* Tooltip on Hover */}
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-800 text-white text-[10px] py-1 px-2 rounded pointer-events-none z-30">
                            <span className="font-semibold block">{user.name}</span>
                            <span className="text-gray-300 capitalize">{user.action}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}