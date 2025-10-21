"use client"

import { useState, useEffect } from "react"
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
} from "../ui/dialog"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { AlertCircle, Send, Download, Search, Filter, Sparkles, Eye, Phone, Mail, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function FeeDues() {
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
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [reminderMessage, setReminderMessage] = useState("")

  const [studentsWithDues, setStudentsWithDues] = useState([
    {
      id: 1,
      name: "Alice Wonderland",
      rollNo: "101",
      class: "VII",
      totalDue: 12500,
      overdueDays: 25,
      parentName: "Bob Wonderland",
      parentMobile: "9876543210",
      parentEmail: "bob.wonderland@email.com",
      priority: "High",
      lastPayment: "2024-01-15",
      feeHeads: [
        { name: "Tuition Fee", amount: 8000, dueDate: "2024-01-01" },
        { name: "Transport Fee", amount: 4500, dueDate: "2024-01-01" },
      ],
    },
    {
      id: 2,
      name: "Charlie Puth",
      rollNo: "102",
      class: "VIII",
      totalDue: 8000,
      overdueDays: 10,
      parentName: "David Puth",
      parentMobile: "8765432109",
      parentEmail: "david.puth@email.com",
      priority: "Medium",
      lastPayment: "2024-01-20",
      feeHeads: [{ name: "Tuition Fee", amount: 8000, dueDate: "2024-01-01" }],
    },
    {
      id: 3,
      name: "Eva Mendes",
      rollNo: "103",
      class: "IX",
      totalDue: 5000,
      overdueDays: 5,
      parentName: "Franklin Mendes",
      parentMobile: "7654321098",
      parentEmail: "franklin.mendes@email.com",
      priority: "Low",
      lastPayment: "2024-01-25",
      feeHeads: [{ name: "Tuition Fee", amount: 5000, dueDate: "2024-01-01" }],
    },
    {
      id: 4,
      name: "George Clooney",
      rollNo: "104",
      class: "X",
      totalDue: 15000,
      overdueDays: 30,
      parentName: "Harry Clooney",
      parentMobile: "6543210987",
      parentEmail: "harry.clooney@email.com",
      priority: "High",
      lastPayment: null,
      feeHeads: [
        { name: "Tuition Fee", amount: 10000, dueDate: "2024-01-01" },
        { name: "Exam Fee", amount: 5000, dueDate: "2024-01-01" },
      ],
    },
    {
      id: 5,
      name: "Irene Adler",
      rollNo: "105",
      class: "XI",
      totalDue: 10000,
      overdueDays: 15,
      parentName: "Jack Adler",
      parentMobile: "5432109876",
      parentEmail: "jack.adler@email.com",
      priority: "Medium",
      lastPayment: "2024-01-10",
      feeHeads: [{ name: "Tuition Fee", amount: 10000, dueDate: "2024-01-01" }],
    },
    {
      id: 6,
      name: "Kevin Bacon",
      rollNo: "106",
      class: "XII",
      totalDue: 7500,
      overdueDays: 8,
      parentName: "Laura Bacon",
      parentMobile: "4321098765",
      parentEmail: "laura.bacon@email.com",
      priority: "Low",
      lastPayment: "2024-01-18",
      feeHeads: [{ name: "Tuition Fee", amount: 7500, dueDate: "2024-01-01" }],
    },
  ])

  const filteredStudents = studentsWithDues.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "all" || student.class === selectedClass
    const matchesPriority = selectedPriority === "all" || student.priority === selectedPriority
    return matchesSearch && matchesClass && matchesPriority
  })

  const handleSendReminder = (student) => {
    setSelectedStudent(student)
    setReminderMessage(
      `Dear ${student.parentName}, your ward ${student.name} has pending fees of ₹${student.totalDue.toLocaleString()}. Please clear the dues at the earliest.`,
    )
    setReminderDialogOpen(true)
  }

  const handleViewDetails = (student) => {
    setSelectedStudent(student)
    setDetailsDialogOpen(true)
  }

  const sendReminder = () => {
    console.log(`Sending reminder to ${selectedStudent.parentMobile}: ${reminderMessage}`)
    setReminderDialogOpen(false)
    setSelectedStudent(null)
    setReminderMessage("")
  }

  const sendBulkReminders = () => {
    const highPriorityStudents = filteredStudents.filter((s) => s.priority === "High" || s.overdueDays > 10)
    console.log(`Sending reminders to ${highPriorityStudents.length} students`)
  }

  const exportReport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Roll No,Class,Due Amount,Overdue Days,Priority\n" +
      filteredStudents
        .map((s) => `${s.name},${s.rollNo},${s.class},${s.totalDue},${s.overdueDays},${s.priority}`)
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "fee_dues_report.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getPriorityBadge = (priority) => {
    const baseClasses = "text-xs font-medium"
    if (priority === "High") {
      return <Badge className={`bg-red-100 text-red-800 border-red-200 ${baseClasses}`}>High</Badge>
    } else if (priority === "Medium") {
      return <Badge className={`bg-yellow-100 text-yellow-800 border-yellow-200 ${baseClasses}`}>Medium</Badge>
    } else {
      return <Badge className={`bg-green-100 text-green-800 border-green-200 ${baseClasses}`}>Low</Badge>
    }
  }

  if (!mounted) {
    return (
      <div className="space-y-8 p-4 sm:p-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Fee Dues Management
              </h2>
              <p className="text-gray-600 flex items-center space-x-1">
                <Sparkles className="h-4 w-4 text-red-500" />
                <span>Track and manage outstanding fee payments</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 p-4 sm:p-0 transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center space-x-3 transform transition-all duration-500 hover:scale-105">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Fee Dues Management
            </h2>
            <p className="text-gray-600 flex items-center space-x-1 text-sm sm:text-base">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
              <span>Track and manage outstanding fee payments</span>
            </p>
          </div>
        </div>
        <div className={`flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Button
            onClick={sendBulkReminders}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm sm:text-base"
          >
            <Send className="mr-2 h-4 w-4" />
            Send Bulk Reminders
          </Button>
          <Button
            variant="outline"
            onClick={exportReport}
            className="w-full sm:w-auto border-2 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:border-green-300 transition-all duration-300 hover:scale-105 bg-transparent text-sm sm:text-base"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Enhanced Filters */}
      <Card className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${
        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
              <Filter className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm sm:text-base">Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, roll number, or class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 focus:border-red-400 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
                />
              </div>
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full sm:w-48 border-2 focus:border-red-400 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl">
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="VII">VII</SelectItem>
                <SelectItem value="VIII">VIII</SelectItem>
                <SelectItem value="IX">IX</SelectItem>
                <SelectItem value="X">X</SelectItem>
                <SelectItem value="XI">XI</SelectItem>
                <SelectItem value="XII">XII</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-full sm:w-48 border-2 focus:border-red-400 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl">
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High Priority</SelectItem>
                <SelectItem value="Medium">Medium Priority</SelectItem>
                <SelectItem value="Low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Students with Dues Table */}
      <Card className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${
        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm sm:text-base">Students with Outstanding Dues ({filteredStudents.length})</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Total Outstanding: ₹{filteredStudents.reduce((sum, s) => sum + s.totalDue, 0).toLocaleString()}
            </div>
          </CardTitle>
          <CardDescription>Manage and track student fee dues efficiently</CardDescription>
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
                          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {student.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{student.name}</p>
                            <p className="text-xs text-gray-500">Roll No: {student.rollNo} • Class: {student.class}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(student)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendReminder(student)}>
                              <Send className="h-4 w-4 mr-2" />
                              Send Reminder
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                        <div>
                          <p className="text-gray-500">Due Amount</p>
                          <p className="font-bold text-red-600 text-sm">₹{student.totalDue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Overdue Days</p>
                          <p className={`font-medium ${
                            student.overdueDays > 20 ? "text-red-600" : 
                            student.overdueDays > 10 ? "text-yellow-600" : "text-green-600"
                          }`}>
                            {student.overdueDays} days
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Priority</p>
                          <div className="mt-1">{getPriorityBadge(student.priority)}</div>
                        </div>
                        <div>
                          <p className="text-gray-500">Parent</p>
                          <p className="font-medium truncate">{student.parentName}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(student)}
                          className="flex-1 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 text-xs"
                        >
                          <Eye className="mr-1 h-3 w-3" />
                          Details
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSendReminder(student)}
                          className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 text-xs"
                        >
                          <Send className="mr-1 h-3 w-3" />
                          Remind
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // Desktop Table View
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <TableHead className="font-semibold">Roll No.</TableHead>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Class</TableHead>
                    <TableHead className="font-semibold">Due Amount</TableHead>
                    <TableHead className="font-semibold">Overdue Days</TableHead>
                    <TableHead className="font-semibold">Priority</TableHead>
                    <TableHead className="font-semibold">Parent Contact</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => (
                    <TableRow
                      key={student.id}
                      className="hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-300"
                    >
                      <TableCell className="font-medium text-blue-600">{student.rollNo}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {student.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell className="font-bold text-red-600">₹{student.totalDue.toLocaleString()}</TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${
                            student.overdueDays > 20
                              ? "text-red-600"
                              : student.overdueDays > 10
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {student.overdueDays} days
                        </span>
                      </TableCell>
                      <TableCell>{getPriorityBadge(student.priority)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1 text-sm">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span>{student.parentMobile}</span>
                          </div>
                          <div className="text-xs text-gray-500">{student.parentName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(student)}
                            className="hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSendReminder(student)}
                            className="hover:bg-green-100 hover:text-green-600 transition-all duration-300 hover:scale-110"
                          >
                            <Send className="h-4 w-4" />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 transform translate-x-6 -translate-y-6 sm:translate-x-8 sm:-translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Total Outstanding</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-xl sm:text-3xl font-bold text-red-600 mb-1">
              ₹{filteredStudents.reduce((sum, s) => sum + s.totalDue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">{filteredStudents.length} students</p>
          </CardContent>
        </Card>

        <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 transform translate-x-6 -translate-y-6 sm:translate-x-8 sm:-translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-yellow-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">High Priority</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-xl sm:text-3xl font-bold text-yellow-600 mb-1">
              {filteredStudents.filter((s) => s.priority === "High").length}
            </div>
            <p className="text-xs text-gray-600">Students</p>
          </CardContent>
        </Card>

        <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 transform translate-x-6 -translate-y-6 sm:translate-x-8 sm:-translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Overdue &gt;30 Days</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-xl sm:text-3xl font-bold text-orange-600 mb-1">
              {filteredStudents.filter((s) => s.overdueDays > 30).length}
            </div>
            <p className="text-xs text-gray-600">Critical cases</p>
          </CardContent>
        </Card>

        <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 transform translate-x-6 -translate-y-6 sm:translate-x-8 sm:-translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Average Due</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-xl sm:text-3xl font-bold text-blue-600 mb-1">
              ₹
              {filteredStudents.length > 0
                ? Math.round(
                    filteredStudents.reduce((sum, s) => sum + s.totalDue, 0) / filteredStudents.length,
                  ).toLocaleString()
                : 0}
            </div>
            <p className="text-xs text-gray-600">Per student</p>
          </CardContent>
        </Card>
      </div>

      {/* Send Reminder Dialog */}
      <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
  <DialogContent className="
    w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto 
    bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl
    sm:rounded-lg
  ">
    <DialogHeader className="pb-4 sm:pb-6">
      <DialogTitle className="text-xl sm:text-2xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent text-center sm:text-left">
        Send Fee Reminder
      </DialogTitle>
      <DialogDescription className="text-center sm:text-left">
        Send reminder to {selectedStudent?.parentName} ({selectedStudent?.parentMobile})
      </DialogDescription>
    </DialogHeader>
    
    <div className="space-y-4 sm:space-y-6 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Student Name</Label>
          <Input 
            value={selectedStudent?.name || ""} 
            disabled 
            className="w-full bg-gray-50 text-sm sm:text-base" 
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Due Amount</Label>
          <Input
            value={selectedStudent ? `₹${selectedStudent.totalDue.toLocaleString()}` : ""}
            disabled
            className="w-full bg-red-50 text-red-600 font-bold text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Parent Name</Label>
          <Input 
            value={selectedStudent?.parentName || ""} 
            disabled 
            className="w-full bg-gray-50 text-sm sm:text-base" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactMethod" className="text-sm font-medium">Contact Method</Label>
          <Select name="contactMethod" defaultValue="sms">
            <SelectTrigger className="w-full border-2 focus:border-red-400 transition-all duration-300 text-sm sm:text-base">
              <SelectValue placeholder="Select contact method" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="both">SMS & Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reminderMessage" className="text-sm font-medium">Message *</Label>
        <Textarea
          id="reminderMessage"
          value={reminderMessage}
          onChange={(e) => setReminderMessage(e.target.value)}
          rows={4}
          className="w-full border-2 focus:border-red-400 transition-all duration-300 text-sm sm:text-base"
          placeholder="Enter your reminder message here..."
          required
        />
        <p className="text-xs text-gray-500">
          Character count: {reminderMessage.length} {reminderMessage.length > 160 ? '(SMS may be split)' : ''}
        </p>
      </div>

      <div className="p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <span className="font-medium text-red-700 text-sm sm:text-base">Reminder Details</span>
        </div>
        <div className="text-xs sm:text-sm text-gray-600 space-y-1">
          <p>• Overdue: {selectedStudent?.overdueDays} days</p>
          <p>• Priority: {selectedStudent?.priority}</p>
          <p>• Last Payment: {selectedStudent?.lastPayment || "Never"}</p>
          <p>• Total Due: ₹{selectedStudent?.totalDue.toLocaleString()}</p>
        </div>
      </div>
    </div>
    
    <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 border-t">
      <Button 
        type="button"
        variant="outline" 
        onClick={() => {
          setReminderDialogOpen(false)
          setReminderMessage("")
        }}
        className="w-full sm:w-auto order-2 sm:order-1"
      >
        Cancel
      </Button>
      <Button
        onClick={sendReminder}
        disabled={!reminderMessage.trim()}
        className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="mr-2 h-4 w-4" />
        Send Reminder
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      {/* Student Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Student Fee Details
            </DialogTitle>
            <DialogDescription>Complete fee information for {selectedStudent?.name}</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4 sm:space-y-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold text-sm sm:text-base">Student Name</Label>
                  <p className="p-2 bg-gray-50 rounded text-sm sm:text-base">{selectedStudent.name}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-sm sm:text-base">Roll Number</Label>
                  <p className="p-2 bg-gray-50 rounded text-sm sm:text-base">{selectedStudent.rollNo}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-sm sm:text-base">Class</Label>
                  <p className="p-2 bg-gray-50 rounded text-sm sm:text-base">{selectedStudent.class}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold text-sm sm:text-base">Total Due Amount</Label>
                  <p className="p-3 bg-red-50 rounded font-bold text-red-600 text-base sm:text-lg">
                    ₹{selectedStudent.totalDue.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-sm sm:text-base">Overdue Period</Label>
                  <p className="p-3 bg-yellow-50 rounded font-bold text-yellow-600 text-base sm:text-lg">
                    {selectedStudent.overdueDays} days
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-semibold text-sm sm:text-base">Fee Breakdown</Label>
                <div className="space-y-2">
                  {selectedStudent.feeHeads?.map((fee, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm sm:text-base">{fee.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">Due Date: {fee.dueDate}</p>
                      </div>
                      <p className="font-bold text-red-600 text-sm sm:text-lg">₹{fee.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4 pt-4 border-t">
                <div className="space-y-3">
                  <Label className="font-semibold text-sm sm:text-base">Parent Contact Information</Label>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="font-medium text-sm sm:text-base">{selectedStudent.parentName}</p>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm sm:text-base">{selectedStudent.parentMobile}</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm sm:text-base break-all">{selectedStudent.parentEmail}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="font-semibold text-sm sm:text-base">Payment Status</Label>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs sm:text-sm text-gray-600">Priority Level</p>
                      <div className="mt-1">{getPriorityBadge(selectedStudent.priority)}</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs sm:text-sm text-gray-600">Last Payment</p>
                      <p className="font-medium text-sm sm:text-base">{selectedStudent.lastPayment || "No previous payments"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setDetailsDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setDetailsDialogOpen(false)
                handleSendReminder(selectedStudent)
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}