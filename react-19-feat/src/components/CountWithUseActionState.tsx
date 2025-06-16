import { useActionState, startTransition } from 'react';

const changeCountAction = async (prevState: number, sign: '+' | '-') => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
  switch (sign) {
    case '+':
      return prevState + 1;
    case '-':
      return prevState - 1;
  }
};

export const CountWithUseActionState = () => {
  const [state, dispatch, isPending] = useActionState(changeCountAction, 0);
  

  const handleClick = (sign: '+' | '-') => {
    startTransition(() => {
      dispatch(sign);
    });
  };

  return (
    <>
      <h3 className="text-gray-700 dark:text-amber-200 text-center text-xl font-bold py-4">
        CountWithUseActionState
      </h3>
      <div className="flex justify-center items-center gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
          onClick={() => handleClick('-')}
          disabled={isPending}
        >
          -
        </button>
        <span className="text-2xl font-bold dark:text-slate-300">
          {isPending ? 'Loading...' : state}
        </span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
          onClick={() => handleClick('+')}
          disabled={isPending}
        >
          +
        </button>
      </div>
    </>
  );
};
