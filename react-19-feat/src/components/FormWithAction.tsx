const formAction = (formdata: FormData) => {
  const userData = {
    name: formdata.get('name'),
    email: formdata.get('email'),
    password: formdata.get('password'),
  };
  console.log({ userData });
};

export const FormWithAction = () => {
  return (
    <form
      action={formAction}
      className="max-w-lg mx-auto  flex flex-col items-center gap-4 w-full bg-blue-200 dark:bg-gray-900 p-6 rounded shadow-lg"
    >
      <div className="w-md mx-auto p-4  rounded ">
        <label className="text-gray-700 dark:text-amber-200" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          className="border p-2 rounded mb-4 w-full dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="w-md mx-auto p-4 rounded ">
        <label className="text-gray-700 dark:text-amber-200" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="border p-2 rounded mb-4 w-full dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="w-md mx-auto p-4 rounded ">
        <label className="text-gray-700 dark:text-amber-200" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="border p-2 rounded mb-4 w-full dark:bg-gray-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};
