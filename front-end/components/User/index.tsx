import { FC } from "react";

interface Props {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
}

const User: FC<Props> = ({ displayName, email }) => {
  return (
    <div>
      <h4>{displayName}</h4>
      <p>{email}</p>
    </div>
  );
};

export default User;
