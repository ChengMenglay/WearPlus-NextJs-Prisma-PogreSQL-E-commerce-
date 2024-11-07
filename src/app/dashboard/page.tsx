import { ChartComponent } from "@/components/Chart";
import { Card } from "@/components/ui/card";
import {
  CircleDollarSign,
  PackageSearch,
  ShoppingCart,
  User,
} from "lucide-react";
import React from "react";

export default function Dashbord() {
  return (
    <div className="space-y-2 py-4 px-4">
      <Card className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 ">
        <Card className="w-full bg-muted/50 rounded-lg  aspect-video h-[100px] flex items-center">
          <div className="flex px-2 space-x-2">
            <div className="w-[60px] h-[60px] rounded-md flex justify-center items-center bg-[rgba(233,233,233)]">
              <ShoppingCart size={25} />
            </div>
            <div>
              <h1 className="text-xs font-semibold text-[#6F6F6F]">Order</h1>
              <span className="text-xl font-bold ">299</span>
            </div>
          </div>
        </Card>
        <Card className="w-full bg-muted/50 rounded-lg  aspect-video h-[100px] flex items-center">
          <div className="flex px-2 space-x-2">
            <div className="w-[60px] h-[60px] rounded-md flex justify-center items-center bg-[rgba(233,233,233)]">
              <User size={25} />
            </div>
            <div>
              <h1 className="text-xs font-semibold text-[#6F6F6F]">
                Customers
              </h1>
              <span className="text-xl font-bold">20</span>
            </div>
          </div>
        </Card>
        <Card className="w-full bg-muted/50 rounded-lg  aspect-video h-[100px] flex items-center">
          <div className="flex px-2 space-x-2">
            <div className="w-[60px] h-[60px] rounded-md flex justify-center items-center bg-[rgba(233,233,233)]">
              <PackageSearch size={25} />
            </div>
            <div>
              <h1 className="text-xs font-semibold text-[#6F6F6F]">
                Active Now
              </h1>
              <span className="text-xl font-bold ">30</span>
            </div>
          </div>
        </Card>
        <Card className="w-full bg-muted/50 rounded-lg  aspect-video h-[100px] flex items-center">
          <div className="flex px-2 space-x-2">
            <div className="w-[60px] h-[60px] rounded-md flex justify-center items-center bg-[rgba(233,233,233)]">
              <CircleDollarSign size={25} />
            </div>
            <div>
              <h1 className="text-xs font-semibold text-[#6F6F6F]">
                Total Revenue
              </h1>
              <span className="text-xl font-bold">$ 299</span>
            </div>
          </div>
        </Card>
      </Card>
      <Card className="grid grid-cols-1 rounded-lg">
        <ChartComponent />
      </Card>
    </div>
  );
}
