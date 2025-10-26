// components/Spinner.tsx

import NeonSign from "./NeonSign";

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center gap-5 items-center h-screen w-screen bg-black">
      
      <div className="mb-8  flex justify-center items-center">
        <NeonSign/>
      </div>

    </div>
  );
};

export default Spinner;
