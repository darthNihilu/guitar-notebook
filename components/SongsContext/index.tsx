"use client"
import {initialSongs, SongType} from "@/config";
import React, {createContext, ReactNode, useContext, useState} from 'react';

type SongsContextType = {
    songs: SongType[];
    setSongs: (songs: SongType[]) => void;
}

const SongsContext = createContext<SongsContextType>({
    songs: [],
    setSongs: (songs) => {
    }
});

type SongsProviderProps = {
    children: ReactNode;
}

export function SongsProvider({children}: SongsProviderProps) {
    const [songs, setSongs] = useState(initialSongs);

    const value = {songs, setSongs};
    return <SongsContext.Provider value={value}>{children}</SongsContext.Provider>;
}

export function useSongs() {
    const context = useContext(SongsContext);
    if (context === undefined) {
        throw new Error('useSongs must be used within a SongsProvider');
    }
    return context;
}
