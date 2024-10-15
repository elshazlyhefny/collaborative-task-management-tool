"use client";
import React from "react";
import { useGlobalState } from "../../context/globalProvider";
import Tasks from "../../Components/Tasks/Tasks";
import { useTranslations } from "next-intl";

function page() {
  const t = useTranslations('app');
  const { completedTasks } = useGlobalState();

  return <Tasks title={t('CompletedTasks')} tasks={completedTasks} />;
}

export default page;
