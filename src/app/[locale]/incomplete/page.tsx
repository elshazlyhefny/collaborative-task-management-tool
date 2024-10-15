"use client";
import React from "react";
import { useGlobalState } from "../../context/globalProvider";
import Tasks from "../../Components/Tasks/Tasks";
import { useTranslations } from "next-intl";

function page() {
  const t = useTranslations('app');
  const { incompleteTasks } = useGlobalState();
  return <Tasks title={t('IncompleteTasks')} tasks={incompleteTasks} />;
}

export default page;
