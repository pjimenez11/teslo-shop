export const LoadingPlaceOrder = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-min">
      <h2 className="text-2xl  mb-2">Dirección de entrega</h2>
      <div className="mb-10 gap-1 flex flex-col">
        <p className="text-xl bg-gray-300 animate-pulse rounded">&nbsp;</p>
        <p className="text-sm bg-gray-300 animate-pulse rounded">&nbsp;</p>
        <p className="text-sm w-2/3 bg-gray-300 animate-pulse rounded">
          &nbsp;
        </p>
        <p className="text-sm w-1/2 bg-gray-300 animate-pulse rounded">
          &nbsp;
        </p>
        <p className="text-sm w-1/2 bg-gray-300 animate-pulse rounded">
          &nbsp;
        </p>
        <p className="text-sm w-1/2 bg-gray-300 animate-pulse rounded">
          &nbsp;
        </p>
      </div>

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2 gap-1">
        <span className="bg-gray-300 animate-pulse rounded">&nbsp;</span>
        <div className="flex justify-end">
          <span className="w-1/2 bg-gray-300 animate-pulse rounded">
            &nbsp;
          </span>
        </div>

        <span className="bg-gray-300 animate-pulse rounded">&nbsp;</span>
        <div className="flex justify-end">
          <span className="w-1/2 bg-gray-300 animate-pulse rounded">
            &nbsp;
          </span>
        </div>

        <span className="bg-gray-300 animate-pulse rounded">&nbsp;</span>
        <div className="flex justify-end">
          <span className="w-1/2 bg-gray-300 animate-pulse rounded">
            &nbsp;
          </span>
        </div>
        <span className="mt-5 text-2xl bg-gray-300 rounded">&nbsp;</span>
        <div className="flex justify-end">
          <span className="w-1/2 mt-5 text-2xl bg-gray-300 animate-pulse rounded">
            &nbsp;
          </span>
        </div>
      </div>

      <div className="mt-6 mb-2 w-full">
        <p className="mb-5 bg-gray-300 animate-pulse rounded p-1">&nbsp;</p>

        <div className="flex justify-center py-2 px-4 bg-gray-300 animate-pulse rounded">
          &nbsp;
        </div>
      </div>
    </div>
  );
};
