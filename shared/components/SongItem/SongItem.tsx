"use client";

import { SongType } from "@config/index";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
	song: SongType;
	index: number;
};

export const SongItem: React.FC<Props> = ({ song, index }) => {
	const router = useRouter();
	const navigateToSong = () => {
		router.push(`/song/${song.id}`);
	};
	return (
		<div key={song.title}>
			<button className="text-2xl font-bold" onClick={navigateToSong}>
				<span>{song.id}.</span> {song.title}
			</button>
		</div>
	);
};
