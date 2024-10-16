import { useSession, signIn, signOut } from "next-auth/react"
import Button from "./Button"
import {login, logout } from "@/app/utils/Icons";
import { useTranslations } from "next-intl";


export default function Component() {
    const t = useTranslations('app');
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <Button
                    name={t("logout")}
                    type={"submit"}
                    padding={"0.4rem 0.8rem"}
                    borderRad={"0.8rem"}
                    fw={"500"}
                    fs={"1.2rem"}
                    icon={logout}
                    click={() => signOut()}
                />
            </>
        )
    }
    return (
        <>
            <Button
                name={t("login")}
                type={"submit"}
                padding={"0.4rem 0.8rem"}
                borderRad={"0.8rem"}
                fw={"500"}
                fs={"1.2rem"}
                icon={login}
                click={() => signIn()}
            />
        </>
    )

}