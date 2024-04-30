"use client";
import SongService from "@api/SongService";
import { SongModal } from "@components/SongModal";
import { SongType } from "@config/index";
import { Button } from "@nextui-org/button";
import { Modal, useDisclosure } from "@nextui-org/modal";
import { useRouter } from "next/navigation";

export const AddSongButton = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const router = useRouter();
	const onAddNewSong = async ({ title, content }: Omit<SongType, "id">) => {
		const id = await SongService.addNewSong(title, content);

		if (id) {
			onOpenChange();
			router.push(`/song/${id}`);
		}
	};

	return (
		<div className="fixed  flex justify-center items-center w-full left-0 bottom-[16px]">
			<Button color="primary" className="text-lg font-normal" onPress={onOpen}>
				Добавить песню
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<SongModal onConfirm={onAddNewSong} />
			</Modal>
		</div>
	);
};
