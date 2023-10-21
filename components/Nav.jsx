'use client';

import { useState } from "react";
import { UserItems, ChatItems } from "@utils/loggedInLinks";
import { 
    Navbar,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarContent,
    Link,
    Button,
    Divider,
    Spacer,
    useDisclosure,
} from "@nextui-org/react";
import { AvatarRapper, AuthForm, ThemeSwitcher } from ".";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

function Nav({ isSession }) {
  const router = useRouter()
  const supabase = createClientComponentClient();
  const [isMenuStatus, setIsMenuStatus] = useState(null);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  async function handleUserLogout() {
    await supabase.auth.signOut();

    router.refresh();
  }

  return (
    <div className="relative overflow-hidden">
      <AuthForm isOpen={isOpen} onOpenChange={onOpenChange} />

      <Navbar isBordered className="top-0 bg-neutral-100 dark:bg-neutral-800" position="sticky" onMenuOpenChange={setIsMenuStatus}>
        <NavbarBrand>
          <Image className="relative left-5" src='/svg/logo.svg' alt="chat-logo" width={30} height={30}/>
          <span className="text-base text-gray-700 dark:text-white font-bold">ReactUp</span>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex" justify="center">
          <NavbarItem>
            <Link className="link" href="/">Home</Link>
          </NavbarItem>

          <NavbarItem>
            <Link className="link" href="/Blog">Blog</Link>
          </NavbarItem>

          <NavbarItem>
            <Link className="link" href="/About">About</Link>
          </NavbarItem>

          <NavbarItem>
            <Link className="link" href="/Features">Features</Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="flex" justify="end">
          <NavbarItem className="hidden sm:block">
            <ThemeSwitcher />
          </NavbarItem>

          <NavbarItem className="hidden sm:block">
            {
              isSession ? (
                <AvatarRapper />
              ) : (
                <Button onPress={onOpen} className="btn-theme">Sign Up</Button>
              )
            }
          </NavbarItem>

          <NavbarMenuToggle 
          aria-label={isMenuStatus ? "Close menu" : "Open menu"}
          className="sm:hidden"
          />
        </NavbarContent>

        <NavbarMenu className="bg-neutral-100 dark:bg-neutral-800 text-right sm:text-left">
          <div className="flex sm:flex-row-reverse gap-4">
            <ThemeSwitcher />
          </div>
          <span className="link__header">Site</span>
          <Divider/>
          <NavbarMenuItem>
            <Link className="link" href="/">Home</Link>
          </NavbarMenuItem>

          <NavbarMenuItem>
            <Link className="link" href="/Blog">Blog</Link>
          </NavbarMenuItem>

          <NavbarMenuItem>
            <Link className="link" href="/About">About</Link>
          </NavbarMenuItem>

          <NavbarMenuItem>
            <Link className="link" href="/Features">Features</Link>
          </NavbarMenuItem>
          <Spacer y={4} />

          {
            isSession ? (
              <>
              <span className="link__header">Chat</span>
              <Divider/>
              {
                ChatItems?.length > 0 ? (
                  ChatItems.map((item, index)=>{
                    return (
                    <NavbarMenuItem key={`${item.name}--${index}`}>
                      <Link className="link" href={item.link}>{item.name}</Link>
                    </NavbarMenuItem>
                    )
                  })
                ) : (
                  null
                )
              }
              <Spacer y={4} />

              <span className="link__header">User</span>
              <Divider/>
              {
                UserItems?.length > 0 ? (
                  UserItems.map((item, index)=>{
                    return (
                    <NavbarMenuItem key={`${item.name}--${index}`}>
                      <Link className="link" href={item.link}>{item.name}</Link>
                    </NavbarMenuItem>
                    )
                  })
                ) : (
                  null
                )
              }

              <Button onClick={handleUserLogout} color="danger">Logout</Button>
              </>
            ) : (
              <Button onPress={onOpen} className="btn-theme">Sign Up</Button>
            )
          }
        </NavbarMenu>
      </Navbar>
    </div>
  );
}

export default Nav;