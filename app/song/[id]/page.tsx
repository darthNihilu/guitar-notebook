import SongService from "@api/SongService";
import { SongControlItems } from "@components/SongControlItems";

type FormattedLine = {
	chords: string;
	lyrics: string;
};

type FormattedLineWithSpacer = FormattedLine | string;

export default async function Song({ params }: { params: { id: string } }) {
	const foundSong = await SongService.getSongById(params.id);

	const formatSongContent = (content: string): FormattedLineWithSpacer[] => {
		const lines = content.split("\n");
		const formattedLines: FormattedLineWithSpacer[] = [];

		lines.forEach((line, index) => {
			if (line === "" && lines[index] === "") {
				formattedLines.push("spacer");
			} else if (line !== "") {
				const parts = line.split("[");
				if (parts.length === 1) {
					formattedLines.push({ chords: "", lyrics: parts[0] });
				} else {
					const formattedLine = parts.reduce(
						(acc, part, index) => {
							if (index === 0) {
								return { ...acc, lyrics: part };
							} else {
								const [chord, text] = part.split("]");
								const position = acc.lyrics.length - 1; // Adjust position if needed
								const chords = acc.chords.padEnd(position, " ") + chord;
								const lyrics = (position < 0 ? acc.lyrics.padStart(4, " ") : acc.lyrics) + text;
								return { chords, lyrics };
							}
						},
						{ chords: "", lyrics: "" }
					);
					formattedLines.push(formattedLine);
				}
			}
		});

		return formattedLines;
	};

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
									<div className="text-blue-500">{chords}</div>
									<div>{lyrics}</div>
								</div>
							);
						}
					})}
				</pre>
			</section>
		</>
	);
}
