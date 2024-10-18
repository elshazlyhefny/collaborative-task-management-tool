"use client";
import React from "react";
import { useGlobalState } from "../../context/globalProvider";
import Tasks from "../../Components/Tasks/Tasks";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations('app');
  const { importantTasks } = useGlobalState();
  return <Tasks title={t('ImportantTasks')} tasks={importantTasks} />;
}

export default Page;
