'use client';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function UserMail({user}) {
  const supabase = createClientComponentClient();


  return (
    <Card
    isBlurred
    shadow="sm"
    className="border-none bg-background/60 dark:bg-default-100/50 md:max-w-[50%]"
    >
      <CardBody className="flex gap-4">
        <div className="flex gap-x-4">
            <Avatar
            isBordered
            radius="sm"
            color="danger"
            className="w-60 h-40"
            src={`${user.profile_link}`}
            />

            <Divider orientation="vertical"/>

            <div className="flex flex-wrap justify-center items-center gap-4 h-12">
                <Input
                isClearable
                isDisabled
                type="name"
                label="Name"
                variant="bordered"
                placeholder="Enter your name"
                defaultValue={user.name}
                />

                <Input
                isClearable
                isDisabled
                type="email"
                label="Email"
                variant="bordered"
                placeholder="Enter your email"
                defaultValue={user.email}
                />

                <Textarea
                isDisabled
                type="description"
                label="Description"
                variant="bordered"
                placeholder="Enter your description"
                defaultValue={user.description}
                />
            </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default UserMail;