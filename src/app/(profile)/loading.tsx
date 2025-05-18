import Link from "next/link";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-800 border-t-black dark:border-t-white rounded-full animate-spin"></div>

        <div className="mt-8">
          <Link href="/" className="font-bold text-black text-2xl sm:text-2xl">
            WEARPLUS
          </Link>
        </div>
      </div>
    </div>
  );
}
