import Dot from "./dot";

interface BulletListProps {
  bullets: string[];
}

export function BulletList({ bullets }: BulletListProps) {
  return (
    <ul>
      {bullets.map((bullet, idx) => (
        <li key={idx} className="flex gap-2">
          <span className="mt-2">
            <Dot className="align-top" />
          </span>
          <p className="inline">{bullet}</p>
        </li>
      ))}
    </ul>
  );
}
