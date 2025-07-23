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
import { Plus, Search, Edit, Trash2, Eye, Users, Sparkles, Filter } from "lucide-react"

export default function StudentManagement() {
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
      return <Badge className="bg-green-100 text-green-800 border-green-200 animate-pulse">Paid</Badge>
    } else if (status === "Partial") {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 animate-pulse">Partial</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800 border-red-200 animate-pulse">Due</Badge>
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center animate-in slide-in-from-top duration-500">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Student Management
            </h2>
            <p className="text-gray-600 flex items-center space-x-1">
              <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
              <span>Manage student information and records</span>
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in slide-in-from-right duration-500">
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Add New Student
              </DialogTitle>
              <DialogDescription>Enter student details to add them to the system.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  className="border-2 focus:border-blue-400 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNo">Roll Number</Label>
                <Input
                  id="rollNo"
                  placeholder="Enter roll number"
                  className="border-2 focus:border-blue-400 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select>
                  <SelectTrigger className="border-2 focus:border-blue-400 transition-all duration-300">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8-A">8-A</SelectItem>
                    <SelectItem value="9-A">9-A</SelectItem>
                    <SelectItem value="9-B">9-B</SelectItem>
                    <SelectItem value="10-A">10-A</SelectItem>
                    <SelectItem value="10-B">10-B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Select>
                  <SelectTrigger className="border-2 focus:border-blue-400 transition-all duration-300">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Commerce">Commerce</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className="border-2 focus:border-blue-400 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  placeholder="Enter mobile number"
                  className="border-2 focus:border-blue-400 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent Name</Label>
                <Input
                  id="parentName"
                  placeholder="Enter parent name"
                  className="border-2 focus:border-blue-400 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter address"
                  className="border-2 focus:border-blue-400 transition-all duration-300"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Add Student
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Enhanced Filters */}
      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-left duration-500">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Filter className="h-4 w-4 text-white" />
            </div>
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or roll number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 focus:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </div>
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-48 border-2 focus:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md">
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

      {/* Enhanced Students Table */}
      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom duration-700">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <Users className="h-4 w-4 text-white" />
              </div>
              <span>Students ({filteredStudents.length})</span>
            </div>
            <div className="text-sm text-gray-500">Total: {students.length} students</div>
          </CardTitle>
          <CardDescription>Manage student information and fee assignments</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
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
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 animate-in slide-in-from-left duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TableCell className="font-medium text-blue-600">{student.rollNo}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
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
                          className="hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditStudent(student)}
                          className="hover:bg-green-100 hover:text-green-600 transition-all duration-300 hover:scale-110"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStudent(student)}
                          className="hover:bg-red-100 hover:text-red-600 transition-all duration-300 hover:scale-110"
                        >
                          <Trash2 className="h-4 w-4" />
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

      {/* View Student Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Student Details
            </DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label className="font-semibold">Full Name</Label>
                <p className="p-2 bg-gray-50 rounded">{selectedStudent.name}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Roll Number</Label>
                <p className="p-2 bg-gray-50 rounded">{selectedStudent.rollNo}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Class</Label>
                <p className="p-2 bg-gray-50 rounded">{selectedStudent.class}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Section</Label>
                <p className="p-2 bg-gray-50 rounded">{selectedStudent.section}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Email</Label>
                <p className="p-2 bg-gray-50 rounded">{selectedStudent.email}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Mobile</Label>
                <p className="p-2 bg-gray-50 rounded">{selectedStudent.mobile}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Parent Name</Label>
                <p className="p-2 bg-gray-50 rounded">{selectedStudent.parentName}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Fee Status</Label>
                <p className="p-2 bg-gray-50 rounded">{selectedStudent.feeStatus}</p>
              </div>
              <div className="col-span-2 space-y-2">
                <Label className="font-semibold">Address</Label>
                <p className="p-2 bg-gray-50 rounded">{selectedStudent.address}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    defaultValue={selectedStudent.name}
                    className="border-2 focus:border-blue-400 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-rollNo">Roll Number</Label>
                  <Input id="edit-rollNo" defaultValue={selectedStudent.rollNo} disabled className="bg-gray-100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    defaultValue={selectedStudent.email}
                    className="border-2 focus:border-blue-400 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-mobile">Mobile</Label>
                  <Input
                    id="edit-mobile"
                    name="mobile"
                    defaultValue={selectedStudent.mobile}
                    className="border-2 focus:border-blue-400 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-parentName">Parent Name</Label>
                  <Input
                    id="edit-parentName"
                    name="parentName"
                    defaultValue={selectedStudent.parentName}
                    className="border-2 focus:border-blue-400 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Address</Label>
                  <Input
                    id="edit-address"
                    name="address"
                    defaultValue={selectedStudent.address}
                    className="border-2 focus:border-blue-400 transition-all duration-300"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
        <DialogContent className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-red-600">Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedStudent?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Delete Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
