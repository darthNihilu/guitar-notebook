"use client"
import {useSongs} from "@/components/SongsContext";

type FormattedLine = {
    chords: string;
    lyrics: string;
}

export default function Song({params}: { params: { id: string } }) {
    const {songs} = useSongs();
    const foundSong = songs.find(song => song.id === Number(params.id));

    // Helper function to parse and format song content
    const formatSongContent = (content: string): FormattedLine[] => {
        const lines = content.split('\n');
        const formattedLines = lines.map((line) => {
            const parts = line.split('[');
            if (parts.length === 1) {
                return {chords: "", lyrics: parts[0]};
            } else {
                return parts.reduce((acc, part, index) => {
                    if (index === 0) {
                        return {...acc, lyrics: part};
                    } else {
                        const [chord, text] = part.split(']');
                        const position = acc.lyrics.length - 1; // Position the chord one character before its actual appearance in lyrics
                        const chords = acc.chords.padEnd(position, ' ') + chord;
                        const lyrics = (position < 0 ? acc.lyrics.padStart(4, ' ') : acc.lyrics) + text;
                        return {chords, lyrics};
                    }
                }, {chords: "", lyrics: ""} as FormattedLine);
            }
        });

        return formattedLines;
    };

    const formattedContent = foundSong ? formatSongContent(foundSong.content) : [];

    return (
        <section className="flex flex-col gap-4 py-8 md:py-10">
            <div className="text-xl font-bold">
                {foundSong?.title}
            </div>
            <pre className="whitespace-pre-wrap"
                // style={{fontFamily: 'monospace'}}
            >
                {formattedContent.map(({chords, lyrics}, idx) => (
                    <div className="font-bold" key={idx}>
                        <div className="text-blue-500">{chords}</div>
                        <div>{lyrics}</div>
                    </div>
                ))}
            </pre>
        </section>
    );
}
