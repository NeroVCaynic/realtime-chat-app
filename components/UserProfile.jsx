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
    className="border-none bg-background/60 dark:bg-default-100/50 md:max-w-[50%]"
    >
      <CardBody className="overflow-hidden px-3 py-4 text-small text-default-400">
        <div className="flex gap-5">
          <div className="w-20">
            <Avatar isBordered radius="full" color="danger" className="w-20 h-40" src={`${user.profile_link}`} />
          </div>
          <div className="h-12 flex flex-col gap-1 items-start">
            <h4 className="text-small font-semibold leading-none text-default-600">{user.name}</h4>
            <h5 className="text-small text-yellow-600 tracking-tight">@{user.email}</h5>
            <Divider />
            <p>
              {
                user.description ? user.description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab laboriosam voluptate eaque eveniet veritatis possimus, distinctio officiis, itaque in aspernatur quo totam dolorem sunt earum nemo quia asperiores numquam nobis.'
              }
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default UserProfile;