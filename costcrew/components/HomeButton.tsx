import Link from "next/link";

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="py-2 px-3 mr-4 flex rounded-md no-underline bg-emerald-700 hover:bg-emerald-800"
    >
      CostCrew
    </Link>
  );
}
