import useFetch from "../hooks/useFetch";

interface Props {
  title: string;
  endpoint: string;
}

function OldFigure({ title, endpoint }: Props) {
  const { data, loading, error } = useFetch(`http://localhost:3001${endpoint}`);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  const img = data?.image;

  return (
    <div className="figure img-fluid">
      <a href={img} target="_blank">
        <img src={img} alt={title} className="img-fluid" />
      </a>
      <span>{title}</span>
    </div>
  );
}

export default OldFigure;
