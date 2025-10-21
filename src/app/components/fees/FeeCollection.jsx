"use client"

import { useState, useEffect, useMemo } from "react"
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
import { Search, CreditCard, Download, Upload, Sparkles, Users, TrendingUp, FileText, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function FeeCollection() {
  const [mounted, setMounted] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    setMounted(true)
    // Trigger animations after mount
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 100)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  
  // Fee Dialog State
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMode, setPaymentMode] = useState("cash")
  const [transactionId, setTransactionId] = useState("")
  const [remarks, setRemarks] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [students, setStudents] = useState([
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
  ])

  const filteredStudents = useMemo(() => 
    students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()),
    ), [students, searchTerm]
  )

  const getStatusBadge = (status) => {
    if (status === "Paid") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors text-xs">Paid</Badge>
    } else if (status === "Partial") {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors text-xs">Partial</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 transition-colors text-xs">Due</Badge>
    }
  }

  const handleCollectFee = (student) => {
    setSelectedStudent(student)
    setPaymentAmount(student.dueAmount.toString())
    setPaymentMode("cash")
    setTransactionId("")
    setRemarks("")
    setIsDialogOpen(true)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    
    const payment = Number(paymentAmount)
    if (!selectedStudent || payment <= 0 || payment > selectedStudent.dueAmount) {
        console.error("Invalid payment attempt.")
        return
    }

    const updatedStudents = students.map(student => {
      if (student.id === selectedStudent.id) {
        const newPaidAmount = student.paidAmount + payment
        const newDueAmount = student.totalFees - newPaidAmount
        const newStatus = newDueAmount === 0 ? "Paid" : newPaidAmount > 0 ? "Partial" : "Due"
        
        return {
          ...student,
          paidAmount: newPaidAmount,
          dueAmount: newDueAmount,
          status: newStatus,
          lastPayment: new Date().toISOString().split('T')[0]
        }
      }
      return student
    })

    setStudents(updatedStudents)
    
    console.log({
      studentId: selectedStudent.id,
      paymentAmount: payment,
      paymentMode,
      transactionId,
      remarks,
      timestamp: new Date().toISOString()
    })

    setIsDialogOpen(false)
    setSelectedStudent(null)
    setPaymentAmount("")
    setPaymentMode("cash")
    setTransactionId("")
    setRemarks("")
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      console.log('File selected:', file.name)
    }
  }

  // Generate PDF Receipt
  const generateReceipt = (student) => {
    const receiptWindow = window.open('', '_blank')
    const currentDate = new Date().toLocaleDateString('en-IN')
    const receiptNumber = `REC${Date.now()}`
    
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Fee Receipt - ${student.name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .receipt-container { max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden; }
          .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; text-align: center; }
          .school-name { font-size: 28px; font-weight: bold; margin-bottom: 5px; }
          .receipt-title { font-size: 20px; opacity: 0.9; }
          .content { padding: 30px; }
          .student-info { background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #3b82f6; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
          .info-item { margin-bottom: 10px; }
          .info-label { font-weight: bold; color: #64748b; font-size: 14px; }
          .info-value { color: #1e293b; font-size: 16px; }
          .amount-section { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 25px; border-radius: 10px; text-align: center; margin: 25px 0; }
          .total-amount { font-size: 32px; font-weight: bold; margin: 10px 0; }
          .breakdown { background: #f1f5f9; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
          .breakdown-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
          .breakdown-item:last-child { border-bottom: none; font-weight: bold; color: #3b82f6; }
          .footer { text-align: center; padding: 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; }
          .signature { margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 20px; text-align: right; }
          .watermark { opacity: 0.1; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 80px; font-weight: bold; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="header">
            <div class="school-name">EDU MANAGEMENT SYSTEM</div>
            <div class="receipt-title">FEE PAYMENT RECEIPT</div>
          </div>
          
          <div class="content">
            <div class="student-info">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <div>
                  <div class="info-label">Receipt Number</div>
                  <div class="info-value" style="color: #3b82f6; font-weight: bold;">${receiptNumber}</div>
                </div>
                <div style="text-align: right;">
                  <div class="info-label">Date</div>
                  <div class="info-value">${currentDate}</div>
                </div>
              </div>
              
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Student Name</div>
                  <div class="info-value">${student.name}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Roll Number</div>
                  <div class="info-value">${student.rollNo}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Class</div>
                  <div class="info-value">${student.class}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Academic Year</div>
                  <div class="info-value">2024-2025</div>
                </div>
              </div>
            </div>

            <div class="amount-section">
              <div style="font-size: 16px; opacity: 0.9;">Total Amount Paid</div>
              <div class="total-amount">₹${student.paidAmount.toLocaleString()}</div>
              <div style="font-size: 14px; opacity: 0.9;">${student.status === 'Paid' ? 'Full Payment Received' : 'Partial Payment Received'}</div>
            </div>

            <div class="breakdown">
              <div style="font-weight: bold; margin-bottom: 15px; color: #1e293b; font-size: 16px;">Fee Breakdown</div>
              <div class="breakdown-item">
                <span>Total Course Fees:</span>
                <span>₹${student.totalFees.toLocaleString()}</span>
              </div>
              <div class="breakdown-item">
                <span>Amount Paid:</span>
                <span style="color: #3b82f6;">₹${student.paidAmount.toLocaleString()}</span>
              </div>
              <div class="breakdown-item">
                <span>Due Amount:</span>
                <span style="color: ${student.dueAmount > 0 ? '#ef4444' : '#3b82f6'};">₹${student.dueAmount.toLocaleString()}</span>
              </div>
            </div>

            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
              <div style="font-weight: bold; color: #1e40af; margin-bottom: 5px;">Payment Status</div>
              <div style="color: #3b82f6; font-size: 18px; font-weight: bold;">${student.status}</div>
              ${student.lastPayment ? `<div style="color: #64748b; font-size: 12px; margin-top: 5px;">Last Payment: ${student.lastPayment}</div>` : ''}
            </div>

            <div class="signature">
              <div style="margin-bottom: 40px;">
                <div style="border-top: 1px solid #cbd5e1; width: 200px; margin-left: auto;"></div>
                <div style="text-align: right; color: #64748b; font-size: 14px; margin-top: 5px;">Authorized Signature</div>
              </div>
            </div>
          </div>

          <div class="footer">
            <div>Edu Management System • 123 Education Street, Knowledge City • Phone: +91-9876543210</div>
            <div style="margin-top: 5px;">Email: info@edumanagement.edu • Website: www.edumanagement.edu</div>
            <div style="margin-top: 10px; font-size: 10px;">This is a computer generated receipt. No signature required.</div>
          </div>
        </div>

        <div class="watermark">PAID</div>
      </body>
      </html>
    `

    receiptWindow.document.write(pdfContent)
    receiptWindow.document.close()
    
    setTimeout(() => {
      receiptWindow.print()
    }, 500)
  }

  // Fee Dialog Component
  const FeeDialog = () => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Collect Fee Payment
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Record fee payment for <strong>{selectedStudent?.name}</strong> (Roll No: <strong>{selectedStudent?.rollNo}</strong>)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handlePaymentSubmit} className="space-y-4 sm:space-y-6">
          {/* Student Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Student Name</Label>
              <Input value={selectedStudent?.name} disabled className="bg-gray-50 text-sm sm:text-base" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Due Amount</Label>
              <Input
                value={`₹${selectedStudent?.dueAmount.toLocaleString()}`}
                disabled
                className="bg-red-50 text-red-600 font-bold text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Payment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentAmount" className="text-sm sm:text-base">Payment Amount (₹)</Label>
              <Input
                id="paymentAmount"
                type="number"
                placeholder="Enter amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                max={selectedStudent?.dueAmount}
                className="border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base"
                required
              />
              {selectedStudent?.dueAmount > 0 && (
                <p className="text-xs text-gray-500">
                  Maximum: ₹{selectedStudent?.dueAmount.toLocaleString()}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMode" className="text-sm sm:text-base">Payment Mode</Label>
              <Select value={paymentMode} onValueChange={setPaymentMode} required>
                <SelectTrigger className="border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base">
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

          {/* Transaction Details */}
          <div className="space-y-2">
            <Label htmlFor="transactionId" className="text-sm sm:text-base">
              Transaction ID / Reference {paymentMode !== 'cash' && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id="transactionId"
              placeholder="Enter transaction ID or reference number"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base"
              required={paymentMode !== 'cash'}
            />
            {paymentMode !== 'cash' && (
              <p className="text-xs text-red-500">Required for digital payments</p>
            )}
          </div>

          {/* Payment Proof */}
          <div className="space-y-2">
            <Label htmlFor="paymentProof" className="text-sm sm:text-base">Payment Proof (Optional)</Label>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                id="paymentProof"
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileUpload}
                className="border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="hover:bg-green-50 hover:border-green-300 transition-all duration-300 hover:scale-105 bg-transparent text-xs sm:text-sm"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remarks" className="text-sm sm:text-base">Remarks</Label>
            <Textarea
              id="remarks"
              placeholder="Add any additional notes..."
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base"
            />
          </div>

          {/* Action Buttons */}
          <DialogFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="w-full sm:w-auto order-2 sm:order-1 text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedStudent || Number(paymentAmount) <= 0}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base order-1 sm:order-2"
            >
              Record Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )

  if (!mounted) {
    return (
      <div className="space-y-6 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Fee Collection
              </h2>
              <p className="text-gray-600 flex items-center space-x-1">
                <Sparkles className="h-4 w-4 text-green-500" />
                <span>Manage your school's fee collection</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 p-4 transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      
      {/* Fee Dialog */}
      <FeeDialog /> 
      
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center space-x-3 transform transition-all duration-500 hover:scale-105">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg">
            <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Fee Collection
            </h2>
            <p className="text-gray-600 flex items-center space-x-1 text-sm sm:text-base">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
              <span>Manage your school's fee collection</span>
            </p>
          </div>
        </div>
        <div className={`flex space-x-2 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64 border-2 focus:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      {/* Students with Dues */}
      <Card className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${
        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm sm:text-base">Students with Outstanding Fees</span>
          </CardTitle>
          <CardDescription>Collect fees and mark payments</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {isMobile ? (
              // Mobile Cards View
              <div className="space-y-4 p-4">
                {filteredStudents.map((student, index) => (
                  <Card key={student.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {student.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{student.name}</p>
                            <p className="text-xs text-gray-500">Roll No: {student.rollNo}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {student.dueAmount > 0 && (
                              <DropdownMenuItem onClick={() => handleCollectFee(student)}>
                                <CreditCard className="h-4 w-4 mr-2" />
                                Collect Fee
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => generateReceipt(student)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download Receipt
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                        <div>
                          <p className="text-gray-500">Class</p>
                          <p className="font-medium">{student.class}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Status</p>
                          <div className="mt-1">{getStatusBadge(student.status)}</div>
                        </div>
                        <div>
                          <p className="text-gray-500">Total Fees</p>
                          <p className="font-bold">₹{student.totalFees.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Paid Amount</p>
                          <p className="font-bold text-green-600">₹{student.paidAmount.toLocaleString()}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-500">Due Amount</p>
                          <p className="font-bold text-red-600 text-sm">₹{student.dueAmount.toLocaleString()}</p>
                        </div>
                      </div>

                      {student.dueAmount > 0 && (
                        <Button
                          size="sm"
                          onClick={() => handleCollectFee(student)}
                          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 text-xs"
                        >
                          <CreditCard className="mr-2 h-3 w-3" />
                          Collect Fee
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // Desktop Table View
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <TableHead className="font-semibold text-xs sm:text-sm">Roll No.</TableHead>
                    <TableHead className="font-semibold text-xs sm:text-sm">Name</TableHead>
                    <TableHead className="font-semibold text-xs sm:text-sm">Class</TableHead>
                    <TableHead className="font-semibold text-xs sm:text-sm">Total Fees</TableHead>
                    <TableHead className="font-semibold text-xs sm:text-sm">Paid Amount</TableHead>
                    <TableHead className="font-semibold text-xs sm:text-sm">Due Amount</TableHead>
                    <TableHead className="font-semibold text-xs sm:text-sm">Status</TableHead>
                    <TableHead className="font-semibold text-xs sm:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => (
                    <TableRow
                      key={student.id}
                      className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300"
                    >
                      <TableCell className="font-medium text-blue-600 text-xs sm:text-sm">{student.rollNo}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {student.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="font-medium text-xs sm:text-sm">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm">{student.class}</TableCell>
                      <TableCell className="font-bold text-xs sm:text-sm">₹{student.totalFees.toLocaleString()}</TableCell>
                      <TableCell className="font-bold text-green-600 text-xs sm:text-sm">₹{student.paidAmount.toLocaleString()}</TableCell>
                      <TableCell className="font-medium text-red-600 text-xs sm:text-sm">₹{student.dueAmount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {student.dueAmount > 0 && (
                            <Button
                              size="sm"
                              onClick={() => handleCollectFee(student)}
                              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 text-xs"
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Collect Fee
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => generateReceipt(student)}
                            className="text-xs hover:bg-gray-100 transition-all duration-300"
                          >
                             <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 transform translate-x-4 -translate-y-4 sm:translate-x-8 sm:-translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Today's Collections</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-lg sm:text-3xl font-bold text-green-600 mb-1">₹45,000</div>
            <p className="text-xs text-gray-600">12 payments received</p>
          </CardContent>
        </Card>

        <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 transform translate-x-4 -translate-y-4 sm:translate-x-8 sm:-translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Pending Collections</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-lg sm:text-3xl font-bold text-red-600 mb-1">₹2,34,000</div>
            <p className="text-xs text-gray-600">From 156 students</p>
          </CardContent>
        </Card>

        <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 transform translate-x-4 -translate-y-4 sm:translate-x-8 sm:-translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Collection Rate</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-lg sm:text-3xl font-bold text-blue-600 mb-1">84.2%</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}