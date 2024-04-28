"use client"
import {SongItem} from "@/components/SongItem/SongItem";
import {useSongs} from "@/components/SongsContext";
import {Button} from "@nextui-org/button";
import {Textarea} from "@nextui-org/input";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import {useState} from "react";


export default function Home() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [textAreaValue, setTextAreaValue] = useState<string>("")

    const updateTextAreaValue = (value: string) => {
        setTextAreaValue(value)
    }

    const {songs, setSongs} = useSongs();


    const onAddNewSong = () => {
        const newSong = {
            id: songs.length + 1,
            title: "New song",
            content: textAreaValue
        };
        setSongs([...songs, newSong]);
        setTextAreaValue("");
        onOpenChange();
    };

    return (
        <section className="flex flex-col gap-4 py-8 md:py-10">
            <div>
                {songs.map((song, index) => {
                    return (
                        <SongItem song={song} key={index} index={index}/>
                    )
                })}
            </div>
            <div className="absolute bottom-4 flex justify-center items-center w-full left-0">
                <Button color="primary" className="text-lg font-normal" onPress={onOpen}>
                    Добавить песню
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Добавление песни</ModalHeader>
                                <ModalBody>
                                    <Textarea
                                        label="Description"
                                        placeholder="Enter your description"
                                        className="max-w-xs"
                                        value={textAreaValue}
                                        onValueChange={updateTextAreaValue}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onAddNewSong}>
                                        Action
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </section>
    );
}
