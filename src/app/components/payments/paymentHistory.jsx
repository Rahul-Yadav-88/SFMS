"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Download, Search, MoreVertical, FileText, CreditCard, Calendar, User, BadgeCheck } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const paymentsData = [
  {
    id: 1,
    transactionId: "TXN12345",
    studentName: "Alice Johnson",
    class: "Form 4A",
    amount: 1200,
    paymentDate: "2024-07-15",
    paymentMode: "Credit Card",
    status: "Verified",
    verifiedBy: "Admin1",
  },
  {
    id: 2,
    transactionId: "TXN67890",
    studentName: "Bob Williams",
    class: "Form 3B",
    amount: 950,
    paymentDate: "2024-07-10",
    paymentMode: "Online Transfer",
    status: "Pending",
    verifiedBy: null,
  },
  {
    id: 3,
    transactionId: "TXN24680",
    studentName: "Charlie Brown",
    class: "Form 2C",
    amount: 800,
    paymentDate: "2024-07-05",
    paymentMode: "Cash",
    status: "Rejected",
    verifiedBy: "Admin2",
  },
  {
    id: 4,
    transactionId: "TXN13579",
    studentName: "Diana Miller",
    class: "Form 1D",
    amount: 1100,
    paymentDate: "2024-07-01",
    paymentMode: "Cheque",
    status: "Verified",
    verifiedBy: "Admin3",
  },
  {
    id: 5,
    transactionId: "TXN98765",
    studentName: "Eve Davis",
    class: "Form 5E",
    amount: 1500,
    paymentDate: "2024-06-25",
    paymentMode: "Credit Card",
    status: "Pending",
    verifiedBy: null,
  },
  {
    id: 6,
    transactionId: "TXN54321",
    studentName: "Frank White",
    class: "Form 6F",
    amount: 1300,
    paymentDate: "2024-06-20",
    paymentMode: "Online Transfer",
    status: "Verified",
    verifiedBy: "Admin1",
  },
  {
    id: 7,
    transactionId: "TXN11223",
    studentName: "Grace Taylor",
    class: "Form 3A",
    amount: 1000,
    paymentDate: "2024-06-15",
    paymentMode: "Cash",
    status: "Rejected",
    verifiedBy: "Admin2",
  },
  {
    id: 8,
    transactionId: "TXN33445",
    studentName: "Henry Moore",
    class: "Form 4B",
    amount: 1150,
    paymentDate: "2024-06-10",
    paymentMode: "Cheque",
    status: "Verified",
    verifiedBy: "Admin3",
  },
  {
    id: 9,
    transactionId: "TXN55667",
    studentName: "Ivy Green",
    class: "Form 2D",
    amount: 900,
    paymentDate: "2024-06-05",
    paymentMode: "Credit Card",
    status: "Pending",
    verifiedBy: null,
  },
  {
    id: 10,
    transactionId: "TXN77889",
    studentName: "Jack Black",
    class: "Form 1E",
    amount: 1400,
    paymentDate: "2024-06-01",
    paymentMode: "Online Transfer",
    status: "Verified",
    verifiedBy: "Admin1",
  },
]

