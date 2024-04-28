import {SongType} from "@/config";
import fs from 'fs/promises'; // Use promises for async file operations
import {NextRequest, NextResponse} from "next/server";
import path from 'path';

const songsFilePath = path.join(process.cwd(), 'db', 'songs.json');

async function loadSongs() {
    const data = await fs.readFile(songsFilePath, 'utf8');
    return JSON.parse(data);
}

async function loadSongById(id: number) {
    const data = await fs.readFile(songsFilePath, 'utf8');
    const songs: SongType[] = JSON.parse(data);
    return songs.find(song => song.id === id);
}

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id')
    if (id === null) {
        const songs = await loadSongs();
        return NextResponse.json(songs);
    }

    const song = await loadSongById(parseInt(id));

    if (song)
        return NextResponse.json(song);
    return NextResponse.json({msg: 'Song not found'}, {status: 404});
}


export async function POST(request: NextRequest) {
    try {
        const newSong = await request.json();
        if (!newSong || !newSong.title || !newSong.content) {
            return new NextResponse(JSON.stringify({error: "Invalid song data provided"}), {status: 400});
        }

        const songs: SongType[] = await loadSongs();

        const newId = songs.length > 0 ? Math.max(...songs.map(song => song.id)) + 1 : 1;
        const songToAdd = {id: newId, ...newSong};

        songs.push(songToAdd);

        await fs.writeFile(songsFilePath, JSON.stringify(songs, null, 2), 'utf8');

        return NextResponse.json({songs});
    } catch (error) {
        console.error('Failed to process POST request:', error);
        return new NextResponse(JSON.stringify({error: "Error processing your request"}), {status: 500});
    }
}
