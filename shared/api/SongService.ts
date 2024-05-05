import { SongType } from "@config/index";
import { toast } from "react-toastify";

class SongService {
	// static baseUrl = headers().get("x-url");

	static getBaseUrl() {
		return process.env.NEXT_PUBLIC_API_URI || "https://backend.guitar.jectis.ru";
	}

	static async handleRequest(url: string, options?: RequestInit): Promise<any> {
		try {
			const fullUrl = `${this.getBaseUrl()}/song${url}`;
			const response = await fetch(fullUrl, options);
			if (!response.ok) {
				const errMsg = await response.text();
				throw new Error(errMsg || "An error occurred while processing the request.");
			}
			return response.json();
		} catch (error: unknown) {
			// Typing the error as unknown
			// We need to assert the type of the error before accessing any properties
			if (error instanceof Error) {
				console.error(`Failed to fetch from ${url}: ${error.message}`);
				throw new Error(`Failed to fetch from ${url}: ${error.message}`);
			} else {
				// If the error is not an instance of Error, handle it differently or rethrow a generic error
				console.error(`An unexpected error occurred: ${error}`);
				throw new Error("An unexpected error occurred");
			}
		}
	}

	static async getSongs(): Promise<SongType[]> {
		try {
			return this.handleRequest(`/`);
		} catch (e) {
			toast("Ошибка при загрузке песен", { type: "error" });
			return [];
		}
	}

	static async getSongById(id: string): Promise<SongType> {
		return this.handleRequest(`/${id}`);
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
			const { id } = await this.handleRequest(`/`, options);
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
			await this.handleRequest(`/${songId}`, options);
			return true;
		} catch (e) {
			toast("Ошибка при удалении песни", { type: "error" });
		}
	}

	static async updateSong(song: SongType): Promise<void | boolean> {
		const options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(song),
		};
		try {
			await this.handleRequest(`/${song.id}`, options);
			toast("Песня успешно обновлена", { type: "success" });
			return true;
		} catch (e) {
			toast("Ошибка при обновлении песни", { type: "error" });
			return false;
		}
	}
}

export default SongService;
