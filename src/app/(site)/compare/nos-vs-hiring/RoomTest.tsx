"use client";

import { useState } from "react";

export default function RoomTest() {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  return (
    <div className="ndh-roomtest">
      <p className="ndh-roomtest-q">
        <span className="ndh-accent-o">The Room Test:</span> Can your sales team consistently articulate your value in a way that resonates with buyers, without you in the room?
      </p>
      <div className="ndh-choices">
        <button
          type="button"
          className={answer === "yes" ? "selected" : ""}
          onClick={() => setAnswer("yes")}
        >
          Yes, they can
        </button>
        <button
          type="button"
          className={answer === "no" ? "selected" : ""}
          onClick={() => setAnswer("no")}
        >
          No, they can&apos;t
        </button>
      </div>
      {answer === "yes" && (
        <p className="ndh-roomtest-answer">
          Then your story already transfers, and your constraint is probably capacity, coverage, or process. A senior hire may serve you better than a system install. Read the section below on when hiring first is the right call; this page will still be here if the answer changes as you scale.
        </p>
      )}
      {answer === "no" && (
        <p className="ndh-roomtest-answer">
          <strong>That&apos;s StoryLock:</strong> the structural condition where your company&apos;s story, selling logic, and conviction are trapped in your head. Every hire you make before resolving it is hired into that vacuum. Keep reading; the math below is about you.
        </p>
      )}
    </div>
  );
}
