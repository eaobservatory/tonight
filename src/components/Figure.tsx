interface Props {
  title: string;
  src: string;
}

function Figure({ title, src }: Props) {
  return (
    <div className="figure">
      <a href={src} target="_blank">
        <img src={src} alt={title} className="img-fluid figure-image" />
      </a>
      <span>{title}</span>
    </div>
  );
}

export default Figure;
