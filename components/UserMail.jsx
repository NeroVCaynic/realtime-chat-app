'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  CardFooter,
  Avatar,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function UserMail({user}) {
  const router = useRouter()
  const supabase = createClientComponentClient();
  const [isEditable, setEditableState] = useState(null);
  const [user_name, setName] = useState('');
  const [user_description, setDesc] = useState('');

  async function changeUserInfo() {
    const updateCols = {name: user_name, description:user_description};
    if ((user_name != user.name) && (user_name.trim() != '')) {
      const { data, error: name_error } = await supabase
      .from('userbase')
      .update({ name: user_name })
      .eq('id', user.id);

      if (name_error) {
        console.log(name_error);
      }
    }

    if ((user_description != user.description) && (user_description.trim() != '')) {
      const { data, error: desc_error } = await supabase
      .from('userbase')
      .update({ description: user_description })
      .eq('id', user.id);

      if (desc_error) {
        console.log(desc_error);
      }
    }

    else {
      console.log('no action');
    }

    router.refresh();
  }

  return (
    <div className="relative group md:max-w-[50%] lg:w-1/2">
      <Card
      isBlurred
      shadow="sm"
      className="border-none bg-background/60 dark:bg-default-100/50"
      >
        <CardBody className="flex gap-4 h-44">
          <div className="flex gap-x-4">
            <Avatar
            isBordered
            radius="sm"
            color="danger"
            className="w-80 sm:w-60 lg:w-40 xl:w-40 h-60"
            src={`${user.profile_link}`}
            />

            <div className="flex flex-wrap justify-center items-center gap-4 h-12 xl:flex-1">
              <Input
              isClearable
              isDisabled={!isEditable}
              type="name"
              label="Name"
              variant="bordered"
              placeholder={user.name}
              value={user_name}
              onChange={(e)=>setName(e.target.value)}
              />

              <Textarea
              isDisabled={!isEditable}
              type="description"
              label="Description"
              variant="bordered"
              placeholder={user.description}
              value={user_description}
              onChange={(e)=>setDesc(e.target.value)}
              />
            </div>
          </div>
        </CardBody>

        <CardFooter className="flex justify-center items-center h-[3.3rem]">
          <Button onPress={changeUserInfo} isDisabled={!isEditable} className="btn-theme">Submit</Button>
        </CardFooter>
      </Card>

      {
        isEditable ? (
          <Button
          onPress={()=>setEditableState(false)}
          color="danger"
          variant="ghost"
          radius="full"
          size="sm"
          className="absolute font-bold bottom-1 right-1">
            X
          </Button>
        ) : (
          <div className="hidden absolute top-0 w-full h-full rounded-md border-2 border-spacing-8 border-blue-500 bg-black/40 group-hover:flex justify-center items-center">
            <Button onPress={()=>setEditableState(true)} className="btn-theme rounded-xl font-semibold">Edit</Button>
          </div>
        )
      }
    </div>
  );
}

export default UserMail;