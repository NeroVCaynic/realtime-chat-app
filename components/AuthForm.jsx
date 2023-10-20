'use client';

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Tabs,
    Tab,
    Button,
    Input,
    Link,
    Checkbox,
} from "@nextui-org/react";
import { MailIcon, LockIcon, UserIcon } from "@assets/icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function AuthForm({isOpen, onOpenChange}) {
    const router = useRouter()
    const supabase = createClientComponentClient();
    const [selectedAuth, setSelectedAuth] = useState("signup");
    const [username, setNameHandle] = useState('');
    const [email, setEmailHandle] = useState('');
    const [password, setPasswordHandle] = useState('');
    const [loginMail, setLogMailHandle] = useState('');
    const [loginPass, setLogPassHandle] = useState('');

    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const isInvalidemail = useMemo(() => {
        if (email === "") return false;

        return validateEmail(email) ? false : true;
    }, [email]);

    const isInvalidloginemail = useMemo(() => {
        if (loginMail === "") return false;

        return validateEmail(loginMail) ? false : true;
    }, [loginMail]);

    async function handleSignUpUser() {
        if (!isInvalidemail && (password.length > 6) && (username.length > 2)) {
            await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`
                }
            });

            router.refresh();
            onOpenChange();

            const { error } = await supabase.from('userbase').update({ name: username }).eq('email', email);
            if (error) {
                console.log(error);
            }
            else {
                router.push(`${location.origin}/user`);
            }
        }
    }

    async function handleLoginUser() {
        const email = loginMail
        const password = loginPass

        if (!isInvalidloginemail && (loginPass.length > 6)) {
            const {data: message, error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            router.refresh();
            onOpenChange();

            if (error) {
                console.log(error)
            }
            else {
                router.push(`${location.origin}/user`);
            }
        }
    }

    function handleAuthButton() {
        if (selectedAuth === 'login') {
            return (
                <Button
                onPress={handleLoginUser}
                className="btn-theme min-w-full"
                >
                    Login
                </Button>
            )
        }

        if (selectedAuth === 'signup') {
            return (
                <Button
                onPress={handleSignUpUser}
                className="btn-theme min-w-full"
                >
                    Sign Up
                </Button>
            )
        }
    }

    return (
        <Modal placement={'center'} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {
                (onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Register an Account
                        </ModalHeader>

                        <ModalBody>
                            <Tabs
                            fullWidth
                            color="danger"
                            size="md"
                            aria-label="Tabs form"
                            selectedKey={selectedAuth}
                            onSelectionChange={setSelectedAuth}>
                                <Tab key="signup" title="Sign Up">
                                    <Input
                                    isRequired
                                    value={username}
                                    isInvalid={username.length < 2}
                                    onChange={(e)=>setNameHandle(e.target.value)}
                                    errorMessage={(username.length < 2 ? true : false) && "Username must be greater than 2 characters"}
                                    autoFocus
                                    endContent={ <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" /> }
                                    label="Name"
                                    variant="underlined"
                                    />
                                    <Input
                                    isRequired
                                    value={email}
                                    isInvalid={isInvalidemail}
                                    onChange={(e)=>setEmailHandle(e.target.value)}
                                    errorMessage={isInvalidemail && "Please enter a valid email"}
                                    autoFocus
                                    endContent={ <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" /> }
                                    label="Email"
                                    variant="underlined"
                                    />

                                    <Input
                                    isRequired
                                    value={password}
                                    isInvalid={password.length < 6 ? true : false}
                                    onChange={(e)=>setPasswordHandle(e.target.value)}
                                    errorMessage={(password.length < 6 ? true : false) && "password too short, must be greater than 6 characters"}
                                    endContent={ <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" /> }
                                    label="Password"
                                    type="password"
                                    variant="underlined"/>
                                </Tab>

                                <Tab key="login" title="Login">
                                    <Input
                                    isRequired
                                    value={loginMail}
                                    isInvalid={isInvalidloginemail}
                                    onChange={(e)=>setLogMailHandle(e.target.value)}
                                    errorMessage={isInvalidloginemail && "Please enter a valid email"}
                                    autoFocus
                                    endContent={ <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" /> }
                                    label="Email"
                                    variant="underlined"
                                    />

                                    <Input
                                    isRequired
                                    value={loginPass}
                                    isInvalid={loginPass.length < 6 ? true : false}
                                    onChange={(e)=>setLogPassHandle(e.target.value)}
                                    errorMessage={(loginPass.length < 6 ? true : false) && "please enter a valid password"}
                                    endContent={ <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" /> }
                                    label="Password"
                                    type="password"
                                    variant="underlined"/>

                                    <div className="flex py-2 px-1 justify-between">
                                        <Checkbox classNames={{label: "text-small"}}>
                                            Remember me
                                        </Checkbox>
                                    </div>

                                    <div className="flex py-2 px-1 justify-between">
                                        <span className="w-full text-sm text-center">
                                            <Link className="link" href="#">Forgot password?</Link>
                                        </span>
                                    </div>
                                </Tab>
                            </Tabs>
                        </ModalBody>

                        <ModalFooter>
                            {
                                handleAuthButton()
                            }
                        </ModalFooter>
                    </>
                )
            }
            </ModalContent>
        </Modal>
    );
}

export default AuthForm;