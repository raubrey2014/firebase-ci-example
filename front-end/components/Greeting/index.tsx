import { FC } from "react";
import { Button, Card } from "antd";
import { functions } from "../../config";
import { useState } from "react";

const Greeting: FC = () => {
  const [loading, setLoading] = useState(false);
  const [greeting, setGreeting] = useState("");

  const greet = async () => {
    setLoading(true);
    const result = await functions.httpsCallable("helloWorld")();
    setGreeting(result.data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Card>
      <h3>Get a greeting!</h3>
      {greeting && <p>{greeting}</p>}
      <Button loading={loading} onClick={greet}>
        Get Greeting
      </Button>
    </Card>
  );
};

export default Greeting;
