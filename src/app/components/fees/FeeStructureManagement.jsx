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
import { Plus, Edit, Trash2, Copy, FileText, Sparkles } from "lucide-react"

export default function FeeStructureManagement() {
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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center animate-in slide-in-from-top duration-500">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Fee Structure Management
            </h2>
            <p className="text-gray-600 flex items-center space-x-1">
              <Sparkles className="h-4 w-4 text-green-500 animate-pulse" />
              <span>Create and manage fee structures for different classes</span>
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in slide-in-from-right duration-500">
              <Plus className="mr-2 h-4 w-4" />
              Create Fee Structure
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Create New Fee Structure
              </DialogTitle>
              <DialogDescription>Define fee structure for a class with multiple fee heads.</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="structureName">Structure Name</Label>
                  <Input
                    id="structureName"
                    placeholder="e.g., Class 10 - Science Stream"
                    className="border-2 focus:border-green-400 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select>
                    <SelectTrigger className="border-2 focus:border-green-400 transition-all duration-300">
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
                <Label>Term</Label>
                <Select>
                  <SelectTrigger className="border-2 focus:border-green-400 transition-all duration-300">
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
                <div className="flex justify-between items-center">
                  <Label>Fee Heads</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeeHead}
                    className="hover:bg-green-50 hover:border-green-300 transition-all duration-300 hover:scale-105 bg-transparent"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Fee Head
                  </Button>
                </div>

                <div className="space-y-3">
                  {feeHeads.map((head, index) => (
                    <div
                      key={index}
                      className="flex space-x-3 items-end animate-in slide-in-from-left duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-1">
                        <Label>Fee Head Name</Label>
                        <Input
                          placeholder="e.g., Tuition Fee"
                          value={head.name}
                          onChange={(e) => updateFeeHead(index, "name", e.target.value)}
                          className="border-2 focus:border-green-400 transition-all duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <Label>Amount (₹)</Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={head.amount}
                          onChange={(e) => updateFeeHead(index, "amount", e.target.value)}
                          className="border-2 focus:border-green-400 transition-all duration-300"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeeHead(index)}
                        disabled={feeHeads.length === 1}
                        className="hover:bg-red-50 hover:border-red-300 transition-all duration-300 hover:scale-105"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total Amount:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      ₹{feeHeads.reduce((sum, head) => sum + (Number.parseInt(head.amount) || 0), 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Create Fee Structure
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Enhanced Fee Structures Table */}
      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom duration-700">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span>Fee Structures ({feeStructures.length})</span>
            </div>
          </CardTitle>
          <CardDescription>Manage fee structures for different classes</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
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
                    className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300 animate-in slide-in-from-left duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TableCell className="font-medium">{structure.name}</TableCell>
                    <TableCell className="font-medium text-blue-600">{structure.class}</TableCell>
                    <TableCell>{structure.term}</TableCell>
                    <TableCell className="font-bold text-green-600">
                      ₹{structure.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>{structure.studentsAssigned}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 border-green-200 animate-pulse">
                        {structure.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditStructure(structure)}
                          className="hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyStructure(structure)}
                          className="hover:bg-green-100 hover:text-green-600 transition-all duration-300 hover:scale-110"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStructure(structure)}
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

      {/* Enhanced Fee Structure Details Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {feeStructures.map((structure, index) => (
          <Card
            key={structure.id}
            className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-in zoom-in duration-500"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <CardTitle className="text-lg bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {structure.name}
              </CardTitle>
              <CardDescription>
                Class {structure.class} • {structure.term}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  {structure.feeHeads.map((head, headIndex) => (
                    <div
                      key={headIndex}
                      className="flex justify-between text-sm p-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-green-50 hover:to-blue-50 transition-all duration-300"
                    >
                      <span className="font-medium">{head.name}</span>
                      <span className="font-bold text-green-600">₹{head.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      ₹{structure.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 flex items-center justify-center p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <span>{structure.studentsAssigned} students assigned</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-red-600">Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedStructure?.name}"? This will affect{" "}
              {selectedStructure?.studentsAssigned} students.
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
              Delete Structure
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
