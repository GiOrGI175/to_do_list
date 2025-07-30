'use client';

import React, { useEffect } from 'react';

import { useState } from 'react';
import Header from './Header';
import Form from './Form';
import Todos from './Todos';

export type todosT = {
  id: number;
  text: string;
  checked: boolean;
  time: string;
};

export default function VanishList() {
  const [todos, setTodos] = useState<todosT[]>([]);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (hasChecked && todos.length > 0) {
      const todosString = JSON.stringify(todos);

      localStorage.setItem('Todos', todosString);
    }
  }, [todos, hasChecked]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTodosString = localStorage.getItem('Todos');

      if (savedTodosString) {
        const savedTodos = JSON.parse(savedTodosString);
        setTodos(savedTodos);
      }

      setHasChecked(true);
    }
  }, []);

  const handleCheck = (id: number) => {
    setTodos((pv) =>
      pv.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const removeElement = (id: number) => {
    setTodos((pv) => pv.filter((t) => t.id !== id));
  };

  return (
    <section
      className='min-h-screen bg-zinc-950 py-24'
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div className='mx-auto w-full max-w-xl px-4'>
        <Header />
        <Todos
          removeElement={removeElement}
          todos={todos}
          handleCheck={handleCheck}
        />
      </div>
      <Form setTodos={setTodos} />
    </section>
  );
}
