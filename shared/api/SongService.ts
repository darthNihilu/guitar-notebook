import { SongType } from "@config/index";
import { toast } from "react-toastify";

class SongService {
	// static baseUrl = headers().get("x-url");
	static baseUrl = "http://localhost:3000";

	static async handleRequest(url: string, options?: RequestInit): Promise<any> {
		const response = await fetch(url, options);
		if (!response.ok) {
			const errMsg = await response.text();
			throw new Error(errMsg || "An error occurred while processing the request.");
		}
		return response.json();
	}

	static async getSongs(): Promise<SongType[]> {
		return this.handleRequest(`${this.baseUrl}/api/`);
	}

	static async getSongById(id: string): Promise<SongType> {
		return this.handleRequest(`${this.baseUrl}/api?id=${id}`);
	}

	static async addNewSong(songTitle: string, songContent: string): Promise<void | boolean> {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: songTitle, content: songContent }),
		};
		try {
			const id = await this.handleRequest(`${this.baseUrl}/api/`, options);
			console.log("id", id);
			toast("Песня успешно добавлена", { type: "success" });
			return id;
		} catch (e) {
			toast("Ошибка при добавлении песни", { type: "error" });
		}
	}

	static async deleteSong(songId: number): Promise<void | boolean> {
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			await this.handleRequest(`${this.baseUrl}/api?id=${songId}`, options);
			return true;
		} catch (e) {
			toast("Ошибка при удалении песни", { type: "error" });
		}
	}

	static async updateSong(song: SongType): Promise<void | boolean> {
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(song),
		};
		try {
			await this.handleRequest(`${this.baseUrl}/api?id=${song.id}`, options);
			toast("Песня успешно обновлена", { type: "success" });
			return true;
		} catch (e) {
			toast("Ошибка при обновлении песни", { type: "error" });
			return false;
		}
	}
}

export default SongService;
