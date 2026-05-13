"use client";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/components/ui/table";
import {
	Award,
	Download,
	Eye,
	FileCheck2,
	FileImage,
	FileSpreadsheet,
	FileText,
	FileWarning,
	Heart,
	IdCard,
	Shield,
	Upload,
} from "lucide-react";

// --- Demo Data ---
const admissionDocuments = [
	{ name: "Birth Certificate", type: "PDF", size: "1.2 MB", uploadDate: "May 10, 2026", status: "Verified", icon: FileText, expiry: "—" },
	{ name: "Transfer Certificate", type: "PDF", size: "890 KB", uploadDate: "May 10, 2026", status: "Verified", icon: FileCheck2, expiry: "—" },
	{ name: "Previous Marksheet", type: "PDF", size: "2.1 MB", uploadDate: "May 10, 2026", status: "Verified", icon: FileSpreadsheet, expiry: "—" },
	{ name: "Student Photo (Passport)", type: "JPEG", size: "340 KB", uploadDate: "May 10, 2026", status: "Verified", icon: FileImage, expiry: "Dec 2026" },
	{ name: "Father's NID", type: "PDF", size: "1.5 MB", uploadDate: "May 10, 2026", status: "Pending", icon: Shield, expiry: "—" },
	{ name: "Mother's NID", type: "PDF", size: "—", uploadDate: "—", status: "Missing", icon: Shield, expiry: "—" },
	{ name: "Guardianship Proof", type: "PDF", size: "—", uploadDate: "—", status: "Not Required", icon: Shield, expiry: "—" },
];

const academicDocuments = [
	{ name: "1st Term Report Card", type: "PDF", size: "450 KB", date: "Sep 15, 2025", status: "Available", gpa: "3.72" },
	{ name: "2nd Term Report Card", type: "PDF", size: "480 KB", date: "Dec 20, 2025", status: "Available", gpa: "3.78" },
	{ name: "Midterm Report Card", type: "PDF", size: "510 KB", date: "Feb 28, 2026", status: "Available", gpa: "3.80" },
	{ name: "Final Report Card", type: "PDF", size: "—", date: "—", status: "Pending", gpa: "—" },
	{ name: "Annual Progress Report", type: "PDF", size: "—", date: "—", status: "Pending", gpa: "—" },
];

const certificatesAwards = [
	{ name: "Math Olympiad – Gold Medal", date: "Mar 2026", category: "Competition", issuer: "National Math Society" },
	{ name: "Science Fair – 1st Prize", date: "Nov 2025", category: "Competition", issuer: "District Science Council" },
	{ name: "Best Student Award 2025", date: "Dec 2025", category: "Award", issuer: "NEXA School" },
	{ name: "Sports Day – 100m Sprint", date: "Jan 2026", category: "Sports", issuer: "School Athletics" },
	{ name: "Art Exhibition Certificate", date: "Feb 2026", category: "Cultural", issuer: "School Art Club" },
	{ name: "Perfect Attendance (Sep)", date: "Sep 2025", category: "Award", issuer: "NEXA School" },
];

const medicalRecords = [
	{ record: "Annual Health Checkup", date: "Jul 2025", doctor: "Dr. Rahman", note: "All vitals normal. Height: 152cm, Weight: 42kg", status: "Completed" },
	{ record: "Vaccination: COVID-19", date: "Aug 2025", doctor: "School Nurse", note: "Booster dose administered", status: "Completed" },
	{ record: "Eye Test Report", date: "Jan 2026", doctor: "Dr. Hasan", note: "Vision: 6/6 both eyes", status: "Completed" },
	{ record: "Dental Checkup", date: "Mar 2026", doctor: "Dr. Sonia", note: "Mild cavity — follow-up needed", status: "Follow-up" },
];

const idCardInfo = {
	cardNumber: "NEXA-2025-STU-0187",
	issueDate: "Jul 01, 2025",
	expiryDate: "Jun 30, 2026",
	status: "Active",
	bloodGroup: "B+",
};

const getStatusColor = (status: string) => {
	switch (status) {
		case "Verified": case "Available": case "Active": case "Completed":
			return "default";
		case "Pending": case "Follow-up":
			return "secondary";
		case "Missing":
			return "destructive";
		default:
			return "outline";
	}
};

const categoryColors: Record<string, string> = {
	Competition: "bg-blue-500/10 text-blue-700",
	Award: "bg-green-500/10 text-green-700",
	Sports: "bg-orange-500/10 text-orange-700",
	Cultural: "bg-purple-500/10 text-purple-700",
};

