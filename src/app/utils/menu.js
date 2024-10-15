import { list, check, todo, home } from "./Icons";

const menu = [
  {
    id: 1,
    title: "all_tasks",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "important",
    icon: list,
    link: "/important",
  },
  {
    id: 3,
    title: "completed",
    icon: check,
    link: "/completed",
  },
  {
    id: 4,
    title: "do_it_now",
    icon: todo,
    link: "/incomplete",
  },
];

export default menu;
