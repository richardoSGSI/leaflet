"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/app/components/Input";
import "../app/globals.css"


export default function About() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <div>
      <h1>Animations</h1>
      <Link href="/">Map</Link>
      <Link href="/animations">Animations</Link>
      <Link href="/charts">charts</Link>

      <motion.div
      style={{border: "1px solid black", width: "100px", height: "100px"}}
    drag
    dragConstraints={{
      top: -200,
      left: -200,
      right: 200,
      bottom: 200,
    }}
  />

      <div className="example">
        <div>
          <motion.div
          drag={true}
          dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50,
          }}
            className="box"
            // animate={{ x, y, rotate }}
            // transition={{ type: "spring" }}
          />
        </div>
        <div className="inputs">
          <Input value={x} set={setX}>
            x
          </Input>
          <Input value={y} set={setY}>
            y
          </Input>
          <Input value={rotate} set={setRotate} min={-180} max={180}>
            rotate
          </Input>
        </div>
      </div>
    </div>
  );
}
