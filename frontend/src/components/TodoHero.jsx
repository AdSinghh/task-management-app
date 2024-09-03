import React from 'react';

function TodoHero({ todos_completed, total_todos }) {
  return (
    <section className="border border-[#c2b39a] flex items-center justify-around self-center w-full p-3 rounded-[11px]">
      <div>
        <p className="text-2xl">Task Done</p>
        <p className="text-xl">Keep it up</p>
      </div>
      <div className="bg-[#88ab33] w-[150px] h-[150px] rounded-full flex items-center justify-center text-4xl">
        {todos_completed}/{total_todos}
      </div>
    </section>
  );
}

export default TodoHero;
