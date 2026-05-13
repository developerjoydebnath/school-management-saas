"use client";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { Progress } from "@/shared/components/ui/progress";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/components/ui/table";
import { AlertCircle, AlertTriangle, CheckCircle2, CreditCard, DollarSign, Download, Gift, Receipt, TrendingUp } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from "recharts";

// --- Demo Data ---
const feeSummary = {
	totalFee: 24000,
	totalPaid: 18500,
	totalDue: 5500,
	totalDiscount: 2000,
	totalFine: 350,
	nextPaymentDate: "Jun 10, 2026",
	nextPaymentAmount: 3000,
	paidPercent: 77,
};

const monthlyPayments = [
	{ month: "Jul", paid: 3000, due: 0 },
	{ month: "Aug", paid: 3000, due: 0 },
	{ month: "Sep", paid: 3000, due: 0 },
	{ month: "Oct", paid: 2500, due: 500 },
	{ month: "Nov", paid: 3000, due: 0 },
	{ month: "Dec", paid: 1000, due: 2000 },
	{ month: "Jan", paid: 3000, due: 0 },
	{ month: "Feb", paid: 0, due: 3000 },
];

const feeBreakdown = [
	{ name: "Tuition Fee", value: 15000, fill: "hsl(200, 80%, 50%)" },
	{ name: "Exam Fee", value: 3000, fill: "hsl(142, 76%, 36%)" },
	{ name: "Lab Fee", value: 2000, fill: "hsl(262, 83%, 58%)" },
	{ name: "Library Fee", value: 1500, fill: "hsl(45, 93%, 47%)" },
	{ name: "Sports Fee", value: 1000, fill: "hsl(24, 95%, 53%)" },
	{ name: "Transport Fee", value: 1500, fill: "hsl(340, 82%, 52%)" },
];

const paymentHistory = [
	{ id: "TXN-001", date: "Jul 10, 2025", head: "Tuition Fee (Jul)", amount: 3000, method: "bKash", status: "Paid", receipt: "REC-001" },
	{ id: "TXN-002", date: "Aug 05, 2025", head: "Tuition Fee (Aug)", amount: 3000, method: "Cash", status: "Paid", receipt: "REC-002" },
	{ id: "TXN-003", date: "Sep 12, 2025", head: "Tuition Fee (Sep)", amount: 3000, method: "Bank Transfer", status: "Paid", receipt: "REC-003" },
	{ id: "TXN-004", date: "Oct 08, 2025", head: "Tuition + Exam", amount: 2500, method: "Nagad", status: "Partial", receipt: "REC-004" },
	{ id: "TXN-005", date: "Nov 10, 2025", head: "Tuition Fee (Nov)", amount: 3000, method: "bKash", status: "Paid", receipt: "REC-005" },
	{ id: "TXN-006", date: "Dec 03, 2025", head: "Lab + Library", amount: 1000, method: "Cash", status: "Partial", receipt: "REC-006" },
	{ id: "TXN-007", date: "Jan 15, 2026", head: "Tuition Fee (Jan)", amount: 3000, method: "Bank Transfer", status: "Paid", receipt: "REC-007" },
];

const dueInvoices = [
	{ invoice: "INV-012", head: "Tuition Fee (Feb)", amount: 3000, dueDate: "Feb 28, 2026", daysOverdue: 74, fine: 200 },
	{ invoice: "INV-010", head: "Exam Fee (Dec)", amount: 2000, dueDate: "Dec 31, 2025", daysOverdue: 135, fine: 100 },
	{ invoice: "INV-008", head: "Transport Fee (Oct)", amount: 500, dueDate: "Oct 31, 2025", daysOverdue: 196, fine: 50 },
];

const cumulativePayments = [
	{ month: "Jul", cumulative: 3000, target: 3000 },
	{ month: "Aug", cumulative: 6000, target: 6000 },
	{ month: "Sep", cumulative: 9000, target: 9000 },
	{ month: "Oct", cumulative: 11500, target: 12000 },
	{ month: "Nov", cumulative: 14500, target: 15000 },
	{ month: "Dec", cumulative: 15500, target: 18000 },
	{ month: "Jan", cumulative: 18500, target: 21000 },
	{ month: "Feb", cumulative: 18500, target: 24000 },
];

const scholarshipInfo = {
	name: "Merit Scholarship 2025",
	type: "Merit-based",
	amount: 2000,
	status: "Active",
	validUntil: "Dec 2026",
	criteria: "Maintain GPA > 3.50",
};

const barConfig = {
	paid: { label: "Paid", color: "hsl(142, 76%, 36%)" },
	due: { label: "Due", color: "hsl(0, 84%, 60%)" },
} satisfies ChartConfig;

