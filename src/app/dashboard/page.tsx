import { SalesChart } from "@/components/Chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CircleDollarSign,
  PackageSearch,
  ShoppingCart,
  User,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  Clock,
} from "lucide-react";
import React, { ReactNode } from "react";
import { prisma } from "@/lib/prisma";
import { formatter } from "@/lib/utils";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";

// Define types for StatsCard props
interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: number | string;
  trend: string;
  description: string;
  trendColor?: string;
  trendIcon?: ReactNode;
  bgColor?: string;
}

// Helper component for stats cards
function StatsCard({
  icon,
  title,
  value,
  trend,
  description,
  trendColor = "text-green-500",
  trendIcon = <TrendingUp className="h-4 w-4 ml-1" />,
  bgColor = "bg-white",
}: StatsCardProps) {
  return (
    <Card
      className={`${bgColor} overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300`}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div className="w-12 h-12 rounded-full flex justify-center items-center bg-primary/10 text-primary">
            {icon}
          </div>
          <div
            className={`flex items-center ${trendColor} rounded-full px-2 py-1 bg-opacity-10 ${trendColor.replace(
              "text",
              "bg"
            )}`}
          >
            <span className="text-sm font-medium">{trend}</span>
            {trendIcon}
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </h2>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function for status colors
function getStatusColor(status: string): string {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Canceled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Helper function to calculate percentage change
function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export default async function Dashboard() {
  // Get current date and previous month date
  const currentDate = new Date();
  const previousMonthDate = subMonths(currentDate, 1);

  const currentMonthStart = startOfMonth(currentDate);
  const currentMonthEnd = endOfMonth(currentDate);
  const previousMonthStart = startOfMonth(previousMonthDate);
  const previousMonthEnd = endOfMonth(previousMonthDate);

  // Fetch current month data
  const [
    currentMonthOrders,
    currentMonthCustomers,
    productCount,
    recentOrders,
    lowStockProducts,
  ] = await Promise.all([
    prisma.order.count({
      where: {
        createdAt: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
    }),
    prisma.user.count({
      where: {
        role: "user",
        createdAt: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
    }),
    prisma.product.count({ where: { isArchived: false } }),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        orderItems: { include: { product: true } },
        address: { include: { user: true } },
      },
    }),
    prisma.product.count({
      where: { stock: { lt: 10 }, isArchived: false },
    }),
  ]);

  // Fetch previous month data
  const [previousMonthOrders, previousMonthCustomers, previousMonthRevenue] =
    await Promise.all([
      prisma.order.count({
        where: {
          createdAt: {
            gte: previousMonthStart,
            lte: previousMonthEnd,
          },
        },
      }),
      prisma.user.count({
        where: {
          role: "user",
          createdAt: {
            gte: previousMonthStart,
            lte: previousMonthEnd,
          },
        },
      }),
      prisma.order
        .findMany({
          where: {
            isPaid: true,
            createdAt: {
              gte: previousMonthStart,
              lte: previousMonthEnd,
            },
          },
          include: { orderItems: true },
        })
        .then((orders) => {
          return orders.reduce((total, order) => {
            const orderTotal = order.orderItems.reduce((sum, item) => {
              return sum + Number(item.price) * item.quantity;
            }, 0);
            return total + orderTotal;
          }, 0);
        }),
    ]);

  // Calculate total revenue for current month
  const currentMonthRevenue = await prisma.order
    .findMany({
      where: {
        isPaid: true,
        createdAt: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
      include: { orderItems: true },
    })
    .then((orders) => {
      return orders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((sum, item) => {
          return sum + Number(item.price) * item.quantity;
        }, 0);
        return total + orderTotal;
      }, 0);
    });

  // Calculate trends
  const orderTrend = calculateTrend(currentMonthOrders, previousMonthOrders);
  const customerTrend = calculateTrend(
    currentMonthCustomers,
    previousMonthCustomers
  );
  const revenueTrend = calculateTrend(
    currentMonthRevenue,
    previousMonthRevenue
  );

  // Get order status counts
  const pendingOrders = await prisma.order.count({
    where: { status: "Pending" },
  });
  const completedOrders = await prisma.order.count({
    where: { status: "Completed" },
  });
  const canceledOrders = await prisma.order.count({
    where: { status: "Canceled" },
  });

  const year = new Date().getFullYear();

  const salesData = await Promise.all(
    Array.from({ length: 12 }).map(async (_, i) => {
      const date = new Date(year, i); // i = month index from 0 (Jan) to 11 (Dec)
      const month = format(date, "MMMM");
      const startDate = startOfMonth(date);
      const endDate = endOfMonth(date);

      const orders = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
          isPaid: true,
        },
        include: {
          orderItems: true,
        },
      });

      const orderCount = orders.length;

      const revenue = orders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((sum, item) => {
          return sum + Number(item.price) * item.quantity;
        }, 0);
        return total + orderTotal;
      }, 0);

      return {
        month,
        revenue,
        orders: orderCount,
      };
    })
  );

  // No need to reverse — this is already Jan to Dec
  const chartData = salesData;
  // Calculate total orders
  const totalOrders = pendingOrders + completedOrders + canceledOrders;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-1.5 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground mt-1">
                Overview of your store performance and sales
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-white rounded-lg p-2 border shadow-sm">
              <CalendarDays className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                {format(currentDate, "MMMM yyyy")}
              </span>
            </div>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            icon={<ShoppingCart className="h-5 w-5" />}
            title="Orders"
            value={currentMonthOrders}
            trend={`${orderTrend >= 0 ? "+" : ""}${orderTrend}%`}
            description="from last month"
            trendColor={orderTrend >= 0 ? "text-green-500" : "text-red-500"}
            trendIcon={
              orderTrend >= 0 ? (
                <TrendingUp className="h-4 w-4 ml-1" />
              ) : (
                <TrendingDown className="h-4 w-4 ml-1" />
              )
            }
          />
          <StatsCard
            icon={<User className="h-5 w-5" />}
            title="Customers"
            value={currentMonthCustomers}
            trend={`${customerTrend >= 0 ? "+" : ""}${customerTrend}%`}
            description="new registrations"
            trendColor={customerTrend >= 0 ? "text-green-500" : "text-red-500"}
            trendIcon={
              customerTrend >= 0 ? (
                <TrendingUp className="h-4 w-4 ml-1" />
              ) : (
                <TrendingDown className="h-4 w-4 ml-1" />
              )
            }
          />
          <StatsCard
            icon={<PackageSearch className="h-5 w-5" />}
            title="Products"
            value={productCount}
            trend={lowStockProducts > 0 ? `-${lowStockProducts}` : "+0"}
            description={
              lowStockProducts > 0
                ? `${lowStockProducts} low stock`
                : "all in stock"
            }
            trendColor={
              lowStockProducts > 0 ? "text-red-500" : "text-green-500"
            }
            trendIcon={
              lowStockProducts > 0 ? (
                <TrendingDown className="h-4 w-4 ml-1" />
              ) : (
                <TrendingUp className="h-4 w-4 ml-1" />
              )
            }
          />
          <StatsCard
            icon={<CircleDollarSign className="h-5 w-5" />}
            title="Revenue"
            value={formatter.format(currentMonthRevenue || 0)}
            trend={`${revenueTrend >= 0 ? "+" : ""}${revenueTrend}%`}
            description="compared to last month"
            trendColor={revenueTrend >= 0 ? "text-green-500" : "text-red-500"}
            trendIcon={
              revenueTrend >= 0 ? (
                <TrendingUp className="h-4 w-4 ml-1" />
              ) : (
                <TrendingDown className="h-4 w-4 ml-1" />
              )
            }
          />
        </div>

        {/* Charts and Status */}
        <div className="grid gap-8 md:grid-cols-8 grid-cols-12 mb-8">
          <Card className="col-span-12 lg:col-span-5 border-none shadow-md">
            <CardContent className="pt-6">
              <SalesChart data={chartData} />
            </CardContent>
          </Card>

          <Card className="col-span-12 lg:col-span-3 border-none shadow-md">
            <CardHeader className="pb-2 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Order Status</CardTitle>
                  <CardDescription>
                    Distribution of order statuses
                  </CardDescription>
                </div>
                <div className="flex items-center text-primary">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-xs">Updated now</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <span className="text-sm font-medium">Pending</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">{pendingOrders}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        (
                        {totalOrders > 0
                          ? Math.round((pendingOrders / totalOrders) * 100)
                          : 0}
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{
                        width: `${
                          totalOrders > 0
                            ? (pendingOrders / totalOrders) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">{completedOrders}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        (
                        {totalOrders > 0
                          ? Math.round((completedOrders / totalOrders) * 100)
                          : 0}
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${
                          totalOrders > 0
                            ? (completedOrders / totalOrders) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-sm font-medium">Canceled</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">{canceledOrders}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        (
                        {totalOrders > 0
                          ? Math.round((canceledOrders / totalOrders) * 100)
                          : 0}
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{
                        width: `${
                          totalOrders > 0
                            ? (canceledOrders / totalOrders) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-4">
              <p className="text-xs text-muted-foreground">
                Total Orders: {totalOrders}
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Overview of your 10 most recent orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order, idx) => {
                  const total = order.orderItems.reduce(
                    (sum, item) => sum + Number(item.price) * item.quantity,
                    0
                  );
                  const reversedId = recentOrders.length - idx;

                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        #{reversedId}
                      </TableCell>
                      <TableCell>
                        {order.address?.user?.name || "N/A"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>{formatter.format(total)}</TableCell>
                      <TableCell>
                        {format(new Date(order.createdAt), "MMM d, yyyy")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
