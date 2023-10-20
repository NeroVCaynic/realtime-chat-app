"use client";

import { Switch } from "@nextui-org/react";
import { SunIcon, MoonIcon } from "@assets/icons";
import {useTheme} from "next-themes";

function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()

    if (theme === 'system') {
        setTheme('light')
    }

    function themeChanger() {

        if (theme === 'light') {
            setTheme('dark')
        }

        if (theme === 'dark') {
            setTheme('light')
        }
    }

    return (
        <div>
            <Switch
            isSelected={theme === 'light' ? true : false}
            onClick={themeChanger}
            size="md"
            color="warning"
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
            />
        </div>
    );
}

export default ThemeSwitcher;