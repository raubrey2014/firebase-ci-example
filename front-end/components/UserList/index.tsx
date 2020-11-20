import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { db } from "../../config";
import NewUserForm from "../NewUserForm";
import User from "../User";

const userCollection = db.collection("users");

export function UserList() {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const snapshot = await userCollection.get();
    setUsers(snapshot.docs.map((x) => x.data()));
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Row>
      <Col xs={24} sm={10} style={{ margin: 10 }}>
        <Card title="New User">
          <NewUserForm onSuccess={getUsers} />
        </Card>
      </Col>

      <Col xs={24} sm={10} style={{ margin: 10 }}>
        <Card title="User List">
          <h4>...these people have! (don't do it forreal)</h4>
          {users.map((user, index) => (
            <User key={`${user.uid}-${index}`} {...user} />
          ))}
        </Card>
      </Col>
    </Row>
  );
}
