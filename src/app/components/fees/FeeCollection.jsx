"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Search, CreditCard, Download, Upload, Sparkles } from "lucide-react"

export default function FeeCollection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState(null)

  const students = [
    {
      id: 1,
      rollNo: "2024001",
      name: "John Doe",
      class: "10-A",
      totalFees: 50000,
      paidAmount: 35000,
      dueAmount: 15000,
      lastPayment: "2024-01-15",
      status: "Partial",
    },
    {
      id: 2,
      rollNo: "2024002",
      name: "Jane Smith",
      class: "10-A",
      totalFees: 50000,
      paidAmount: 0,
      dueAmount: 50000,
      lastPayment: null,
      status: "Due",
    },
    {
      id: 3,
      rollNo: "2024003",
      name: "Mike Johnson",
      class: "9-B",
      totalFees: 45000,
      paidAmount: 45000,
      dueAmount: 0,
      lastPayment: "2024-01-20",
      status: "Paid",
    },
  ]

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status) => {
    if (status === "Paid") {
      return <Badge className="bg-green-100 text-green-800 animate-pulse">Paid</Badge>
    } else if (status === "Partial") {
      return <Badge className="bg-yellow-100 text-yellow-800 animate-pulse">Partial</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800 animate-pulse">Due</Badge>
    }
  }

  const handleCollectFee = (student) => {
    setSelectedStudent(student)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center animate-in slide-in-from-top duration-500">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Fee Collection
            </h2>
            <p className="text-gray-600 flex items-center space-x-1">
              <Sparkles className="h-4 w-4 text-green-500 animate-pulse" />
              <span>Manage your school's fee collection</span>
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="relative animate-in slide-in-from-right duration-500">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 border-2 focus:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Students with Dues */}
      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom duration-700">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
            <span>Students with Outstanding Fees</span>
          </CardTitle>
          <CardDescription>Collect fees and mark payments</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <TableHead className="font-semibold">Roll No.</TableHead>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Class</TableHead>
                  <TableHead className="font-semibold">Total Fees</TableHead>
                  <TableHead className="font-semibold">Paid Amount</TableHead>
                  <TableHead className="font-semibold">Due Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <TableRow
                    key={student.id}
                    className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300 animate-in slide-in-from-left duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TableCell className="font-medium text-blue-600">{student.rollNo}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell className="font-bold">₹{student.totalFees.toLocaleString()}</TableCell>
                    <TableCell className="font-bold text-green-600">₹{student.paidAmount.toLocaleString()}</TableCell>
                    <TableCell className="font-medium text-red-600">₹{student.dueAmount.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {student.dueAmount > 0 && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                onClick={() => handleCollectFee(student)}
                                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                              >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Collect Fee
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
                              <DialogHeader>
                                <DialogTitle className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                  Collect Fee Payment
                                </DialogTitle>
                                <DialogDescription>
                                  Record fee payment for {student.name} (Roll No: {student.rollNo})
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Student Name</Label>
                                    <Input value={student.name} disabled className="bg-gray-50" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Due Amount</Label>
                                    <Input
                                      value={`₹${student.dueAmount.toLocaleString()}`}
                                      disabled
                                      className="bg-red-50 text-red-600 font-bold"
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="paymentAmount">Payment Amount (₹)</Label>
                                    <Input
                                      id="paymentAmount"
                                      type="number"
                                      placeholder="Enter amount"
                                      max={student.dueAmount}
                                      className="border-2 focus:border-green-400 transition-all duration-300"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="paymentMode">Payment Mode</Label>
                                    <Select>
                                      <SelectTrigger className="border-2 focus:border-green-400 transition-all duration-300">
                                        <SelectValue placeholder="Select payment mode" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="upi">UPI</SelectItem>
                                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                                        <SelectItem value="cheque">Cheque</SelectItem>
                                        <SelectItem value="card">Card</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="transactionId">Transaction ID / Reference</Label>
                                  <Input
                                    id="transactionId"
                                    placeholder="Enter transaction ID or reference number"
                                    className="border-2 focus:border-green-400 transition-all duration-300"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="paymentProof">Payment Proof (Optional)</Label>
                                  <div className="flex items-center space-x-2">
                                    <Input
                                      id="paymentProof"
                                      type="file"
                                      accept="image/*,application/pdf"
                                      className="border-2 focus:border-green-400 transition-all duration-300"
                                    />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="hover:bg-green-50 hover:border-green-300 transition-all duration-300 hover:scale-105 bg-transparent"
                                    >
                                      <Upload className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="remarks">Remarks</Label>
                                  <Textarea
                                    id="remarks"
                                    placeholder="Add any additional notes..."
                                    rows={3}
                                    className="border-2 focus:border-green-400 transition-all duration-300"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button
                                  type="submit"
                                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                >
                                  Record Payment
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 bg-transparent"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Receipt
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group animate-in slide-in-from-left duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium text-gray-700">Today's Collections</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-green-600 mb-1">₹45,000</div>
            <p className="text-xs text-gray-600">12 payments received</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group animate-in slide-in-from-bottom duration-500 delay-100">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium text-gray-700">Pending Collections</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-red-600 mb-1">₹2,34,000</div>
            <p className="text-xs text-gray-600">From 156 students</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group animate-in slide-in-from-right duration-500 delay-200">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium text-gray-700">Collection Rate</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-blue-600 mb-1">84.2%</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
