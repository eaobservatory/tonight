import { cache } from "react";

// export const revalidate = 60;

export const getDog = cache(async () => {
  const response = await fetch("https://dog.ceo/api/breeds/image/random", {
    // next: { revalidate: 60 },
  });
  const data = await response.json();
  const dog = data.message;
  return dog;
});

// export default async function RandomDog() {
//   try {
//     // const response = await fetch("https://dog.ceo/api/breeds/image/random", {
//     //   // next: { revalidate: 40 },
//     // });
//     // const data = await response.json();
//     // const dog = data.message;
//     const dog = await getDog();
//     return <img src={dog} alt="dog" />;
//   } catch (e) {
//     return <p>{(e as Error).message}</p>;
//   }
// }
