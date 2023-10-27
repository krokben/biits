import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-semibold text-xl">INTERNAL SERVER ERROR</h3>
        <p>
          Go back <Link href="/">home</Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
