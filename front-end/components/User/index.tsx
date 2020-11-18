import { FC } from "react";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
}

const User: FC<Props> = ({ firstName, lastName, email }) => {
  return (
    <div>
      <h4>
        {firstName} {lastName}
      </h4>
      <p>{email}</p>
    </div>
  );
};

export default User;
