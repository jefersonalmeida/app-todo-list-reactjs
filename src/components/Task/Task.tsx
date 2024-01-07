import {PlusCircle} from '@phosphor-icons/react';
import {ChangeEvent, FormEvent, InvalidEvent, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {TaskType} from '../../types/task.type.ts';
import {Button} from '../Button.tsx';
import {Input} from '../Input.tsx';
import styles from './Task.module.css';
import {TaskEmpty} from './TaskEmpty.tsx';
import {TaskHeader as ListHeader} from './TaskHeader.tsx';
import {TaskItem} from './TaskItem.tsx';

export function Task() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [task, setTask] = useState('');

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setTask(event.target.value);
  }

  function handleInvalidInput(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório');
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    if (!task) {
      return;
    }

    const newTask: TaskType = {
      id: uuid(),
      text: task,
      done: false,
    };

    setTasks((state) => [...state, newTask]);
    setTask('');
  }

  function handleDeleteTask(id: string) {
    if (!confirm('Deseja mesmo apagar essa tarefa?')) {
      return;
    }

    const tasksWithoutDeletedOne = tasks.filter(task => task.id !== id);
    setTasks(tasksWithoutDeletedOne);
  }

  function handleToggleTask({id, value}: { id: string; value: boolean }) {
    const updatedTasks = tasks.map(task => ({
      ...task,
      done: task.id !== id ? task.done : value,
    }));

    setTasks(updatedTasks);
  }

  const isTaskInvalid = task.length <= 3;
  const isTaskEmpty = tasks.length > 0;
  const tasksDoneCounter = tasks.reduce((acc, task) => task.done ? acc + 1 : acc, 0);

  return (
      <>
        <div className={styles.container}>
          <form onSubmit={handleCreateTask}>
            <Input
                name="task"
                value={task}
                onChange={handleChangeInput}
                onInvalid={handleInvalidInput}
                required={true}
            />
            <Button type="submit" disabled={isTaskInvalid}>
              Criar
              <PlusCircle size={16} color="#f2f2f2" weight="bold"/>
            </Button>
          </form>

        </div>
        <div className={styles.tasksList}>
          <ListHeader
              tasksCount={tasks.length}
              tasksDoneCount={tasksDoneCounter}
          />

          {isTaskEmpty
              ? <div>
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        data={task}
                        removeTask={handleDeleteTask}
                        toggleTaskStatus={handleToggleTask}
                    />
                ))}
              </div>
              : <TaskEmpty/>}
        </div>
      </>
  );
}