"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import { useAvatar } from "../avatars/use-avatar";

interface AvatarProps {
    seed: string;
    name: string;
    className?: string;
}

export function AvatarImg({seed, name, className}: AvatarProps){
    const avatarURL = useAvatar(seed);
    return (
        <Avatar className={cn("size-5 border-white shadow-2xs", className)}>
            <AvatarImage src={avatarURL} alt={name} />
            <AvatarFallback className="text-xs">{name.slice(0,2).toUpperCase()}</AvatarFallback>
        </Avatar>
    )
}