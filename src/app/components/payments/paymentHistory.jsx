"use client"

import { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Download } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"

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

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Input
          type="search"
          placeholder="Search student or transaction ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
        <Button
          variant="outline"
          onClick={exportPayments}
          className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 bg-transparent"
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent payments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Transaction ID</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.transactionId}</TableCell>
              <TableCell>{payment.studentName}</TableCell>
              <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
              <TableCell>{payment.paymentDate}</TableCell>
              <TableCell>{payment.status}</TableCell>
              <TableCell className="text-right">
                <div className="space-x-2">
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
                      className="bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-300 text-green-700 transition-all duration-300 hover:scale-105"
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

      {/* Receipt Dialog */}
      <Dialog open={receiptDialogOpen} onOpenChange={setReceiptDialogOpen}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Payment Receipt
            </DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4 py-4">
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h3 className="font-bold text-lg">{selectedPayment.studentName}</h3>
                <p className="text-sm text-gray-600">Transaction: {selectedPayment.transactionId}</p>
                <p className="text-sm text-gray-600">Class: {selectedPayment.class}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-semibold text-green-600">₹{selectedPayment.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Mode:</span>
                  <span className="font-semibold">{selectedPayment.paymentMode}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-semibold">{selectedPayment.paymentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span
                    className={`font-semibold ${selectedPayment.status === "Verified" ? "text-green-600" : "text-yellow-600"}`}
                  >
                    {selectedPayment.status}
                  </span>
                </div>
                {selectedPayment.verifiedBy && (
                  <div className="flex justify-between border-t pt-2">
                    <span>Verified By:</span>
                    <span className="font-semibold">{selectedPayment.verifiedBy}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => setReceiptDialogOpen(false)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PaymentHistory
