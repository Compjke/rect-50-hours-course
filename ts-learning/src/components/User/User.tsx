import type { FC } from "react";

interface User {
  firstName: string;
  lastName: string;
  age: number;

}

export const User: FC<User> = ({ firstName, lastName, age }) => {
  return (
    <div>
      <h2>
        {firstName} {lastName}
      </h2>
      <p>Age: {age}</p>
    </div>
  );
};