export default function DocumentsTab() {
	const totalDocs = admissionDocuments.length;
	const verified = admissionDocuments.filter((d) => d.status === "Verified").length;
	const pending = admissionDocuments.filter((d) => d.status === "Pending").length;
	const missing = admissionDocuments.filter((d) => d.status === "Missing").length;
	const completionPercent = Math.round(((verified) / (totalDocs - 1)) * 100); // exclude Not Required

	return (
		<div className="space-y-6">
			{/* Doc Stats + ID Card */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<Card className="border-none bg-blue-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-blue-500/10 p-2 text-blue-600">
							<FileText className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Total Documents</p>
							<p className="text-lg font-bold text-blue-700">{totalDocs}</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-green-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-green-500/10 p-2 text-green-600">
							<FileCheck2 className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Verified</p>
							<p className="text-lg font-bold text-green-700">{verified}</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-yellow-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-yellow-500/10 p-2 text-yellow-600">
							<FileWarning className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Pending</p>
							<p className="text-lg font-bold text-yellow-700">{pending}</p>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none bg-red-500/5 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="rounded-full bg-red-500/10 p-2 text-red-600">
							<FileWarning className="h-4 w-4" />
						</div>
						<div>
							<p className="text-[10px] text-muted-foreground">Missing</p>
							<p className="text-lg font-bold text-red-700">{missing}</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Document Completion + ID Card */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				{/* Completion Progress */}
				<Card className="border-none shadow-sm">
					<CardContent className="space-y-3 p-4">
						<div className="flex items-center justify-between text-sm">
							<span className="font-medium">Document Completion</span>
							<span className="font-mono font-semibold text-primary">{completionPercent}%</span>
						</div>
						<Progress value={completionPercent} className="h-3" />
						<p className="text-xs text-muted-foreground">
							{verified} of {totalDocs - 1} required documents verified
						</p>
					</CardContent>
				</Card>

				{/* ID Card Info */}
				<Card className="border-none bg-gradient-to-r from-primary/5 to-blue-500/5 shadow-sm">
					<CardContent className="p-4">
						<div className="flex items-center gap-2">
							<IdCard className="h-4 w-4 text-primary" />
							<span className="text-sm font-semibold">Student ID Card</span>
							<Badge variant="default" className="text-[10px]">{idCardInfo.status}</Badge>
						</div>
						<div className="mt-2 grid grid-cols-2 gap-2 text-xs">
							<div>
								<span className="text-muted-foreground">Card No: </span>
								<span className="font-mono font-semibold">{idCardInfo.cardNumber}</span>
							</div>
							<div>
								<span className="text-muted-foreground">Blood: </span>
								<span className="font-semibold">{idCardInfo.bloodGroup}</span>
							</div>
							<div>
								<span className="text-muted-foreground">Issued: </span>
								<span className="font-semibold">{idCardInfo.issueDate}</span>
							</div>
							<div>
								<span className="text-muted-foreground">Expires: </span>
								<span className="font-semibold">{idCardInfo.expiryDate}</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Admission Documents */}
			<Card className="border-none shadow-sm">
				<CardHeader className="border-b pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-base font-semibold">Admission Documents</CardTitle>
						<Button variant="outline" size="sm" className="gap-1.5 text-xs">
							<Upload className="h-3.5 w-3.5" />
							Upload
						</Button>
					</div>
				</CardHeader>
				<CardContent className="pt-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="font-semibold">Document</TableHead>
								<TableHead className="font-semibold">Type</TableHead>
								<TableHead className="font-semibold">Size</TableHead>
								<TableHead className="font-semibold">Upload Date</TableHead>
								<TableHead className="font-semibold">Expiry</TableHead>
								<TableHead className="text-center font-semibold">Status</TableHead>
								<TableHead className="text-center font-semibold">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{admissionDocuments.map((doc) => (
								<TableRow key={doc.name}>
									<TableCell>
										<div className="flex items-center gap-2">
											<doc.icon className="h-4 w-4 text-muted-foreground" />
											<span className="font-medium">{doc.name}</span>
										</div>
									</TableCell>
									<TableCell>
										<Badge variant="outline" className="font-mono text-xs">{doc.type}</Badge>
									</TableCell>
									<TableCell className="text-sm text-muted-foreground">{doc.size}</TableCell>
									<TableCell className="text-sm text-muted-foreground">{doc.uploadDate}</TableCell>
									<TableCell className="text-sm text-muted-foreground">{doc.expiry}</TableCell>
									<TableCell className="text-center">
										<Badge variant={getStatusColor(doc.status) as any} className="text-xs">
											{doc.status}
										</Badge>
									</TableCell>
									<TableCell className="text-center">
										{doc.status !== "Missing" && doc.status !== "Not Required" && (
											<div className="flex items-center justify-center gap-1">
												<Button variant="ghost" size="icon-sm"><Eye className="h-3.5 w-3.5" /></Button>
												<Button variant="ghost" size="icon-sm"><Download className="h-3.5 w-3.5" /></Button>
											</div>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Academic Documents */}
			<Card className="border-none shadow-sm">
				<CardHeader className="border-b pb-3">
					<CardTitle className="text-base font-semibold">Academic Reports & Results</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="font-semibold">Report</TableHead>
								<TableHead className="font-semibold">Type</TableHead>
								<TableHead className="font-semibold">Size</TableHead>
								<TableHead className="font-semibold">Date</TableHead>
								<TableHead className="text-center font-semibold">GPA</TableHead>
								<TableHead className="text-center font-semibold">Status</TableHead>
								<TableHead className="text-center font-semibold">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{academicDocuments.map((doc) => (
								<TableRow key={doc.name}>
									<TableCell>
										<div className="flex items-center gap-2">
											<FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
											<span className="font-medium">{doc.name}</span>
										</div>
									</TableCell>
									<TableCell><Badge variant="outline" className="font-mono text-xs">{doc.type}</Badge></TableCell>
									<TableCell className="text-sm text-muted-foreground">{doc.size}</TableCell>
									<TableCell className="text-sm text-muted-foreground">{doc.date}</TableCell>
									<TableCell className="text-center font-mono font-semibold">{doc.gpa}</TableCell>
									<TableCell className="text-center">
										<Badge variant={getStatusColor(doc.status) as any} className="text-xs">{doc.status}</Badge>
									</TableCell>
									<TableCell className="text-center">
										{doc.status === "Available" && (
											<div className="flex items-center justify-center gap-1">
												<Button variant="ghost" size="icon-sm"><Eye className="h-3.5 w-3.5" /></Button>
												<Button variant="ghost" size="icon-sm"><Download className="h-3.5 w-3.5" /></Button>
											</div>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Certificates & Awards */}
			<Card className="border-none shadow-sm">
				<CardHeader className="border-b pb-3">
					<CardTitle className="flex items-center gap-2 text-base font-semibold">
						<Award className="h-4 w-4 text-muted-foreground" />
						Certificates & Awards ({certificatesAwards.length})
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-4">
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{certificatesAwards.map((cert) => (
							<div key={cert.name} className="group flex items-start gap-3 rounded-xl border p-3 transition-all hover:bg-muted/50 hover:shadow-sm">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
									<Award className="h-5 w-5" />
								</div>
								<div className="min-w-0 flex-1">
									<p className="text-sm font-medium leading-tight">{cert.name}</p>
									<p className="mt-0.5 text-xs text-muted-foreground">{cert.issuer}</p>
									<div className="mt-1.5 flex items-center gap-2">
										<span className="text-[10px] text-muted-foreground">{cert.date}</span>
										<Badge variant="outline" className={`text-[10px] ${categoryColors[cert.category] || ""}`}>
											{cert.category}
										</Badge>
									</div>
								</div>
								<Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100">
									<Download className="h-3.5 w-3.5" />
								</Button>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Medical Records */}
			<Card className="border-none shadow-sm">
				<CardHeader className="border-b pb-3">
					<CardTitle className="flex items-center gap-2 text-base font-semibold">
						<Heart className="h-4 w-4 text-muted-foreground" />
						Medical / Health Records
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="font-semibold">Record</TableHead>
								<TableHead className="font-semibold">Date</TableHead>
								<TableHead className="font-semibold">Doctor / Staff</TableHead>
								<TableHead className="font-semibold">Notes</TableHead>
								<TableHead className="text-center font-semibold">Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{medicalRecords.map((rec, i) => (
								<TableRow key={i}>
									<TableCell className="font-medium">{rec.record}</TableCell>
									<TableCell className="text-muted-foreground">{rec.date}</TableCell>
									<TableCell>{rec.doctor}</TableCell>
									<TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">{rec.note}</TableCell>
									<TableCell className="text-center">
										<Badge variant={getStatusColor(rec.status) as any} className="text-xs">{rec.status}</Badge>
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
