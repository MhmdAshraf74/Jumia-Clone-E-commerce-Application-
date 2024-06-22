import { Button } from "@material-tailwind/react";

function SaveButton({ handleSubmit, label, color, disabled }) {
  return (
    <div>
      <Button
        color={color}
        className="font-semibold uppercase rounded w-full text-white "
        onClick={() => handleSubmit()}
        disabled={disabled}
      >
        {label}
      </Button>
    </div>
  );
}

export default SaveButton;
