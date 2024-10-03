import { Component } from "@/app/components/Chart";
import Link from "next/link";

export default function Charts() {
  return (
    <div>
      <h1>Charts</h1>

      <Link href="/">Map</Link>
      <Link href="/animations">Animations</Link>
      <Link href="/charts">charts</Link>

      <div style={{ maxHeight: "50px" }}>
        <Component />
      </div>
    </div>
  );
}
