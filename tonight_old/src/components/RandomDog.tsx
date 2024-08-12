export default async function RandomDog() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random", {
      // next: { revalidate: 40 },
    });
    const data = await response.json();
    const dog = data.message;
    return <img src={dog} alt="dog" />;
  } catch (e) {
    return <p>{(e as Error).message}</p>;
  }
}
