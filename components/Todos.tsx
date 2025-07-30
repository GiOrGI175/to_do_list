'use client';
import { AnimatePresence } from 'framer-motion';
import Todo from './Todo';
import { todosT } from './Vanishlist';

type TodosPropsT = {
  todos: todosT[];
  handleCheck: (id: number) => void;
  removeElement: (id: number) => void;
};

export default function Todos({
  todos,
  handleCheck,
  removeElement,
}: TodosPropsT) {
  return (
    <div className='w-full space-y-3'>
      <AnimatePresence>
        {todos.map((t) => (
          <Todo
            handleCheck={handleCheck}
            removeElement={removeElement}
            id={t.id}
            key={t.id}
            checked={t.checked}
            time={t.time}
          >
            {t.text}
          </Todo>
        ))}
      </AnimatePresence>
    </div>
  );
}
