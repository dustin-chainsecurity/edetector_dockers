/** @format */

import { useEffect } from "react";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "Error !";
  }, []);

  return <h1 className="error">Error Page Not Found</h1>;
};

export default ErrorPage;