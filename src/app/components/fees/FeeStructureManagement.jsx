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
import { Plus, Edit, Trash2, Copy, FileText, Sparkles, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function FeeStructureManagement() {
  const [isVisible, setIsVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [tableVisible, setTableVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)
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
    const tableTimer = setTimeout(() => setTableVisible(true), 400)
    const cardsTimer = setTimeout(() => setCardsVisible(true), 600)

    return () => {
      clearTimeout(headerTimer)
      clearTimeout(tableTimer)
      clearTimeout(cardsTimer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const [feeHeads, setFeeHeads] = useState([
    { name: "Tuition Fee", amount: "" },
    { name: "Transport Fee", amount: "" },
  ])

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedStructure, setSelectedStructure] = useState(null)
  const [feeStructures, setFeeStructures] = useState([
    {
      id: 1,
      name: "Class 10 - Science Stream",
      class: "10-A",
      term: "Monthly",
      totalAmount: 10500,
      feeHeads: [
        { name: "Tuition Fee", amount: 8000 },
        { name: "Transport Fee", amount: 2000 },
        { name: "Library Fee", amount: 500 },
      ],
      studentsAssigned: 45,
      status: "Active",
    },
    {
      id: 2,
      name: "Class 9 - Commerce Stream",
      class: "9-B",
      term: "Monthly",
      totalAmount: 9000,
      feeHeads: [
        { name: "Tuition Fee", amount: 7000 },
        { name: "Transport Fee", amount: 2000 },
      ],
      studentsAssigned: 38,
      status: "Active",
    },
    {
      id: 3,
      name: "Class 8 - General",
      class: "8-A",
      term: "Quarterly",
      totalAmount: 24000,
      feeHeads: [
        { name: "Tuition Fee", amount: 20000 },
        { name: "Activity Fee", amount: 4000 },
      ],
      studentsAssigned: 52,
      status: "Active",
    },
  ])

  const addFeeHead = () => {
    setFeeHeads([...feeHeads, { name: "", amount: "" }])
  }

  const removeFeeHead = (index) => {
    setFeeHeads(feeHeads.filter((_, i) => i !== index))
  }

  const updateFeeHead = (index, field, value) => {
    const updated = feeHeads.map((head, i) => (i === index ? { ...head, [field]: value } : head))
    setFeeHeads(updated)
  }

  const handleEditStructure = (structure) => {
    setSelectedStructure(structure)
    setFeeHeads(structure.feeHeads.map(head => ({ ...head, amount: head.amount.toString() })))
    setEditDialogOpen(true)
  }

  const handleCopyStructure = (structure) => {
    const newStructure = {
      ...structure,
      id: Date.now(),
      name: `${structure.name} (Copy)`,
      studentsAssigned: 0,
    }
    setFeeStructures([...feeStructures, newStructure])
  }

  const handleDeleteStructure = (structure) => {
    setSelectedStructure(structure)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setFeeStructures(feeStructures.filter((s) => s.id !== selectedStructure.id))
    setDeleteDialogOpen(false)
    setSelectedStructure(null)
  }

  const handleUpdateStructure = (updatedData) => {
    const totalAmount = updatedData.feeHeads.reduce((sum, head) => sum + (Number.parseInt(head.amount) || 0), 0)
    
    setFeeStructures(feeStructures.map((s) => 
      s.id === selectedStructure.id 
        ? { 
            ...s, 
            ...updatedData,
            totalAmount,
            feeHeads: updatedData.feeHeads
          } 
        : s
    ))
    setEditDialogOpen(false)
    setSelectedStructure(null)
    // Reset fee heads to default for new creation
    setFeeHeads([{ name: "Tuition Fee", amount: "" }, { name: "Transport Fee", amount: "" }])
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
          <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Fee Structure Management
            </h2>
            <p className="text-gray-600 flex items-center space-x-1 text-sm sm:text-base">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
              <span>Create and manage fee structures for different classes</span>
            </p>
          </div>
        </div>
        <div className="transform transition-all duration-1000 ease-out">
          <Dialog>
  <DialogTrigger asChild>
    <Button className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
      <Plus className="mr-2 h-4 w-4" />
      Create Fee Structure
    </Button>
  </DialogTrigger>
  <DialogContent className="
    w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto 
    bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl
    sm:rounded-lg
  ">
    <DialogHeader className="pb-4 sm:pb-6">
      <DialogTitle className="text-xl sm:text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent text-center sm:text-left">
        Create New Fee Structure
      </DialogTitle>
      <DialogDescription className="text-center sm:text-left">
        Define fee structure for a class with multiple fee heads.
      </DialogDescription>
    </DialogHeader>
    
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const totalAmount = feeHeads.reduce((sum, head) => sum + (Number.parseInt(head.amount) || 0), 0)
        
        const newStructure = {
          id: Date.now(),
          name: formData.get("structureName"),
          class: formData.get("class"),
          term: formData.get("term"),
          totalAmount: totalAmount,
          feeHeads: feeHeads.map(head => ({
            name: head.name,
            amount: Number.parseInt(head.amount) || 0
          })),
          studentsAssigned: 0,
          status: "Active",
        }
        setFeeStructures([...feeStructures, newStructure])
        e.target.reset()
        // Reset fee heads to default
        setFeeHeads([{ name: "Tuition Fee", amount: "" }, { name: "Transport Fee", amount: "" }])
      }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label htmlFor="structureName" className="text-sm font-medium">
            Structure Name *
          </Label>
          <Input
            id="structureName"
            name="structureName"
            placeholder="e.g., Class 10 - Science Stream"
            className="w-full border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="class" className="text-sm font-medium">
            Class *
          </Label>
          <Select name="class" required>
            <SelectTrigger className="w-full border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base">
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="term" className="text-sm font-medium">
          Term *
        </Label>
        <Select name="term" required>
          <SelectTrigger className="w-full border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base">
            <SelectValue placeholder="Select term" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="Monthly">Monthly</SelectItem>
            <SelectItem value="Quarterly">Quarterly</SelectItem>
            <SelectItem value="Yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <Label className="text-sm font-medium">Fee Heads *</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeeHead}
            className="hover:bg-green-50 hover:border-green-300 transition-all duration-300 hover:scale-105 bg-transparent text-xs sm:text-sm w-full sm:w-auto"
          >
            <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Add Fee Head
          </Button>
        </div>

        <div className="space-y-3">
          {feeHeads.map((head, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-end"
            >
              <div className="flex-1 w-full">
                <Label className="text-xs sm:text-sm">Fee Head Name *</Label>
                <Input
                  placeholder="e.g., Tuition Fee"
                  value={head.name}
                  onChange={(e) => updateFeeHead(index, "name", e.target.value)}
                  className="w-full border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base"
                  required
                />
              </div>
              <div className="flex-1 w-full">
                <Label className="text-xs sm:text-sm">Amount (₹) *</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={head.amount}
                  onChange={(e) => updateFeeHead(index, "amount", e.target.value)}
                  className="w-full border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base"
                  required
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeFeeHead(index)}
                disabled={feeHeads.length === 1}
                className="hover:bg-red-50 hover:border-red-300 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700 text-sm sm:text-base">Total Amount:</span>
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              ₹{feeHeads.reduce((sum, head) => sum + (Number.parseInt(head.amount) || 0), 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // Reset form when canceling
            setFeeHeads([{ name: "Tuition Fee", amount: "" }, { name: "Transport Fee", amount: "" }])
          }}
          className="w-full sm:w-auto order-2 sm:order-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 order-1 sm:order-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Fee Structure
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
        </div>
      </div>

      {/* Enhanced Fee Structures Table with animation */}
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
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Fee Structures ({feeStructures.length})</span>
              </div>
            </CardTitle>
            <CardDescription>Manage fee structures for different classes</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              {isMobile ? (
                // Mobile Cards View
                <div className="space-y-4 p-4">
                  {feeStructures.map((structure, index) => (
                    <Card key={structure.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-800 text-sm">{structure.name}</h3>
                            <p className="text-xs text-gray-500">
                              Class {structure.class} • {structure.term}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditStructure(structure)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCopyStructure(structure)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteStructure(structure)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                          <div>
                            <p className="text-gray-500">Total Amount</p>
                            <p className="font-bold text-green-600 text-sm">
                              ₹{structure.totalAmount.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Students</p>
                            <p className="font-medium">{structure.studentsAssigned}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-500">Status</p>
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                              {structure.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {structure.feeHeads.slice(0, 2).map((head, headIndex) => (
                            <div key={headIndex} className="flex justify-between text-xs">
                              <span className="text-gray-600">{head.name}</span>
                              <span className="font-medium">₹{head.amount.toLocaleString()}</span>
                            </div>
                          ))}
                          {structure.feeHeads.length > 2 && (
                            <p className="text-xs text-gray-500 text-center">
                              +{structure.feeHeads.length - 2} more fee heads
                            </p>
                          )}
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
                      <TableHead className="font-semibold">Structure Name</TableHead>
                      <TableHead className="font-semibold">Class</TableHead>
                      <TableHead className="font-semibold">Term</TableHead>
                      <TableHead className="font-semibold">Total Amount</TableHead>
                      <TableHead className="font-semibold">Students Assigned</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feeStructures.map((structure, index) => (
                      <TableRow
                        key={structure.id}
                        className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300"
                      >
                        <TableCell className="font-medium">{structure.name}</TableCell>
                        <TableCell className="font-medium text-blue-600">{structure.class}</TableCell>
                        <TableCell>{structure.term}</TableCell>
                        <TableCell className="font-bold text-green-600">
                          ₹{structure.totalAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>{structure.studentsAssigned}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            {structure.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditStructure(structure)}
                              className="hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopyStructure(structure)}
                              className="hover:bg-green-100 hover:text-green-600 transition-all duration-300"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteStructure(structure)}
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

      {/* Enhanced Fee Structure Details Cards with staggered animation */}
      <div className={`
        grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 transform transition-all duration-1000 ease-out
        ${cardsVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
        }
      `}>
        {feeStructures.map((structure, index) => (
          <Card
            key={structure.id}
            className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
          >
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <CardTitle className="text-base sm:text-lg bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {structure.name}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Class {structure.class} • {structure.term}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  {structure.feeHeads.map((head, headIndex) => (
                    <div
                      key={headIndex}
                      className="flex justify-between text-xs sm:text-sm p-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-green-50 hover:to-blue-50 transition-all duration-300"
                    >
                      <span className="font-medium">{head.name}</span>
                      <span className="font-bold text-green-600">₹{head.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-base sm:text-lg">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      ₹{structure.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 flex items-center justify-center p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <span>{structure.studentsAssigned} students assigned</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Fee Structure Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Edit Fee Structure
            </DialogTitle>
            <DialogDescription>Update the fee structure details and fee heads.</DialogDescription>
          </DialogHeader>
          {selectedStructure && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const updatedData = {
                  name: formData.get("edit-structureName"),
                  class: formData.get("edit-class"),
                  term: formData.get("edit-term"),
                  feeHeads: feeHeads.map(head => ({
                    name: head.name,
                    amount: Number.parseInt(head.amount) || 0
                  }))
                }
                handleUpdateStructure(updatedData)
              }}
            >
              <div className="space-y-4 sm:space-y-6 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-structureName" className="text-sm sm:text-base">Structure Name</Label>
                    <Input
                      id="edit-structureName"
                      name="edit-structureName"
                      defaultValue={selectedStructure.name}
                      className="border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-class" className="text-sm sm:text-base">Class</Label>
                    <Select name="edit-class" defaultValue={selectedStructure.class}>
                      <SelectTrigger className="border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base">
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
                </div>

                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">Term</Label>
                  <Select name="edit-term" defaultValue={selectedStructure.term}>
                    <SelectTrigger className="border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base">
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <Label className="text-sm sm:text-base">Fee Heads</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addFeeHead}
                      className="hover:bg-green-50 hover:border-green-300 transition-all duration-300 hover:scale-105 bg-transparent text-xs sm:text-sm"
                    >
                      <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Add Fee Head
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {feeHeads.map((head, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0 items-end"
                      >
                        <div className="flex-1 w-full">
                          <Label className="text-xs sm:text-sm">Fee Head Name</Label>
                          <Input
                            placeholder="e.g., Tuition Fee"
                            value={head.name}
                            onChange={(e) => updateFeeHead(index, "name", e.target.value)}
                            className="border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base"
                          />
                        </div>
                        <div className="flex-1 w-full">
                          <Label className="text-xs sm:text-sm">Amount (₹)</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={head.amount}
                            onChange={(e) => updateFeeHead(index, "amount", e.target.value)}
                            className="border-2 focus:border-green-400 transition-all duration-300 text-sm sm:text-base"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeeHead(index)}
                          disabled={feeHeads.length === 1}
                          className="hover:bg-red-50 hover:border-red-300 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 text-sm sm:text-base">Total Amount:</span>
                      <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        ₹{feeHeads.reduce((sum, head) => sum + (Number.parseInt(head.amount) || 0), 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
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
                  className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Update Fee Structure
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
              Are you sure you want to delete "{selectedStructure?.name}"? This will affect{" "}
              {selectedStructure?.studentsAssigned} students.
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
              Delete Structure
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}