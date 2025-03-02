import Image from 'next/image';
import Link from 'next/link';
import MobileNav from '../MobileNav/MobileNav';
import { Button } from '../ui/button';


const Navbar = () => {
  return (
    <nav className="flex justify-between sticky top-0 left-0 z-50 w-full bg-[#383838] px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="yoom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Book Me
        </p>
      </Link>
      <div className="flex-between gap-5">
        <Button>
            <Link href="/auth/sign-in">Login</Link>
        </Button>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;