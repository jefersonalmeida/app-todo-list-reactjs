import styles from './App.module.css';
import {Header} from './components/Header';
import {Task} from './components/Task/Task.tsx';
import './global.css';

export function App() {

  return (
      <main>
        <Header/>
        <section className={styles.container}>
          <Task/>
        </section>
      </main>
  );
}