const pieConfig = {
	"Tuition Fee": { label: "Tuition", color: "hsl(200, 80%, 50%)" },
	"Exam Fee": { label: "Exam", color: "hsl(142, 76%, 36%)" },
	"Lab Fee": { label: "Lab", color: "hsl(262, 83%, 58%)" },
	"Library Fee": { label: "Library", color: "hsl(45, 93%, 47%)" },
	"Sports Fee": { label: "Sports", color: "hsl(24, 95%, 53%)" },
	"Transport Fee": { label: "Transport", color: "hsl(340, 82%, 52%)" },
} satisfies ChartConfig;

const lineConfig = {
	cumulative: { label: "Actual Paid", color: "hsl(142, 76%, 36%)" },
	target: { label: "Expected", color: "hsl(0, 0%, 70%)" },
} satisfies ChartConfig;

export default function FeesTab() {
	return (
		<div className="space-y-6">
			{/* Summary Cards */}
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
				<Card className="border-none bg-blue-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-blue-500/10 p-2 text-blue-600">
							<DollarSign className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Total Fee</p>
							<p className="text-lg font-bold text-blue-700">৳{feeSummary.totalFee.toLocaleString()}</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-green-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-green-500/10 p-2 text-green-600">
							<CheckCircle2 className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Paid</p>
							<p className="text-lg font-bold text-green-700">৳{feeSummary.totalPaid.toLocaleString()}</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-red-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-red-500/10 p-2 text-red-600">
							<AlertCircle className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Due</p>
							<p className="text-lg font-bold text-red-700">৳{feeSummary.totalDue.toLocaleString()}</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-purple-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-purple-500/10 p-2 text-purple-600">
							<Gift className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Discount</p>
							<p className="text-lg font-bold text-purple-700">৳{feeSummary.totalDiscount.toLocaleString()}</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-yellow-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-yellow-500/10 p-2 text-yellow-600">
							<AlertTriangle className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Fine</p>
							<p className="text-lg font-bold text-yellow-700">৳{feeSummary.totalFine}</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-orange-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-orange-500/10 p-2 text-orange-600">
							<CreditCard className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Next Due</p>
							<p className="text-lg font-bold text-orange-700">৳{feeSummary.nextPaymentAmount.toLocaleString()}</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Payment Progress + Next Payment */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<Card className="border-none shadow-sm">
					<CardContent className="p-4">
						<div className="flex items-center justify-between text-sm">
							<span className="font-medium">Payment Progress</span>
							<span className="font-mono font-semibold text-primary">{feeSummary.paidPercent}%</span>
						</div>
						<Progress value={feeSummary.paidPercent} className="mt-2 h-3" />
						<div className="mt-2 flex justify-between text-xs text-muted-foreground">
							<span>৳{feeSummary.totalPaid.toLocaleString()} paid</span>
							<span>৳{feeSummary.totalDue.toLocaleString()} remaining</span>
						</div>
					</CardContent>
				</Card>
				{/* Scholarship */}
				<Card className="border-none bg-gradient-to-r from-green-500/5 to-blue-500/5 shadow-sm">
					<CardContent className="p-4">
						<div className="flex items-center gap-2">
							<Gift className="h-4 w-4 text-green-600" />
							<span className="text-sm font-semibold">{scholarshipInfo.name}</span>
							<Badge variant="default" className="text-[10px]">{scholarshipInfo.status}</Badge>
						</div>
						<div className="mt-2 grid grid-cols-2 gap-2 text-xs">
							<div>
								<span className="text-muted-foreground">Amount: </span>
								<span className="font-semibold">৳{scholarshipInfo.amount.toLocaleString()}</span>
							</div>
							<div>
								<span className="text-muted-foreground">Valid: </span>
								<span className="font-semibold">{scholarshipInfo.validUntil}</span>
							</div>
							<div className="col-span-2">
								<span className="text-muted-foreground">Criteria: </span>
								<span className="font-semibold">{scholarshipInfo.criteria}</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts Row */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* Monthly Payments Bar */}
				<Card className="border-none shadow-sm lg:col-span-2">
					<CardHeader className="border-b pb-3">
						<CardTitle className="text-base font-semibold">Monthly Payment vs Due</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<ChartContainer config={barConfig} className="h-[260px] w-full">
							<BarChart data={monthlyPayments} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
								<YAxis fontSize={12} tickLine={false} axisLine={false} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar dataKey="paid" fill="var(--color-paid)" radius={[4, 4, 0, 0]} />
								<Bar dataKey="due" fill="var(--color-due)" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>

				{/* Pie */}
				<Card className="border-none shadow-sm">
					<CardHeader className="border-b pb-3">
						<CardTitle className="text-base font-semibold">Fee Structure</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<ChartContainer config={pieConfig} className="mx-auto h-[180px] w-full max-w-[220px]">
							<PieChart>
								<ChartTooltip content={<ChartTooltipContent hideLabel />} />
								<Pie data={feeBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
									{feeBreakdown.map((e, i) => (
										<Cell key={i} fill={e.fill} />
									))}
								</Pie>
							</PieChart>
						</ChartContainer>
						<div className="mt-3 grid grid-cols-2 gap-1.5">
							{feeBreakdown.map((f) => (
								<div key={f.name} className="flex items-center gap-1.5 text-xs">
									<div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: f.fill }} />
									<span className="truncate">{f.name}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Cumulative Payments vs Target */}
			<Card className="border-none shadow-sm">
				<CardHeader className="border-b pb-3">
					<div className="flex items-center gap-2">
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
						<CardTitle className="text-base font-semibold">Cumulative Payments vs Expected</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="pt-4">
					<ChartContainer config={lineConfig} className="h-[220px] w-full">
						<LineChart data={cumulativePayments} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} />
							<XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
							<YAxis fontSize={12} tickLine={false} axisLine={false} />
							<ChartTooltip content={<ChartTooltipContent />} />
							<Line type="monotone" dataKey="target" stroke="var(--color-target)" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
							<Line type="monotone" dataKey="cumulative" stroke="var(--color-cumulative)" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(142, 76%, 36%)" }} />
						</LineChart>
					</ChartContainer>
				</CardContent>
			</Card>

			{/* Outstanding Dues with Fine */}
			<Card className="border-none shadow-sm">
				<CardHeader className="border-b pb-3">
					<CardTitle className="flex items-center gap-2 text-base font-semibold text-red-600">
						<AlertCircle className="h-4 w-4" />
						Outstanding Dues
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="font-semibold">Invoice</TableHead>
								<TableHead className="font-semibold">Fee Head</TableHead>
								<TableHead className="text-right font-semibold">Amount</TableHead>
								<TableHead className="text-right font-semibold">Fine</TableHead>
								<TableHead className="font-semibold">Due Date</TableHead>
								<TableHead className="text-center font-semibold">Overdue</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{dueInvoices.map((inv) => (
								<TableRow key={inv.invoice}>
									<TableCell className="font-mono text-xs">{inv.invoice}</TableCell>
									<TableCell>{inv.head}</TableCell>
									<TableCell className="text-right font-mono font-semibold text-red-600">৳{inv.amount.toLocaleString()}</TableCell>
									<TableCell className="text-right font-mono text-yellow-600">৳{inv.fine}</TableCell>
									<TableCell className="text-muted-foreground">{inv.dueDate}</TableCell>
									<TableCell className="text-center">
										<Badge variant="destructive" className="text-xs">{inv.daysOverdue} days</Badge>
									</TableCell>
								</TableRow>
							))}
							<TableRow className="bg-muted/30 font-semibold">
								<TableCell colSpan={2} className="text-right">Total Outstanding</TableCell>
								<TableCell className="text-right font-mono text-red-600">
									৳{dueInvoices.reduce((a, b) => a + b.amount, 0).toLocaleString()}
								</TableCell>
								<TableCell className="text-right font-mono text-yellow-600">
									৳{dueInvoices.reduce((a, b) => a + b.fine, 0)}
								</TableCell>
								<TableCell colSpan={2} />
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Payment History */}
			<Card className="border-none shadow-sm">
				<CardHeader className="border-b pb-3">
					<CardTitle className="flex items-center gap-2 text-base font-semibold">
						<Receipt className="h-4 w-4 text-muted-foreground" />
						Payment History
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="font-semibold">Transaction</TableHead>
								<TableHead className="font-semibold">Date</TableHead>
								<TableHead className="font-semibold">Fee Head</TableHead>
								<TableHead className="text-right font-semibold">Amount</TableHead>
								<TableHead className="font-semibold">Method</TableHead>
								<TableHead className="text-center font-semibold">Status</TableHead>
								<TableHead className="text-center font-semibold">Receipt</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paymentHistory.map((tx) => (
								<TableRow key={tx.id}>
									<TableCell className="font-mono text-xs text-muted-foreground">{tx.id}</TableCell>
									<TableCell>{tx.date}</TableCell>
									<TableCell>{tx.head}</TableCell>
									<TableCell className="text-right font-mono font-semibold">৳{tx.amount.toLocaleString()}</TableCell>
									<TableCell><Badge variant="outline" className="text-xs">{tx.method}</Badge></TableCell>
									<TableCell className="text-center">
										<Badge variant={tx.status === "Paid" ? "default" : "secondary"} className="text-xs">{tx.status}</Badge>
									</TableCell>
									<TableCell className="text-center">
										<Button variant="ghost" size="icon-sm">
											<Download className="h-3.5 w-3.5" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
