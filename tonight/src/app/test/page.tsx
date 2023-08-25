import RandomDog from "@/components/RandomDog";

export const revalidate = 20;

export default async function TestPage() {
  return <RandomDog />;
}
