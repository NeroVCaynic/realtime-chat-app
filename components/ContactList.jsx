'use client';

import { useState } from "react";
import {
  Tabs,
  Tab,
  Accordion,
  AccordionItem,
  Avatar,
} from "@nextui-org/react";

function ContactList() {
  const [selectedAuth, setSelectedAuth] = useState("signup");
  const defaultContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, aliquam eos officiis odit, earum rerum blanditiis necessitatibus dolorum, alias ab exercitationem voluptatibus quo. Incidunt facilis dignissimos esse quam repellat nesciunt."

  return (
    <div className="py-4 md:px-2">
      <Tabs
      fullWidth
      color="danger"
      size="md"
      variant="bordered"
      aria-label="Tabs form"
      selectedKey={selectedAuth}
      onSelectionChange={setSelectedAuth}
      >
        <Tab
        key="unblocked"
        title="Unblocked"
        >
          <Accordion
          variant="splitted"
          >
            <AccordionItem
            key="1"
            aria-label="user a"
            subtitle="added since"
            title="user a"
            startContent={
              <Avatar
                isBordered
                color="danger"
                radius="full"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            }
            >
              {defaultContent}
            </AccordionItem>

            <AccordionItem
            key="2"
            aria-label="user b"
            subtitle="added since"
            title="user b"
            startContent={
              <Avatar
                isBordered
                color="danger"
                radius="full"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            }
            >
              {defaultContent}
            </AccordionItem>

            <AccordionItem
            key="3"
            aria-label="user c"
            subtitle="added since"
            title="user c"
            startContent={
              <Avatar
                isBordered
                color="danger"
                radius="full"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            }
            >
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </Tab>

        <Tab
        key="blocked"
        title="Blocked"
        >
        <Accordion
          variant="splitted"
          >
            <AccordionItem
            key="4"
            aria-label="user d"
            subtitle="added since"
            title="user d"
            startContent={
              <Avatar
                isBordered
                color="danger"
                radius="full"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            }
            >
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </Tab>
      </Tabs>
    </div>
  );
}

export default ContactList;