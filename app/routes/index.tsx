import { Link } from "@remix-run/react";
import * as React from "react";

export default function Index() {
  return (
    <ul>
      <li>
        <Link to="home">Home Page</Link>
      </li>
      <li>
        <Link to="counter">Counter Page</Link>
      </li>
      <li>
        <Link to="dump-loader-args">Dump Loader Args Page</Link>
      </li>
    </ul>
  );
}
