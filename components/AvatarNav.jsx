'use client';

import { useRouter } from "next/navigation";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    Button,
    Link,
    Divider,
} from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserItems, ChatItems } from "@utils/loggedInLinks";

function AvatarNav({user}) {
    const router = useRouter()
    const supabase = createClientComponentClient();

    async function handleUserLogout() {
        await supabase.auth.signOut();

        router.refresh();
    }

    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <Avatar
                    isBordered
                    color="danger"
                    src={`${user ? user.profile_link : `https://tgbyvpzcuzfhcbrevoac.supabase.co/storage/v1/object/public/Avatars/illulseq.png`}`}
                    />
                </DropdownTrigger>

                <DropdownMenu disabledKeys={['separator-chat', 'separator-user', 'user-info','chatLinks', 'userLinks']} aria-label="User Actions" variant="flat">
                    <DropdownItem key="user-info" className="h-14 gap-2">
                        <p className="text-red-500 font-semibold">Signed in as</p>

                        <p className="text-yellow-600 font-semibold">
                            @{
                                user ? user.name : 'loading..'
                            }
                        </p>
                    </DropdownItem>

                    <DropdownItem key="separator-chat">
                        <Divider />
                    </DropdownItem>

                    <DropdownItem key="chatLinks">
                        <span className="text-base text-gray-800 dark:text-gray-100 font-semibold">Chat</span>
                    </DropdownItem>

                    {
                        ChatItems?.length > 0 ? (
                            ChatItems.map((item)=>{
                                return (
                                    <DropdownItem key={item.name.toLowerCase()}>
                                        <Link className="link" href={item.link}>{item.name}</Link>
                                    </DropdownItem>
                                )
                            })
                        ) : null
                    }

                    <DropdownItem key="separator-user">
                        <Divider />
                    </DropdownItem>

                    <DropdownItem key="userLinks">
                        <span className="text-base text-gray-800 dark:text-gray-100 font-semibold">User</span>
                    </DropdownItem>

                    {
                        UserItems?.length > 0 ? (
                            UserItems.map((item)=>{
                                return (
                                    <DropdownItem key={item.name.toLowerCase()}>
                                        <Link className="link" href={item.link}>{item.name}</Link>
                                    </DropdownItem>
                                )
                            })
                        ) : null
                    }

                    <DropdownItem key="separator">
                        <Divider />
                    </DropdownItem>

                    <DropdownItem key="logout">
                        <Button onClick={handleUserLogout} className="w-full" color="danger">Logout</Button>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default AvatarNav;