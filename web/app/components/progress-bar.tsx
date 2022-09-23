import { useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

export function useProgressBar(): React.RefObject<HTMLDivElement> {
  const el = useRef<HTMLDivElement>(null);
  const timeout = useRef<NodeJS.Timeout>();
  const { location } = useTransition();

  useEffect(() => {
    const element = el.current;

    if (!location || !element) {
      return;
    }

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    element.style.width = `0%`;

    let updateWidth = (ms: number) => {
      timeout.current = setTimeout(() => {
        let width = parseFloat(element.style.width);
        let percent = !isNaN(width) ? 10 + 0.9 * width : 0;

        element.style.width = `${percent}%`;

        updateWidth(100);
      }, ms);
    };

    updateWidth(300);

    return () => {
      clearTimeout(timeout.current);

      if (element.style.width === `0%`) {
        return;
      }

      element.style.width = `100%`;
      timeout.current = setTimeout(() => {
        if (element.style.width !== "100%") {
          return;
        }

        element.style.width = ``;
      }, 200);
    };
  }, [location]);

  return el;
}

export const ProgressBar: React.FC = () => {
  const progress = useProgressBar();

  return (
    <div className="fixed top-0 left-0 right-0 flex h-1">
      <div
        ref={progress}
        className="bg-gradient-to-r from-slate-600 via-blue-500 to-cyan-500 transition-all ease-out"
      />
    </div>
  );
};
