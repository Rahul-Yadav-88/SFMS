"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { DollarSign, Download, AlertCircle, CheckCircle, Calendar, Sparkles, GraduationCap, MoreVertical } from "lucide-react"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function StudentDashboard() {
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

  const studentInfo = {
    name: "Jane Student",
    rollNo: "2024001",
    class: "10-A",
    section: "Science",
  }

  const feeStatus = {
    totalFees: 50000,
    paidAmount: 35000,
    dueAmount: 15000,
    nextDueDate: "2024-02-15",
  }

  const recentPayments = [
    { id: 1, description: "Tuition Fee - January", amount: 8000, date: "2024-01-15", status: "Paid" },
    { id: 2, description: "Transport Fee - January", amount: 2000, date: "2024-01-15", status: "Paid" },
    { id: 3, description: "Library Fee - January", amount: 500, date: "2024-01-10", status: "Paid" },
  ]

  const pendingDues = [
    { id: 1, description: "Tuition Fee - February", amount: 8000, dueDate: "2024-02-15" },
    { id: 2, description: "Transport Fee - February", amount: 2000, dueDate: "2024-02-15" },
    { id: 3, description: "Exam Fee - Annual", amount: 5000, dueDate: "2024-02-28" },
  ]

  const completionPercentage = Math.round((feeStatus.paidAmount / feeStatus.totalFees) * 100)

  if (!mounted) {
    return (
      <div className="space-y-8 p-4 sm:p-0">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Student Dashboard
            </h2>
            <p className="text-gray-600 flex items-center space-x-1">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span>
                {studentInfo.name} • Roll No: {studentInfo.rollNo} • Class: {studentInfo.class}
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 p-4 sm:p-0 transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Header */}
      <div className={`transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center space-x-3 mb-2 transform transition-all duration-500 hover:scale-105">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Student Dashboard
            </h2>
            <p className="text-gray-600 flex items-center space-x-1 text-sm sm:text-base">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
              <span>
                {studentInfo.name} • Roll No: {studentInfo.rollNo} • Class: {studentInfo.class}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Fee Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 transform translate-x-6 -translate-y-6 sm:translate-x-8 sm:-translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Total Fees</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-xl sm:text-3xl font-bold text-gray-800 mb-1">₹{feeStatus.totalFees.toLocaleString()}</div>
            <p className="text-xs text-gray-600">Academic Year 2024-25</p>
          </CardContent>
        </Card>

        <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 transform translate-x-6 -translate-y-6 sm:translate-x-8 sm:-translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Paid Amount</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-xl sm:text-3xl font-bold text-green-600 mb-1">₹{feeStatus.paidAmount.toLocaleString()}</div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium text-green-600">{completionPercentage}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 transform translate-x-6 -translate-y-6 sm:translate-x-8 sm:-translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Due Amount</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-xl sm:text-3xl font-bold text-red-600 mb-1">₹{feeStatus.dueAmount.toLocaleString()}</div>
            <p className="text-xs text-red-600 font-medium">Due by {feeStatus.nextDueDate}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Pending Dues */}
        <Card className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${
          animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}>
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm sm:text-base">Pending Dues</span>
            </CardTitle>
            <CardDescription>Outstanding fee payments</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {pendingDues.map((due, index) => (
                isMobile ? (
                  // Mobile Card View
                  <Card key={due.id} className="m-4 border-0 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            !
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{due.description}</p>
                            <p className="text-xs text-gray-500 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Due: {due.dueDate}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              Pay Now
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-red-600 text-lg">₹{due.amount.toLocaleString()}</p>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg transition-all duration-300 text-xs"
                        >
                          Pay Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  // Desktop List View
                  <div
                    key={due.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50/50 to-pink-50/50 hover:from-red-100 hover:to-pink-100 border-b border-red-200 last:border-b-0 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                        !
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{due.description}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Due: {due.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600 text-lg">₹{due.amount.toLocaleString()}</p>
                      <Button
                        size="sm"
                        className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Recent Payments */}
        <Card className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${
          animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}>
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm sm:text-base">Recent Payments</span>
            </CardTitle>
            <CardDescription>Your payment history</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {recentPayments.map((payment, index) => (
                isMobile ? (
                  // Mobile Card View
                  <Card key={payment.id} className="m-4 border-0 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            ✓
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{payment.description}</p>
                            <p className="text-xs text-gray-500">{payment.date}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download Receipt
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-green-600 text-lg">₹{payment.amount.toLocaleString()}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">{payment.status}</Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 bg-transparent text-xs"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  // Desktop List View
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50/50 to-blue-50/50 hover:from-green-100 hover:to-blue-100 border-b border-green-200 last:border-b-0 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                        ✓
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{payment.description}</p>
                        <p className="text-sm text-gray-500">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 text-lg">₹{payment.amount.toLocaleString()}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 transition-colors">{payment.status}</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 bg-transparent"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}