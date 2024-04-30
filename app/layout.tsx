import { Navbar } from "@components/navbar";
import { fontUbuntu } from "@config/fonts";
import { siteConfig } from "@config/site";
import "@styles/globals.css";
import clsx from "clsx";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={clsx("min-h-screen bg-background antialiased", fontUbuntu.className)}>
				<Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
					<ToastContainer />
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<main className="container mx-auto max-w-7xl px-6 flex-grow">{children}</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
