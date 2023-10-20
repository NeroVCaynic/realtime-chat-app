'use client';

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AvatarNav } from ".";

function AvatarRapper() {
    const supabase = createClientComponentClient();
    const [user, setUser] = useState([]);

    async function getUser() {
        const { data: userData } = await supabase.from('userbase').select('name, profile_link')

        setUser(userData);
    }

    useEffect(()=>{
        getUser();
    }, []);

    return (
        <AvatarNav user={user[0]} />
    );
}

export default AvatarRapper;