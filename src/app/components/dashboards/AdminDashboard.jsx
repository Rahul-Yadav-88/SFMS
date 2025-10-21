"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Users, DollarSign, AlertCircle, TrendingUp, Plus, FileText, CreditCard, Sparkles, ArrowUp, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export default function AdminDashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Trigger main container animation
    setIsVisible(true)
    
    // Trigger stats animation after a short delay
    const statsTimer = setTimeout(() => setStatsVisible(true), 300)
    
    // Trigger content animation after stats
    const contentTimer = setTimeout(() => setContentVisible(true), 600)

    return () => {
      clearTimeout(statsTimer)
      clearTimeout(contentTimer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const [students, setStudents] = useState([
    {
      id: 1,
      rollNo: "2024001",
      name: "John Doe",
      class: "10-A",
      section: "Science",
      email: "john.doe@email.com",
      mobile: "+91 9876543210",
      parentName: "Robert Doe",
      address: "123 Main St, City",
      feeStatus: "Paid",
      dueAmount: 0,
    },
    {
      id: 2,
      rollNo: "2024002",
      name: "Jane Smith",
      class: "10-A",
      section: "Science",
      email: "jane.smith@email.com",
      mobile: "+91 9876543211",
      parentName: "Michael Smith",
      address: "456 Oak Ave, City",
      feeStatus: "Partial",
      dueAmount: 5000,
    },
  ])

  const handleAddStudent = (newStudent) => {
    setStudents([...students, { ...newStudent, id: students.length + 1 }])
  }

  const stats = [
    {
      title: "Total Students",
      value: students.length.toString(),
      description: "Active students",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Total Collections",
      value: "₹12,45,000",
      description: "This month",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      change: "+8.2%",
      trend: "up",
    },
    {
      title: "Outstanding Dues",
      value: "₹2,34,000",
      description: "Pending payments",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      change: "-5.1%",
      trend: "down",
    },
    {
      title: "Collection Rate",
      value: "84.2%",
      description: "This month",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      change: "+2.4%",
      trend: "up",
    },
  ]

  const recentPayments = [
    { id: 1, student: "John Doe", class: "10-A", amount: "₹5,000", date: "2024-01-15", status: "Paid" },
    { id: 2, student: "Jane Smith", class: "9-B", amount: "₹4,500", date: "2024-01-14", status: "Paid" },
    { id: 3, student: "Mike Johnson", class: "11-C", amount: "₹5,500", date: "2024-01-13", status: "Paid" },
    { id: 4, student: "Sarah Wilson", class: "8-A", amount: "₹4,000", date: "2024-01-12", status: "Paid" },
  ]

  return (
    <div className={`
        flex flex-col space-y-6 transform transition-all duration-700 ease-out
      ${isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8'
      }
    `}>
      {/* Header with staggered animation */}
      <div className={`
        flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transform transition-all duration-700 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-4'
        }
      `}>
        <div className="transform transition-all duration-1000 ease-out hover:scale-105">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h2>
          <p className="text-gray-600 mt-2 flex items-center space-x-1 text-sm sm:text-base">
            <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
            <span>Manage your school's financial operations</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 transform transition-all duration-1000 ease-out delay-300">
          {/* Add Student Dialog - UPDATED FOR RESPONSIVENESS */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse-slow w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="
  w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto 
  bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl
  sm:rounded-lg
">
  <DialogHeader className="pb-4 sm:pb-6">
    <DialogTitle className="text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center sm:text-left">
      Add New Student
    </DialogTitle>
    <DialogDescription className="text-center sm:text-left">
      Enter student details to add them to the system.
    </DialogDescription>
  </DialogHeader>
  
  <form
    onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const newStudent = {
        rollNo: formData.get("rollNo"),
        name: formData.get("name"),
        class: formData.get("class"),
        section: formData.get("section"),
        email: formData.get("email"),
        mobile: formData.get("mobile"),
        parentName: formData.get("parentName"),
        address: formData.get("address"),
        feeStatus: "Due",
        dueAmount: 15000,
      }
      handleAddStudent(newStudent)
      e.target.reset()
    }}
    className="space-y-4 sm:space-y-6"
  >
    {/* Student Information Section */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Student Information</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter full name"
            className="w-full border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rollNo" className="text-sm font-medium">
            Roll Number *
          </Label>
          <Input
            id="rollNo"
            name="rollNo"
            placeholder="Enter roll number"
            className="w-full border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="class" className="text-sm font-medium">
            Class *
          </Label>
          <Select name="class" required>
            <SelectTrigger className="w-full border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="8-A">8-A</SelectItem>
              <SelectItem value="9-A">9-A</SelectItem>
              <SelectItem value="9-B">9-B</SelectItem>
              <SelectItem value="10-A">10-A</SelectItem>
              <SelectItem value="10-B">10-B</SelectItem>
              <SelectItem value="11-A">11-A</SelectItem>
              <SelectItem value="11-B">11-B</SelectItem>
              <SelectItem value="12-A">12-A</SelectItem>
              <SelectItem value="12-B">12-B</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="section" className="text-sm font-medium">
            Section *
          </Label>
          <Select name="section" required>
            <SelectTrigger className="w-full border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="Commerce">Commerce</SelectItem>
              <SelectItem value="Arts">Arts</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    {/* Contact Information Section */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Information</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="student@email.com"
            className="w-full border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mobile" className="text-sm font-medium">
            Mobile Number *
          </Label>
          <Input
            id="mobile"
            name="mobile"
            placeholder="+91 9876543210"
            className="w-full border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
            required
          />
        </div>
      </div>
    </div>

    {/* Parent Information Section */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Parent Information</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="parentName" className="text-sm font-medium">
            Parent/Guardian Name *
          </Label>
          <Input
            id="parentName"
            name="parentName"
            placeholder="Enter parent/guardian name"
            className="w-full border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
            required
          />
        </div>
        
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="address" className="text-sm font-medium">
            Address *
          </Label>
          <Input
            id="address"
            name="address"
            placeholder="Enter complete address"
            className="w-full border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
            required
          />
        </div>
      </div>
    </div>

    <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 border-t">
      <Button
        type="button"
        variant="outline"
        className="w-full sm:w-auto order-2 sm:order-1"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 order-1 sm:order-2"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Student
      </Button>
    </DialogFooter>
  </form>
</DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="border-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 bg-transparent w-full sm:w-auto"
          >
            <FileText className="mr-2 h-4 w-4" />
            Create Fee Structure
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards with staggered entrance */}
      <div className={`
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 transform transition-all duration-1000 ease-out
        ${statsVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
        }
      `}>
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className={`
                relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group
                transform transition-all duration-700 ease-out
                ${statsVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
              ></div>
              <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
                <div
                  className={`w-full h-full bg-gradient-to-br ${stat.color} opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500`}
                ></div>
              </div>

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-4">
                <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative p-4 pt-0">
                <div className="text-xl font-bold text-gray-800 mb-1">{stat.value}</div>
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

      {/* Bottom Content with staggered animation */}
      <div className={`
        grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 transform transition-all duration-1000 ease-out
        ${contentVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
        }
      `}>
        {/* Enhanced Recent Payments */}
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg sm:text-xl">Recent Payments</span>
            </CardTitle>
            <CardDescription>Latest fee payments received</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {recentPayments.map((payment, index) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all border-b border-gray-100 last:border-b-0 group"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                      {payment.student
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{payment.student}</p>
                      <p className="text-sm text-gray-500">Class {payment.class}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="font-bold text-green-600 text-sm sm:text-base">{payment.amount}</p>
                    <p className="text-xs text-gray-500">{payment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Quick Actions */}
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg sm:text-xl">Quick Actions</span>
            </CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  icon: Users,
                  label: "Manage Students",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "from-blue-50 to-blue-100",
                },
                {
                  icon: FileText,
                  label: "Fee Structures",
                  color: "from-green-500 to-green-600",
                  bgColor: "from-green-50 to-green-100",
                },
                {
                  icon: CreditCard,
                  label: "Collect Fees",
                  color: "from-purple-500 to-purple-600",
                  bgColor: "from-purple-50 to-purple-100",
                },
                {
                  icon: AlertCircle,
                  label: "View Dues",
                  color: "from-red-500 to-red-600",
                  bgColor: "from-red-50 to-red-100",
                },
              ].map((action, index) => {
                const Icon = action.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`
                      h-16 sm:h-20 flex flex-col bg-gradient-to-br ${action.bgColor} border-0 shadow-md hover:shadow-xl transition-all hover:scale-105 group
                    `}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div
                      className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${action.color} mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 text-center px-1">{action.label}</span>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}