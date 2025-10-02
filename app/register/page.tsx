'use client';

import React from "react";

import styles from "./RegisterPage.module.scss";
import Text from "components/Text";
import Input from "components/Input";
import Button from "components/Button";
import rootStore from "store/RootStore";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/routes";
import Link from "next/link";

const RegisterPage: React.FC = () => {
    const router = useRouter();

    const [email, setEmail] = React.useState<string>("");
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");

    const onRegister = () => {
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!email || !username || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) {
            setError("Invalid email format");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (username.length < 3) {
            setError("Username must be at least 3 characters long");
            return;
        }

        rootStore.user
            .registerUser({ username, email, password })
            .then(() => {
                if (rootStore.user.meta !== "success") {
                    setError("Registration failed");
                    return;
                }
                router.push(ROUTES.products.get());
            })
            .catch((err) => {
                setError("Registration failed");
                console.log(err);
            });
    }

    return (
        <>
            <div className={styles.register_container}>
                <Text align="center" view="p-32" weight="bold" tag="h1">Register</Text>
                <Input value={email} onChange={setEmail} className={styles.input} placeholder="Email" />
                <Input value={username} onChange={setUsername} className={styles.input} placeholder="Username" />
                <Input value={password} onChange={setPassword} className={styles.input} placeholder="Password" type="password" />
                <Input value={confirmPassword} onChange={setConfirmPassword} className={styles.input} placeholder="Confirm Password" type="password" />
                <Button onClick={onRegister}>Register</Button>
                
                <Link href={ROUTES.login.get()}>
                    <Text align="center" view="p-14" weight="normal" color="secondary">Already have an account? Login</Text>
                </Link>

                <div className={styles.error_message}>
                    <Text align="center" view="p-14" weight="normal">{error}</Text>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;