interface Props {
  title: string;
  src: string;
}

function OldFigure({ title, src }: Props) {
  return (
    <div className="figure img-fluid">
      <a href={src} target="_blank">
        <img src={src} alt={title} className="img-fluid" />
      </a>
      <span>{title}</span>
    </div>
  );
}

export default OldFigure;
