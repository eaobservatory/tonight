import { getDog } from "@/utils/dog";

export const revalidate = 20; // need this for non fetch requests, fetch requests override this with 'next: {revalidate: 60}'

export default async function Test2Page() {
  const dog = await getDog();
  return <img src={dog} alt="dog" />;
}
