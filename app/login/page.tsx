'use client';

import React from "react";

import styles from "./LoginPage.module.scss";
import Text from "components/Text";
import Input from "components/Input";
import Button from "components/Button";
import rootStore from "store/RootStore";
import { useRouter } from "next/navigation";
import { ROUTES } from "config/routes";
import Link from "next/link";
import { Meta } from "utils/meta";

const LoginPage: React.FC = () => {
    const router = useRouter();

    const [identifier, setIdentifier] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");

    const onLogin = () => {
        setError("");

        if (!identifier || !password) {
            setError("All fields are required");
            return;
        }

        rootStore.user
            .loginUser({ identifier, password })
            .then(() => {
                if (rootStore.user.meta !== Meta.success) {
                    setError("Login failed");
                    return;
                }
                router.push(ROUTES.products.get());
            })
            .catch((err) => {
                setError("Login failed");
                console.log(err);
            });

    }

    return (
        <>
            <div className={styles.login_container}>
                <Text align="center" view="p-32" weight="bold" tag="h1">Login</Text>
                <Input value={identifier} onChange={setIdentifier} className={styles.input} placeholder="Email or Username" />
                <Input value={password} onChange={setPassword} className={styles.input} placeholder="Password" type="password" />
                <Button onClick={onLogin}>Login</Button>

                <Link href={ROUTES.register.get()}>
                    <Text align="center" view="p-14" weight="normal" color="secondary">Don&apos;t have an account? Register</Text>
                </Link>

                <div className={styles.error_message}>
                    <Text align="center" view="p-14" weight="bold">{error}</Text>
                </div>
            </div>
        </>
    )
}

export default LoginPage;