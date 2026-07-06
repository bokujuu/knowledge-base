import type {ReactNode} from 'react';

type Props = {
  title: string;
  subtitle: string;
  traits: string[];
  description: string;
  children: ReactNode;
};

export function DemoCard({
  title,
  subtitle,
  traits,
  description,
  children,
}: Props) {
  return (
    <article className="card">
      <div className="card-head">
        <div>
          <h2>{title}</h2>
          <p className="card-subtitle">{subtitle}</p>
        </div>
        <ul className="traits">
          {traits.map((trait) => (
            <li key={trait}>{trait}</li>
          ))}
        </ul>
      </div>
      <div className="stage">{children}</div>
      <p className="card-desc">{description}</p>
    </article>
  );
}
