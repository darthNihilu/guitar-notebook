import { SongType } from "@config/index";
import fs from "fs/promises"; // Use promises for async file operations
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const songsFilePath = path.join(process.cwd(), "db", "songs.json");

async function loadSongs() {
	try {
		const data = await fs.readFile(songsFilePath, "utf8");
		console.log({ data });
		return JSON.parse(data);
	} catch (error) {
		console.error("Failed to load songs:", error);
		return [];
	}
}

async function loadSongById(id: number) {
	const data = await fs.readFile(songsFilePath, "utf8");
	const songs: SongType[] = JSON.parse(data);
	return songs.find((song) => song.id === id);
}

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	if (id === null) {
		const songs = await loadSongs();
		return NextResponse.json(songs);
	}

	const song = await loadSongById(parseInt(id));

	if (song) return NextResponse.json(song);
	return NextResponse.json({ msg: "Song not found" }, { status: 404 });
}

export async function DELETE(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	if (!id) {
		return new NextResponse(JSON.stringify({ error: "Missing song ID" }), { status: 400 });
	}

	try {
		const songs: SongType[] = await loadSongs();
		const initialLength = songs.length;
		const updatedSongs = songs.filter((song) => song.id !== parseInt(id));

		// Check if the song was found and deleted
		if (initialLength === updatedSongs.length) {
			return new NextResponse(JSON.stringify({ error: "Song not found" }), { status: 404 });
		}

		// Write the updated list back to the file
		await fs.writeFile(songsFilePath, JSON.stringify(updatedSongs, null, 2), "utf8");

		return new NextResponse(JSON.stringify({ message: "Song deleted successfully" }), { status: 200 });
	} catch (error) {
		console.error("Failed to process DELETE request:", error);
		return new NextResponse(JSON.stringify({ error: "Error processing your request" }), { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const newSong = await request.json();
		if (!newSong || !newSong.title || !newSong.content) {
			return new NextResponse(JSON.stringify({ error: "Invalid song data provided" }), { status: 400 });
		}

		const songs: SongType[] = await loadSongs();

		const newId = songs.length > 0 ? Math.max(...songs.map((song) => song.id)) + 1 : 1;
		const songToAdd = { id: newId, ...newSong };

		songs.push(songToAdd);

		await fs.writeFile(songsFilePath, JSON.stringify(songs, null, 2), "utf8");

		return NextResponse.json(newId);
	} catch (error) {
		console.error("Failed to process POST request:", error);
		return new NextResponse(JSON.stringify({ error: "Error processing your request" }), { status: 500 });
	}
}

export async function PUT(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	if (!id) {
		return new NextResponse(JSON.stringify({ error: "Missing song ID" }), { status: 400 });
	}

	try {
		const songUpdate = await request.json();
		const songs: SongType[] = await loadSongs();
		const songIndex = songs.findIndex((song) => song.id === parseInt(id));

		if (songIndex === -1) {
			return new NextResponse(JSON.stringify({ error: "Song not found" }), { status: 404 });
		}

		// Update the song in place
		songs[songIndex] = { ...songs[songIndex], ...songUpdate };

		// Write the updated list back to the file
		await fs.writeFile(songsFilePath, JSON.stringify(songs, null, 2), "utf8");

		return new NextResponse(JSON.stringify({ message: "Song updated successfully" }), { status: 200 });
	} catch (error) {
		console.error("Failed to process PUT request:", error);
		return new NextResponse(JSON.stringify({ error: "Error processing your request" }), { status: 500 });
	}
}
