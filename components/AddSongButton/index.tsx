"use client"
import {Button} from "@nextui-org/button";
import {Input, Textarea} from "@nextui-org/input";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import {useState} from "react";

async function addNewSong(songTitle: string, songContent: string): Promise<void> {
    try {
        const response = await fetch('/api/', {  // Ensure the endpoint matches your setup
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: songTitle, content: songContent}),
        });

        if (!response.ok) {
            throw new Error('Failed to add the song');
        }

        alert('Song added successfully!');
    } catch (error) {
        console.error('Failed to add the song', error);
        alert('Failed to add the song');
    }
}


export const AddSongButton = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [textAreaValue, setTextAreaValue] = useState<string>("")
    const [songNameValue, setSongNameValue] = useState<string>("")

    const updateTextAreaValue = (value: string) => {
        setTextAreaValue(value)
    }

    const updateSongNameValue = (value: string) => {
        setSongNameValue(value)
    }

    const onAddNewSong = async () => {
        const newSong = {
            title: songNameValue,
            content: textAreaValue
        }

        await addNewSong(newSong.title, newSong.content)

        setTextAreaValue("")
        setSongNameValue("")
        onOpenChange()
    }

    return (
        <div className="fixed bottom-4 flex justify-center items-center w-full left-0">
            <Button color="primary" className="text-lg font-normal" onPress={onOpen}>
                Добавить песню
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Добавление песни</ModalHeader>
                            <ModalBody>
                                <Input label="Название песни" placeholder="Введите название песни"
                                       value={songNameValue}
                                       onValueChange={updateSongNameValue}/>
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
                                <Button color="primary" onPress={onAddNewSong}>
                                    Сохранить
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}