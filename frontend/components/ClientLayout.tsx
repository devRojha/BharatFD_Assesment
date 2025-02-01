// components/ClientLayout.tsx
"use client";

import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";
import Appbar from "./Appbar";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({ children }: { children: React.ReactNode }){
    return (
    <RecoilRoot>
      <div className={inter.className}>
        <Appbar />
        <div className="pt-24 bg-white">
          {children}
        </div>
      </div>
    </RecoilRoot>
  );
}