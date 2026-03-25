import { useState, useEffect } from 'react';
import { ASSIGNEES } from '../types';

export interface Collaborator {
    id: string;
    name: string;
    color: string;
    action: 'viewing' | 'editing' | 'idle';
}

// A pool of potential teammates
const TEAM_POOL: Omit<Collaborator, 'action'>[] = ASSIGNEES.map((name, index) => {
    const colors = [
        'bg-pink-500',
        'bg-purple-500',
        'bg-indigo-500',
        'bg-teal-500',
        'bg-rose-500',
        'bg-orange-500'
    ];
    return {
        id: `u${index + 1}`,
        name: name,
        color: colors[index % colors.length],
    };
});


const ACTIONS = ['viewing', 'editing', 'idle'] as const;

export const useLiveCollaborators = () => {
    // Random users online
    const [activeUsers, setActiveUsers] = useState<Collaborator[]>([
        { ...TEAM_POOL[0], action: 'viewing' },
        { ...TEAM_POOL[1], action: 'idle' },
    ]);

    useEffect(() => {
        // User simulation using WebSocket
        const interval = setInterval(() => {
            setActiveUsers((currentUsers) => {
                const newUsers = [...currentUsers];
                const randomEvent = Math.random();

                if (randomEvent < 0.3 && newUsers.length < TEAM_POOL.length) {
                    const availableUsers = TEAM_POOL.filter(
                        (poolUser) => !newUsers.some((u) => u.id === poolUser.id)
                    );
                    if (availableUsers.length > 0) {
                        const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
                        newUsers.push({ ...randomUser, action: 'idle' });
                    }
                } else if (randomEvent < 0.5 && newUsers.length > 1) {
                    const removeIndex = Math.floor(Math.random() * newUsers.length);
                    newUsers.splice(removeIndex, 1);
                } else {
                    const updateIndex = Math.floor(Math.random() * newUsers.length);
                    if (newUsers[updateIndex]) {
                        const randomAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
                        newUsers[updateIndex].action = randomAction;
                    }
                }

                return newUsers;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return activeUsers;
};