type FormattedLine = {
	chords: string;
	lyrics: string;
};

type FormattedLineWithSpacer = FormattedLine | string;

export const formatSongContent = (content: string): FormattedLineWithSpacer[] => {
	try {
		if (!content) return [{ chords: "", lyrics: content }];
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
	} catch (e) {
		console.error("Failed to format song content:", e);
		return [{ chords: "", lyrics: content }];
	}
};
