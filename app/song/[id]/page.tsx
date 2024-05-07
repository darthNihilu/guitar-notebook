import SongService from "@api/SongService";
import { SongControlItems } from "@components/SongControlItems";
import { formatSongContent } from "@shared/utils/formatSongContent";

export default async function Song({ params }: { params: { id: string } }) {
	const foundSong = await SongService.getSongById(params.id);

	const formattedContent = foundSong ? formatSongContent(foundSong.content) : [];

	return (
		<>
			<SongControlItems foundSong={foundSong} />
			<section className="flex flex-col gap-4 py-8 md:py-10">
				<div className="text-xl font-bold">{foundSong?.title}</div>
				<pre
					className="whitespace-pre-wrap"
					// style={{fontFamily: 'monospace'}}
				>
					{formattedContent.map((item, idx) => {
						if (typeof item === "string" && item === "spacer") {
							return <div key={idx} style={{ height: "2em" }}></div>;
						} else if (typeof item !== "string") {
							const { chords, lyrics } = item;
							return (
								<div className="font-bold" key={idx}>
									<div className="text-blue-500 leading-none">{chords}</div>
									<div className="leading-snug">{lyrics}</div>
								</div>
							);
						}
					})}
				</pre>
			</section>
		</>
	);
}
