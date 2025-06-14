import { UserCard } from "./UserCard";

const mockedPeopleToFollow = [
  { id: 1, name: "Jim Halpert", following: false },
  { id: 2, name: "Pam Beesly", following: false },
  { id: 3, name: "Dwight Schrute", following: true },
  { id: 4, name: "Michael Scott", following: false },
  { id: 5, name: "Angela Martin", following: true },
];

export const PeopleToFollow = () => {
  return (
    <section className="rounded-lg bg-white p-4 shadow">
      <h2 className="text-lg font-semibold mb-2">People to Follow</h2>
      <ul>
        {mockedPeopleToFollow.map((person) => (
          <UserCard key={person.id} {...person} />
        ))}
      </ul>
    </section>
  );
};
