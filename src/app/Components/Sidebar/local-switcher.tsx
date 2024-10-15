'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";

export default function LocalSwitcher() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const localActive = useLocale();
    const { theme, collapsed } = useGlobalState();
    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            router.replace(`/${nextLocale}`);
        });
    };
    return (
        <SwitcherStyled theme={theme} collapsed={collapsed}>
            <label>
                <p className='sr-only'>change language</p>
                <select
                    defaultValue={localActive}
                    onChange={onSelectChange}
                    disabled={isPending}
                >
                    <option value='en'>English</option>
                    <option value='ar'>العربيه</option>
                </select>
            </label>
        </SwitcherStyled>
    );
}

const SwitcherStyled = styled.div<{ collapsed: boolean }>`
    display: flex;
    height: 3rem;
    width: 100%;
    background-color: ${(props) => props.theme.colorBg2};
    color: ${(props) => props.theme.colorGrey3};
    label {
        width: 100%;
    }
    select {
        background-color: ${(props) => props.theme.colorBg2};
        color: ${(props) => props.theme.colorGrey3};
        border: none;
        padding: 0.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        outline: none;
        width: 100%;
        font-size: 1.2rem;
        text-align: center;
        option {
            background-color: ${(props) => props.theme.colorBg2};
            color: ${(props) => props.theme.colorGrey3};
        }
    }
`;

