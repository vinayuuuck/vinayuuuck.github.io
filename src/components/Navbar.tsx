import exp from "constants";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-inherit-900 py-6 p-4 font-sans">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="text-black text-2xl font-bold">
              Vinayak Singh Bhadoriya
            </Link>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                className="text-black hover:text-pink-500 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/articles"
                className="text-black hover:text-pink-500 transition duration-300"
              >
                Articles
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
