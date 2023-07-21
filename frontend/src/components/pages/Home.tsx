import Figure from "../Figure";

function Home() {
  return (
    <>
      <Figure
        endpoint="/api/test"
        groups={[
          ["nmnCryo_ls_temp1"],
          ["nmnCryo_ls_temp3", "nmnCryo_ls_temp4", "nmnCryo_ls_temp2"],
        ]}
      />
    </>
  );
}

export default Home;
