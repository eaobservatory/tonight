import useFetch from "../hooks/useFetch";

interface Props {
  title: string;
  endpoint: string;
}

function Figure({ title, endpoint }: Props) {
  const { data } = useFetch(`http://localhost:3001${endpoint}`);
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

export default Figure;
