import React from "react";

function Button() {
  React.useEffect(() => {
    console.log("run...");
  }, []);

  return <button className="">button</button>;
}

export { Button };
