'use client';

import { useState } from "react";
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
} from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";
import Image from "next/image";

function Nav() {
  const [isMenuStatus, setIsMenuStatus] = useState(null);

  const ChatItems = [
    {name: 'Groups', link: "/groups"},
    {name: 'Contacts', link: "/contacts"},
    {name: 'Create & Add', link: "/create-add"},
    {name: 'explore', link: "/explore"},
  ];

  const UserItems = [
    {name: 'Profile', link: "/profile"},
    {name: 'Dashboard', link: "/dashboard"},
    {name: 'My Settings', link: "/settings"},
    {name: 'Terms of Service', link: "terms"},
  ];

  return (
    <div className="relative overflow-hidden">
      <Navbar isBordered className="top-0" position="sticky" onMenuOpenChange={setIsMenuStatus}>
        <NavbarBrand>
          <Image className="relative left-5" src='./svg/logo.svg' alt="chat-logo" width={30} height={30}/>
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
            <Button color="primary">Sign Up</Button>
          </NavbarItem>

          <NavbarMenuToggle 
          aria-label={isMenuStatus ? "Close menu" : "Open menu"}
          className="sm:hidden"
          />
        </NavbarContent>

        <NavbarMenu className="text-right sm:text-left">
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

          <Button color="danger">Logout</Button>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}

export default Nav;