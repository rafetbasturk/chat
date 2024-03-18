export default function ContactsSkeleton() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-2 px-4">
      <div className="p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4 items-center">
          <div className="rounded-full bg-gray-200 h-10 w-10"></div>
          <div className="grow">
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4 items-center">
          <div className="rounded-full bg-gray-200 h-10 w-10"></div>
          <div className="grow">
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4 items-center">
          <div className="rounded-full bg-gray-200 h-10 w-10"></div>
          <div className="grow">
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
