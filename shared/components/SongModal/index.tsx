import { SongType } from "@config/index";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import React, { useState } from "react";

type Props = {
	onConfirm: (song: Omit<SongType, "id">) => void;
	initialValues?: Omit<SongType, "id">;
};

export const SongModal: React.FC<Props> = ({ onConfirm, initialValues }) => {
	const [songNameValue, setSongNameValue] = useState<string>(initialValues?.title ?? "");
	const [textAreaValue, setTextAreaValue] = useState<string>(initialValues?.content ?? "");

	const updateSongNameValue = (value: string) => {
		setSongNameValue(value);
	};
	const updateTextAreaValue = (value: string) => {
		setTextAreaValue(value);
	};

	const onConfirmHandler = () => {
		onConfirm({ title: songNameValue, content: textAreaValue });
	};

	return (
		<ModalContent>
			{(onClose) => (
				<>
					<ModalHeader className="flex flex-col gap-1">
						{initialValues ? "Изменение песни" : "Добавление песни"}
					</ModalHeader>
					<ModalBody>
						<Input
							label="Название песни"
							placeholder="Введите название песни"
							value={songNameValue}
							onValueChange={updateSongNameValue}
						/>
						<Textarea
							label="Текст песни"
							placeholder="Введите текст песни"
							value={textAreaValue}
							onValueChange={updateTextAreaValue}
						/>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="light" onPress={onClose}>
							Закрыть
						</Button>
						<Button color="primary" onPress={onConfirmHandler}>
							Сохранить
						</Button>
					</ModalFooter>
				</>
			)}
		</ModalContent>
	);
};
