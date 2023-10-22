'use client';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Divider,
} from "@nextui-org/react";

function UserProfile({user}) {

  return (
    <Card
    isBlurred
    shadow="sm"
    className="border-none bg-background/60 dark:bg-default-100/50 md:flex-1 md:max-w-[60%] lg:w-1/2"
    >
      <CardBody className="overflow-hidden px-3 py-4 text-small text-default-400">
        <div className="flex gap-5">
          <div className="w-20">
            <Avatar isBordered radius="full" color="danger" className="w-20 h-40" src={`${user.profile_link}`} />
          </div>
          <div className="h-12 flex sm:flex-1 flex-col gap-1 items-start">
            <h4 className="text-small font-semibold leading-none text-default-600">{user.name}</h4>
            <h5 className="text-small text-yellow-600 tracking-tight">@{user.email}</h5>
            <Divider/>
            <p>
              {
                user.description ? user.description : 'no description.'
              }
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default UserProfile;