const PaymentHistory = () => {
  const [search, setSearch] = useState("")
  const [payments, setPayments] = useState(paymentsData)
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const filteredPayments = payments.filter(
    (payment) =>
      payment.studentName.toLowerCase().includes(search.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(search.toLowerCase()),
  )

  const handleDownloadReceipt = (payment) => {
    setSelectedPayment(payment)
    setReceiptDialogOpen(true)
  }

  const handleVerifyPayment = (paymentId) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status: "Verified", verifiedBy: "Current User" } : payment,
      ),
    )
  }

  const exportPayments = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Transaction ID,Student,Amount,Date,Status\n" +
      filteredPayments
        .map((p) => `${p.transactionId},${p.studentName},${p.amount},${p.paymentDate},${p.status}`)
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "payment_history.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusBadge = (status) => {
    const baseClasses = "text-xs font-medium"
    switch (status) {
      case "Verified":
        return <Badge className={`bg-green-100 text-green-800 border-green-200 ${baseClasses}`}>Verified</Badge>
      case "Pending":
        return <Badge className={`bg-yellow-100 text-yellow-800 border-yellow-200 ${baseClasses}`}>Pending</Badge>
      case "Rejected":
        return <Badge className={`bg-red-100 text-red-800 border-red-200 ${baseClasses}`}>Rejected</Badge>
      default:
        return <Badge className={`bg-gray-100 text-gray-800 border-gray-200 ${baseClasses}`}>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Payment History
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">View and manage all payment transactions</p>
        </div>
        <Button
          variant="outline"
          onClick={exportPayments}
          className="w-full sm:w-auto hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 bg-transparent text-sm"
        >
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Search Section */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search student or transaction ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 w-full border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
        />
      </div>

      {/* Payment History Content */}
      {isMobile ? (
        // Mobile Cards View
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <Card key={payment.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{payment.studentName}</h3>
                    <p className="text-xs text-gray-500">TXN: {payment.transactionId}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownloadReceipt(payment)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Receipt
                      </DropdownMenuItem>
                      {payment.status === "Pending" && (
                        <DropdownMenuItem onClick={() => handleVerifyPayment(payment.id)}>
                          <BadgeCheck className="h-4 w-4 mr-2" />
                          Verify Payment
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-3 w-3 text-gray-400" />
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-bold text-green-600">₹{payment.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-medium">{payment.paymentDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-3 w-3 text-gray-400" />
                    <div>
                      <p className="text-gray-500">Mode</p>
                      <p className="font-medium">{payment.paymentMode}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3 text-gray-400" />
                    <div>
                      <p className="text-gray-500">Class</p>
                      <p className="font-medium">{payment.class}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>{getStatusBadge(payment.status)}</div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadReceipt(payment)}
                      className="hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 text-xs"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                    {payment.status === "Pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerifyPayment(payment.id)}
                        className="bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-300 text-green-700 transition-all duration-300 hover:scale-105 text-xs"
                      >
                        Verify
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Desktop Table View
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span>Payment History ({filteredPayments.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <TableHead className="font-semibold">Transaction ID</TableHead>
                    <TableHead className="font-semibold">Student</TableHead>
                    <TableHead className="font-semibold">Class</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Payment Mode</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow
                      key={payment.id}
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                    >
                      <TableCell className="font-medium text-blue-600">{payment.transactionId}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {payment.studentName.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="font-medium">{payment.studentName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{payment.class}</TableCell>
                      <TableCell className="font-bold text-green-600">₹{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.paymentDate}</TableCell>
                      <TableCell>{payment.paymentMode}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadReceipt(payment)}
                            className="hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          {payment.status === "Pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVerifyPayment(payment.id)}
                              className="bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-300 text-green-700 transition-all duration-300 hover:scale-105 text-xs"
                            >
                              Verify
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Receipt Dialog */}
      <Dialog open={receiptDialogOpen} onOpenChange={setReceiptDialogOpen}>
  <DialogContent className="
    w-[95vw] max-w-md max-h-[90vh] overflow-y-auto 
    bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl
    sm:rounded-lg
  ">
    <DialogHeader className="pb-4 sm:pb-6">
      <DialogTitle className="text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center sm:text-left">
        Payment Receipt
      </DialogTitle>
    </DialogHeader>
    
    {selectedPayment && (
      <div className="space-y-4 sm:space-y-6 py-4">
        <div className="text-center p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
            {selectedPayment.studentName.split(" ").map((n) => n[0]).join("")}
          </div>
          <h3 className="font-bold text-lg sm:text-xl">{selectedPayment.studentName}</h3>
          <p className="text-sm text-gray-600">Transaction: {selectedPayment.transactionId}</p>
          <p className="text-sm text-gray-600">Class: {selectedPayment.class}</p>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
            <span className="text-sm sm:text-base font-medium">Amount:</span>
            <span className="font-semibold text-green-600 text-lg sm:text-xl">₹{selectedPayment.amount.toLocaleString()}</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Mode:</span>
              <span className="font-semibold">{selectedPayment.paymentMode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold">{selectedPayment.paymentDate}</span>
            </div>
          </div>
          
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-gray-600">Status:</span>
            <span
              className={`font-semibold ${
                selectedPayment.status === "Verified" 
                  ? "text-green-600" 
                  : selectedPayment.status === "Pending" 
                    ? "text-yellow-600" 
                    : "text-red-600"
              }`}
            >
              {selectedPayment.status}
            </span>
          </div>
          
          {selectedPayment.verifiedBy && (
            <div className="flex justify-between text-sm sm:text-base border-t pt-3">
              <span className="text-gray-600">Verified By:</span>
              <span className="font-semibold">{selectedPayment.verifiedBy}</span>
            </div>
          )}
        </div>
      </div>
    )}
    
    <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 border-t">
      <Button 
        type="button"
        variant="outline" 
        onClick={() => setReceiptDialogOpen(false)}
        className="w-full sm:w-auto order-2 sm:order-1"
      >
        Close
      </Button>
      <Button
        onClick={() => {
          // Simulate PDF download
          console.log(`Downloading receipt for ${selectedPayment?.transactionId}`)
          setReceiptDialogOpen(false)
        }}
        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 order-1 sm:order-2"
      >
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default PaymentHistory