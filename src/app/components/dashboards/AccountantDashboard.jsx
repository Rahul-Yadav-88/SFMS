"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DollarSign, AlertCircle, CheckCircle, Clock, Search, Sparkles, ArrowUp, TrendingUp, XCircle, MoreVertical } from "lucide-react"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function AccountantDashboard() {
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

  const [pendingPayments, setPendingPayments] = useState([
    { id: 1, student: "Alice Brown", class: "10-A", amount: "₹5,000", mode: "UPI", time: "2 hours ago", status: "pending" },
    { id: 2, student: "Bob Wilson", class: "9-B", amount: "₹4,500", mode: "Bank Transfer", time: "3 hours ago", status: "pending" },
    { id: 3, student: "Carol Davis", class: "11-C", amount: "₹5,500", mode: "Cash", time: "4 hours ago", status: "pending" },
  ])

  const [verifiedPayments, setVerifiedPayments] = useState([])
  const [rejectedPayments, setRejectedPayments] = useState([])

  const [stats, setStats] = useState([
    {
      title: "Today's Collections",
      value: "₹45,000",
      description: "12 payments received",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      change: "+15%",
      trend: "up",
    },
    {
      title: "Pending Verifications",
      value: "3",
      description: "Payments to verify",
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "from-yellow-50 to-yellow-100",
      change: "-3",
      trend: "down",
    },
    {
      title: "Verified Today",
      value: "15",
      description: "Payments verified",
      icon: CheckCircle,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      change: "+5",
      trend: "up",
    },
    {
      title: "Rejected Today",
      value: "0",
      description: "Payments rejected",
      icon: XCircle,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      change: "0",
      trend: "down",
    },
  ])

  // Handle payment verification
  const handleVerifyPayment = (paymentId) => {
    const paymentToVerify = pendingPayments.find(payment => payment.id === paymentId)
    
    if (paymentToVerify) {
      // Remove from pending
      setPendingPayments(prevPayments => 
        prevPayments.filter(payment => payment.id !== paymentId)
      )
      
      // Add to verified with accepted status
      const verifiedPayment = { ...paymentToVerify, status: "accepted", verifiedAt: new Date().toLocaleString() }
      setVerifiedPayments(prev => [...prev, verifiedPayment])

      // Update stats
      setStats(prevStats => 
        prevStats.map(stat => {
          if (stat.title === "Pending Verifications") {
            const currentValue = parseInt(stat.value)
            return {
              ...stat,
              value: (currentValue - 1).toString(),
              change: `-${Math.abs(parseInt(stat.change.replace(/[+-]/g, '')) + 1)}`
            }
          }
          if (stat.title === "Verified Today") {
            const currentValue = parseInt(stat.value)
            return {
              ...stat,
              value: (currentValue + 1).toString(),
              change: `+${Math.abs(parseInt(stat.change.replace(/[+-]/g, '')) + 1)}`
            }
          }
          return stat
        })
      )

      // Show success message
      console.log(`Payment ${paymentId} verified successfully`)
    }
  }

  // Handle payment rejection
  const handleRejectPayment = (paymentId) => {
    const paymentToReject = pendingPayments.find(payment => payment.id === paymentId)
    
    if (paymentToReject) {
      // Remove from pending
      setPendingPayments(prevPayments => 
        prevPayments.filter(payment => payment.id !== paymentId)
      )
      
      // Add to rejected with rejected status
      const rejectedPayment = { ...paymentToReject, status: "rejected", rejectedAt: new Date().toLocaleString() }
      setRejectedPayments(prev => [...prev, rejectedPayment])

      // Update stats
      setStats(prevStats => 
        prevStats.map(stat => {
          if (stat.title === "Pending Verifications") {
            const currentValue = parseInt(stat.value)
            return {
              ...stat,
              value: (currentValue - 1).toString(),
              change: `-${Math.abs(parseInt(stat.change.replace(/[+-]/g, '')) + 1)}`
            }
          }
          if (stat.title === "Rejected Today") {
            const currentValue = parseInt(stat.value)
            return {
              ...stat,
              value: (currentValue + 1).toString(),
              change: `+${Math.abs(parseInt(stat.change.replace(/[+-]/g, '')) + 1)}`
            }
          }
          return stat
        })
      )

      // Show rejection message
      console.log(`Payment ${paymentId} rejected`)
    }
  }

  // Generate Excel report
  const generateReport = () => {
    // Combine all payments for the report
    const allPayments = [
      ...verifiedPayments.map(payment => ({
        ...payment,
        status: "Accepted",
        date: payment.verifiedAt
      })),
      ...rejectedPayments.map(payment => ({
        ...payment,
        status: "Rejected", 
        date: payment.rejectedAt
      })),
      ...pendingPayments.map(payment => ({
        ...payment,
        status: "Pending",
        date: "Not processed"
      }))
    ]

    // Create report data
    const reportData = [
      ['Student Name', 'Class', 'Amount', 'Payment Mode', 'Status', 'Processed Date'],
      ...allPayments.map(payment => [
        payment.student,
        payment.class,
        payment.amount,
        payment.mode,
        payment.status,
        payment.date
      ])
    ];

    // Convert to CSV format
    const csvContent = reportData.map(row => row.join(',')).join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `financial-report-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success message
    console.log('Report generated successfully with status updates')
  }

  // Handle quick actions
  const handleQuickAction = (actionLabel) => {
    switch (actionLabel) {
      case "Verify Payments":
        // Navigate to verify payments page or open modal
        console.log("Navigate to verify payments");
        break;
      case "Generate Reports":
        generateReport();
        break;
      case "Send Due Reminders":
        // Implement send due reminders functionality
        console.log("Sending due reminders...");
        // You can integrate with email API here
        break;
      default:
        break;
    }
  }

  if (!mounted) {
    return (
      <div className="space-y-8 p-4 sm:p-0">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Accountant Dashboard
            </h2>
            <p className="text-gray-600 mt-2 flex items-center space-x-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>Monitor and verify financial transactions</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 p-4 sm:p-0 transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="transform transition-all duration-500 hover:scale-105">
          <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Accountant Dashboard
          </h2>
          <p className="text-gray-600 mt-2 flex items-center space-x-1 text-sm sm:text-base">
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
            <span>Monitor and verify financial transactions</span>
          </p>
        </div>
        <div className={`flex space-x-2 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search payments..."
              className="pl-10 w-full sm:w-64 border-2 focus:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group ${
                animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
              ></div>
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 transform translate-x-6 -translate-y-6 sm:translate-x-8 sm:-translate-y-8">
                <div
                  className={`w-full h-full bg-gradient-to-br ${stat.color} opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500`}
                ></div>
              </div>

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">{stat.title}</CardTitle>
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-xl sm:text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600">{stat.description}</p>
                  <div
                    className={`flex items-center space-x-1 text-xs font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <ArrowUp className={`h-3 w-3 ${stat.trend === "down" ? "rotate-180" : ""}`} />
                    <span>{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Pending Verifications */}
        <Card className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${
          animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}>
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm sm:text-base">Pending Verifications</span>
            </CardTitle>
            <CardDescription>Payments awaiting verification - {pendingPayments.length} remaining</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {pendingPayments.length === 0 ? (
                <div className={`p-6 sm:p-8 text-center transition-all duration-700 ${animate ? 'opacity-100' : 'opacity-0'}`}>
                  <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-green-500 mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-600 font-medium text-sm sm:text-base">All payments have been processed!</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">No pending verifications</p>
                </div>
              ) : (
                pendingPayments.map((payment, index) => (
                  isMobile ? (
                    // Mobile Card View
                    <Card key={payment.id} className="m-4 border-0 shadow-sm hover:shadow-md transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {payment.student.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{payment.student}</p>
                              <p className="text-xs text-gray-500">Class {payment.class}</p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleVerifyPayment(payment.id)}>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                Accept Payment
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRejectPayment(payment.id)}>
                                <XCircle className="h-4 w-4 mr-2 text-red-600" />
                                Reject Payment
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                          <div>
                            <p className="text-gray-500">Amount</p>
                            <p className="font-bold text-yellow-600">{payment.amount}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Mode</p>
                            <p className="font-medium">{payment.mode}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Time</p>
                            <p className="font-medium">{payment.time}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Status</p>
                            <p className="font-medium text-yellow-600">Pending</p>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-sm hover:shadow-md transition-all duration-300 text-xs"
                            onClick={() => handleVerifyPayment(payment.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1 shadow-sm hover:shadow-md transition-all duration-300 text-xs"
                            onClick={() => handleRejectPayment(payment.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    // Desktop Table View
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 hover:from-yellow-100 hover:to-orange-100 border-b border-yellow-200 last:border-b-0 transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                          {payment.student.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{payment.student}</p>
                          <p className="text-sm text-gray-500">
                            Class {payment.class} • {payment.mode}
                          </p>
                          <p className="text-xs text-yellow-600 font-medium mt-1">Status: Pending</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-yellow-600">{payment.amount}</p>
                        <p className="text-sm text-gray-500 mb-2">{payment.time}</p>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                            onClick={() => handleVerifyPayment(payment.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                            onClick={() => handleRejectPayment(payment.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Quick Actions */}
        <Card className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${
          animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm sm:text-base">Quick Actions</span>
            </CardTitle>
            <CardDescription>Common accounting tasks</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  icon: CheckCircle,
                  label: "Verify Payments",
                  color: "from-green-500 to-green-600",
                  bgColor: "from-green-50 to-green-100",
                },
                {
                  icon: DollarSign,
                  label: "Generate Reports",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "from-blue-50 to-blue-100",
                },
                {
                  icon: AlertCircle,
                  label: "Send Due Reminders",
                  color: "from-red-500 to-red-600",
                  bgColor: "from-red-50 to-red-100",
                },
              ].map((action, index) => {
                const Icon = action.icon
                return (
                  <Button
                    key={index}
                    className={`w-full justify-start h-12 sm:h-14 bg-gradient-to-r ${action.bgColor} border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
                    variant="outline"
                    onClick={() => handleQuickAction(action.label)}
                  >
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${action.color} mr-3 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                    >
                      <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700 text-sm sm:text-base">{action.label}</span>
                  </Button>
                )
              })}
            </div>

            {/* Recent Activity Summary */}
            <div className={`mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border transition-all duration-700 ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <h4 className="font-medium text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Recent Activity Summary</h4>
              <div className="space-y-1 sm:space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-green-600">Accepted Payments:</span>
                  <span className="font-medium">{verifiedPayments.length}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-red-600">Rejected Payments:</span>
                  <span className="font-medium">{rejectedPayments.length}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-yellow-600">Pending Payments:</span>
                  <span className="font-medium">{pendingPayments.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}