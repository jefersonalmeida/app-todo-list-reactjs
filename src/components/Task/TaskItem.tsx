import {Check, Circle, Trash} from '@phosphor-icons/react';
import {TaskType} from '../../types/task.type.ts';

import styles from './TaskItem.module.css';

interface Props {
  data: TaskType;
  removeTask: (id: string) => void;
  toggleTaskStatus: ({id, value}: { id: string; value: boolean }) => void;
}

export function TaskItem({data, removeTask, toggleTaskStatus}: Props) {
  function handleTaskToggle() {
    toggleTaskStatus({id: data.id, value: !data.done});
  }

  function handleRemove() {
    removeTask(data.id);
  }

  const checkboxDoneClass = data.done ? styles.checkboxChecked : styles.checkboxUnchecked;
  const paragraphDoneClass = data.done ? styles.paragraphChecked : '';

  return (
      <div className={styles.container}>
        <div>
          <label htmlFor="checkbox" onClick={handleTaskToggle}>
            <input readOnly type="checkbox" checked={data.done}/>
            <span className={`${styles.checkbox} ${checkboxDoneClass}`}>
              {data.done ? <Check/> : <Circle/>}
            </span>

            <p className={`${styles.paragraph} ${paragraphDoneClass}`}>
              {data.text}
            </p>
          </label>
        </div>

        <button onClick={handleRemove}>
          <Trash size={20}/>
        </button>
      </div>
  );
}
