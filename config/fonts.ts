import { Ubuntu_Mono as FontUbuntuMono } from "next/font/google";

export const fontUbuntu = FontUbuntuMono({
	subsets: ["latin", "cyrillic"],
	variable: "--font-ubuntu",
	weight: ["400", "700"],
});
