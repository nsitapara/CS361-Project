import DeployButton from "../components/HomeButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import Menu from "../components/Menu";
import Link from "next/link";
import Image from "next/image";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 flex items-center">
      <div>
        <p className="text-2xl lg:text-2xl mx-auto max-w-xl text-center">
          <b>CostCrew</b>: Free and Effortless Expense Sharing for Your Crew
        </p>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
        <p className="text-2xl lg:text-2xl mx-auto max-w-xl text-center">
          <i>
            CostCrew is your go-to solution for hassle-free expense sharing
            within your group. Whether you're splitting bills with roommates,
            organizing a group trip, or simply sharing costs with friends,
            CostCrew makes it easy and efficient.
          </i>
        </p>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
        <div className="flex gap-16 justify-center">
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
        <div className="text-center py-10">
          <Link
            href="/about"
            className="text-sky-400 no-underline hover:underline text-lg"
          >
            Click Here to Learn more About CostCrew
          </Link>
        </div>
      </div>
    </div>
  );
}
