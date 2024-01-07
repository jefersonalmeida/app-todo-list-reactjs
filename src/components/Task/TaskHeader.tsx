import styles from './TaskHeader.module.css';

interface Props {
  tasksCount: number;
  tasksDoneCount: number;
}

export function TaskHeader({tasksCount, tasksDoneCount}: Props) {
  const statusTasks = tasksCount === 0
      ? tasksCount
      : `${tasksDoneCount} de ${tasksCount}`;

  return (
      <header className={styles.container}>
        <aside>
          <p>Tarefas criadas</p>
          <span>{tasksCount}</span>
        </aside>

        <aside>
          <p>Concluídas</p>
          <span>{statusTasks}</span>
        </aside>
      </header>
  );
}
