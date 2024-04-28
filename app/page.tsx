import {AddSongButton} from "@/components/AddSongButton";
import {SongItem} from "@/components/SongItem/SongItem";
import {SongType} from "@/config";
import {headers} from "next/headers";


async function getSongs(): Promise<SongType[]> {
    const requestUrl = headers().get('x-url')
    const data = await fetch(`${requestUrl}/api/`)

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }

    return data.json()
}

export default async function Home() {


    const songs = await getSongs()

    return (
        <section className="flex flex-col gap-4 py-8 md:py-10">
            <div className="pb-10">
                {songs.map((song, index) => {
                    return (
                        <SongItem song={song} key={index} index={index}/>
                    )
                })}
            </div>
            <AddSongButton/>
        </section>
    );
}
