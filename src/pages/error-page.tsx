import { useRouteError } from "react-router-dom";

interface error {
    statusText: string;
    message: string;
  }

export default function ErrorPage() {
  const error = Error || { statusText: "", message: "" };

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        
      </p>
    </div>
  );
}