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
  DialogTrigger,
} from "../ui/dialog"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Plus, Search, Edit, Trash2, Eye, Users, Sparkles, Filter, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function StudentManagement() {
  const [isVisible, setIsVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [tableVisible, setTableVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Trigger main container animation
    setIsVisible(true)
    
    // Stagger animations for different sections
    const headerTimer = setTimeout(() => setHeaderVisible(true), 200)
    const filtersTimer = setTimeout(() => setFiltersVisible(true), 400)
    const tableTimer = setTimeout(() => setTableVisible(true), 600)

    return () => {
      clearTimeout(headerTimer)
      clearTimeout(filtersTimer)
      clearTimeout(tableTimer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
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
    {
      id: 3,
      rollNo: "2024003",
      name: "Mike Johnson",
      class: "9-B",
      section: "Commerce",
      email: "mike.johnson@email.com",
      mobile: "+91 9876543212",
      parentName: "David Johnson",
      address: "789 Pine Rd, City",
      feeStatus: "Due",
      dueAmount: 15000,
    },
  ])

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "all" || student.class === selectedClass
    return matchesSearch && matchesClass
  })

  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setViewDialogOpen(true)
  }

  const handleEditStudent = (student) => {
    setSelectedStudent(student)
    setEditDialogOpen(true)
  }

  const handleDeleteStudent = (student) => {
    setSelectedStudent(student)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setStudents(students.filter((s) => s.id !== selectedStudent.id))
    setDeleteDialogOpen(false)
    setSelectedStudent(null)
  }

  const handleUpdateStudent = (updatedData) => {
    setStudents(students.map((s) => (s.id === selectedStudent.id ? { ...s, ...updatedData } : s)))
    setEditDialogOpen(false)
    setSelectedStudent(null)
  }

  const getStatusBadge = (status, dueAmount) => {
    if (status === "Paid") {
      return <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Paid</Badge>
    } else if (status === "Partial") {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">Partial</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">Due</Badge>
    }
  }

  return (
    <div className={`
      space-y-6 sm:space-y-8 transform transition-all duration-1000 ease-out p-4 sm:p-0
      ${isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8'
      }
    `}>
      {/* Header with enhanced animations */}
      <div className={`
        flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transform transition-all duration-700 ease-out
        ${headerVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-4'
        }
      `}>
        <div className="flex items-center space-x-3 transform transition-all duration-1000 ease-out hover:scale-105">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Student Management
            </h2>
            <p className="text-gray-600 flex items-center space-x-1 text-sm">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
              <span>Manage student information and records</span>
            </p>
          </div>
        </div>
        <div className="transform transition-all duration-1000 ease-out">
          <Dialog>
  <DialogTrigger asChild>
    <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm sm:text-base">
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
        </div>
      </div>

      {/* Enhanced Filters with animation */}
      <div className={`
        transform transition-all duration-700 ease-out
        ${filtersVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
        }
      `}>
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
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
                    placeholder="Search by name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 focus:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
                  />
                </div>
              </div>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full sm:w-48 border-2 focus:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl">
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="8-A">8-A</SelectItem>
                  <SelectItem value="9-A">9-A</SelectItem>
                  <SelectItem value="9-B">9-B</SelectItem>
                  <SelectItem value="10-A">10-A</SelectItem>
                  <SelectItem value="10-B">10-B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Students Table with staggered row animations */}
      <div className={`
        transform transition-all duration-1000 ease-out
        ${tableVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
        }
      `}>
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Students ({filteredStudents.length})</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Total: {students.length} students</div>
            </CardTitle>
            <CardDescription>Manage student information and fee assignments</CardDescription>
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
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {student.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{student.name}</p>
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
                              <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteStudent(student)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs">Class</p>
                            <p className="font-medium">{student.class}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Section</p>
                            <p className="font-medium">{student.section}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Parent</p>
                            <p className="font-medium truncate">{student.parentName}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Fee Status</p>
                            <div className="mt-1">{getStatusBadge(student.feeStatus, student.dueAmount)}</div>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-500 text-xs">Due Amount</p>
                            <p className={`font-bold ${student.dueAmount > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                              {student.dueAmount > 0 ? `₹${student.dueAmount.toLocaleString()}` : '-'}
                            </p>
                          </div>
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
                      <TableHead className="font-semibold">Section</TableHead>
                      <TableHead className="font-semibold">Parent</TableHead>
                      <TableHead className="font-semibold">Fee Status</TableHead>
                      <TableHead className="font-semibold">Due Amount</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student, index) => (
                      <TableRow
                        key={student.id}
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                      >
                        <TableCell className="font-medium text-blue-600">{student.rollNo}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              {student.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.section}</TableCell>
                        <TableCell>{student.parentName}</TableCell>
                        <TableCell>{getStatusBadge(student.feeStatus, student.dueAmount)}</TableCell>
                        <TableCell>
                          {student.dueAmount > 0 ? (
                            <span className="font-bold text-red-600">₹{student.dueAmount.toLocaleString()}</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewStudent(student)}
                              className="hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditStudent(student)}
                              className="hover:bg-green-100 hover:text-green-600 transition-all duration-300"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteStudent(student)}
                              className="hover:bg-red-100 hover:text-red-600 transition-all duration-300"
                            >
                              <Trash2 className="h-4 w-4" />
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
      </div>

      {/* View Student Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Student Details
            </DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-4">
              <div className="space-y-2">
                <Label className="font-semibold text-sm sm:text-base">Full Name</Label>
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
              <div className="space-y-2">
                <Label className="font-semibold text-sm sm:text-base">Section</Label>
                <p className="p-2 bg-gray-50 rounded text-sm sm:text-base">{selectedStudent.section}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-sm sm:text-base">Email</Label>
                <p className="p-2 bg-gray-50 rounded text-sm sm:text-base break-all">{selectedStudent.email}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-sm sm:text-base">Mobile</Label>
                <p className="p-2 bg-gray-50 rounded text-sm sm:text-base">{selectedStudent.mobile}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-sm sm:text-base">Parent Name</Label>
                <p className="p-2 bg-gray-50 rounded text-sm sm:text-base">{selectedStudent.parentName}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-sm sm:text-base">Fee Status</Label>
                <p className="p-2 bg-gray-50 rounded text-sm sm:text-base">{selectedStudent.feeStatus}</p>
              </div>
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <Label className="font-semibold text-sm sm:text-base">Address</Label>
                <p className="p-2 bg-gray-50 rounded text-sm sm:text-base">{selectedStudent.address}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Edit Student
            </DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const updatedData = {
                  name: formData.get("name"),
                  email: formData.get("email"),
                  mobile: formData.get("mobile"),
                  parentName: formData.get("parentName"),
                  address: formData.get("address"),
                }
                handleUpdateStudent(updatedData)
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name" className="text-sm sm:text-base">Full Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    defaultValue={selectedStudent.name}
                    className="border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-rollNo" className="text-sm sm:text-base">Roll Number</Label>
                  <Input 
                    id="edit-rollNo" 
                    defaultValue={selectedStudent.rollNo} 
                    disabled 
                    className="bg-gray-100 text-sm sm:text-base" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email" className="text-sm sm:text-base">Email</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    defaultValue={selectedStudent.email}
                    className="border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-mobile" className="text-sm sm:text-base">Mobile</Label>
                  <Input
                    id="edit-mobile"
                    name="mobile"
                    defaultValue={selectedStudent.mobile}
                    className="border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-parentName" className="text-sm sm:text-base">Parent Name</Label>
                  <Input
                    id="edit-parentName"
                    name="parentName"
                    defaultValue={selectedStudent.parentName}
                    className="border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="edit-address" className="text-sm sm:text-base">Address</Label>
                  <Input
                    id="edit-address"
                    name="address"
                    defaultValue={selectedStudent.address}
                    className="border-2 focus:border-blue-400 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditDialogOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Update Student
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl text-red-600">Confirm Delete</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Are you sure you want to delete {selectedStudent?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Delete Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}