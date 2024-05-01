import { AddSongButton } from "@components/AddSongButton";
import { SongItem } from "@components/SongItem/SongItem";

export default async function Home() {
	const songs: any[] = [];

	return (
		<section className="flex flex-col gap-4 py-8 md:py-10">
			<div className="pb-10">
				{songs.map((song, index) => {
					return <SongItem song={song} key={index} index={index} />;
				})}
			</div>
			<AddSongButton />
		</section>
	);
}
