export const LoandingCartProduct = () => {
  return (
    <div className="flex mb-5 w-full p-2 rounded bg-gray-200 animate-pulse">
      <div
        className="mr-5 rounded animate-pulse bg-gray-400"
        style={{
          width: "100px",
          height: "100px",
        }}
      />

      <div className="w-full">
        <p className="animate-pulse bg-gray-400 w-full rounded mb-2">&nbsp;</p>
        <p className="animate-pulse bg-gray-400 w-1/2 rounded mb-2">&nbsp;</p>
        <button className="mt-3 animate-pulse bg-gray-400  w-full rounded">
          &nbsp;
        </button>
      </div>
    </div>
  );
};
