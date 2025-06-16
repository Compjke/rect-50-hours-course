import { Suspense, use } from 'react';
import { TodoList } from './components/TodoList';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from './components/ThemeProvider';
import { FormWithAction } from './components/FormWithAction';
import { CountWithUseActionState } from './components/CountWithUseActionState';
import { UseTransitionTest } from './components/UseTransitonTest/UseTransitionTest';
import { ThemeContext, type ThemeContextProps } from './context/themeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = use(ThemeContext) as ThemeContextProps;

  return (
    <div className="w-full p-2 bg-emerald-400 dark:bg-emerald-800">
      <button
        className="p-2 dark:text-slate-300 bg-gray-200 dark:bg-gray-700 rounded ml-auto block"
        onClick={toggleTheme}
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export const App = () => {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
      <div className="bg-gray-100 dark:bg-gray-800 ">
        <UseTransitionTest />
        <div className="py-5">
          <FormWithAction />
        </div>
        <CountWithUseActionState />
        <ErrorBoundary
          fallback={<div className="text-red-500">Something went wrong!</div>}
        >
          <Suspense
            fallback={
              <div className="h-20 flex items-center justify-center">
                Loading...
              </div>
            }
          >
            <TodoList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  );
};
