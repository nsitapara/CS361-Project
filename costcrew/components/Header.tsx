import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import Image from "next/image";

export default function Header() {
  return (
    <div className="pt-[20%]">
      <p className="text-2xl lg:text-2xl mx-auto max-w-xl text-center">
        <b>CostCrew</b>: Free and Effortless Expense Sharing for Your Crew
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      <p className="text-2xl lg:text-2xl mx-auto max-w-xl text-center">
        <i>
          CostCrew is your go-to solution for hassle-free expense sharing within
          your group. Whether you're splitting bills with roommates, organizing
          a group trip, or simply sharing costs with friends, CostCrew makes it
          easy and efficient.
        </i>
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      <div className="pt-10 flex gap-16 justify-center">
        <Image
          src="/images/home/image1.png"
          alt="CostCrew"
          width={75}
          height={75}
        />
        <Image
          src="/images/home/image2.png"
          alt="CostCrew"
          width={75}
          height={75}
        />
        <Image
          src="/images/home/image3.png"
          alt="CostCrew"
          width={75}
          height={75}
        />
        <Image
          src="/images/home/image4.png"
          alt="CostCrew"
          width={75}
          height={75}
        />
      </div>
    </div>
  );
}
