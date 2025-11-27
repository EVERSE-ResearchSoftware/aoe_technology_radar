import Link from "next/link";

import styles from "./TaskList.module.css";

import { TaskBadge } from "@/components/Badge/Badge";
import { TaskItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TaskListProps {
  items: TaskItem[];
}

export function TaskList({ items }: TaskListProps) {
  if (!items) return null;
  return (
    <ul className={cn(styles.list)}>
      <TaskBadge className={styles.badge} task={"Tasks"} />
      {items.map((item, index) => (
        <li key={index} className={styles.item}>
          <Link className={styles.link} href={item.link}>
            <span className={styles.title}>{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
