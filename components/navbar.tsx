import {Logo,} from "@/components/icons";
import {Navbar as NextUINavbar, NavbarBrand, NavbarContent,} from "@nextui-org/navbar";
import NextLink from "next/link";

export const Navbar = () => {

    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <Logo/>
                        <p className="font-bold text-inherit">Jectis</p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>
        </NextUINavbar>
    );
};
