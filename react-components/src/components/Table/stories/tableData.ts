import { TableColumn } from 'tetacom/react-components';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

export const data: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

export const columns = [
  new TableColumn({
    name: 'firstName',
    caption: 'First Name',
  }),
  new TableColumn({
    name: 'lastName',
    caption: 'Last Name',
  }),
  new TableColumn({
    name: 'age',
    caption: 'Age',
  }),
  new TableColumn({
    name: 'visits',
    caption: 'Visits',
  }),
  new TableColumn({
    name: 'status',
    caption: 'Status',
  }),
  new TableColumn({
    name: 'progress',
    caption: 'Progress',
  }),
];
