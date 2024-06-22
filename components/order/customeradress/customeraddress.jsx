import { Card } from "@material-tailwind/react";

// import { Card } from "flowbite-react";
function CustomerAdress({ title, info }) {
  return (
    <>
      <section className=" mb-3">
        <Card className="p-6 border rounded-none " shadow={false}>
          <div>
            <span className="mb-3">{title}</span>
            <div>{info}</div>
          </div>
        </Card>
      </section>
    </>
  );
}

export default CustomerAdress;
