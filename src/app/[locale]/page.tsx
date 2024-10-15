"use client";
import Tasks from "../Components/Tasks/Tasks";
import { useGlobalState } from "../context/globalProvider";
import { useTranslations } from "next-intl";

export default function Home() {
  //  dfine translation
  const t = useTranslations('app');
  
  const { tasks } = useGlobalState();
  
  return <Tasks title={t('all_tasks')} tasks={tasks} />;
}
