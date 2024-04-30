"use client";
import SongService from "@api/SongService";
import { SongModal } from "@components/SongModal";
import { SongType } from "@config/index";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { DeleteIcon, EditIcon } from "@nextui-org/shared-icons";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
	foundSong: SongType;
};

export const SongControlItems: React.FC<Props> = ({ foundSong }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const {
		isOpen: isEditModalOpen,
		onOpen: onEditModalOpen,
		onOpenChange: onOpenEditModalChange,
	} = useDisclosure();
	const router = useRouter();
	const onDeleteSong = async () => {
		const result = await SongService.deleteSong(Number(foundSong.id));
		if (result) {
			router.push("/");
		}
	};

	const onChangeSongHandler = async (song: Omit<SongType, "id">) => {
		await SongService.updateSong({ ...song, id: foundSong.id });
		onOpenEditModalChange();
	};

	return (
		<>
			<div className="fixed right-6 z-40 flex flex-col justify-center items-center gap-2 h-full">
				<Button className="min-w-0" onClick={onEditModalOpen}>
					<EditIcon />
				</Button>
				<Button className="min-w-0" onClick={onOpen}>
					<DeleteIcon />
				</Button>
			</div>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>Подтверждение</ModalHeader>
							<ModalFooter>
								<Button color="default" onPress={onClose}>
									Закрыть
								</Button>
								<Button color="danger" onPress={onDeleteSong}>
									Удалить
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			<Modal isOpen={isEditModalOpen} onOpenChange={onOpenEditModalChange} placement="center">
				<SongModal
					initialValues={{ title: foundSong.title, content: foundSong.content }}
					onConfirm={onChangeSongHandler}
				/>
			</Modal>
		</>
	);
};
