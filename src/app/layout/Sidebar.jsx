"use client"

import { Button } from "../components/ui/button"
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  History,
  AlertCircle,
  GraduationCap,
  Sparkles,
} from "lucide-react"

export default function Sidebar({ currentPage, setCurrentPage, userRole }) {
  const getMenuItems = () => {
    const baseItems = [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }]

    if (userRole === "admin") {
      return [
        ...baseItems,
        { id: "students", label: "Students", icon: Users },
        { id: "fee-structures", label: "Fee Structures", icon: FileText },
        { id: "fee-collection", label: "Fee Collection", icon: CreditCard },
        { id: "payment-history", label: "Payment History", icon: History },
        { id: "dues", label: "Fee Dues", icon: AlertCircle },
      ]
    }

    if (userRole === "accountant") {
      return [
        ...baseItems,
        { id: "fee-collection", label: "Fee Collection", icon: CreditCard },
        { id: "payment-history", label: "Payment History", icon: History },
        { id: "dues", label: "Fee Dues", icon: AlertCircle },
      ]
    }

    return [
      ...baseItems,
      { id: "payment-history", label: "My Payments", icon: History },
      { id: "dues", label: "My Dues", icon: AlertCircle },
    ]
  }

  const menuItems = getMenuItems()

  return (
    <div className="bg-white/80 backdrop-blur-xl w-64 shadow-2xl border-r border-white/20 flex flex-col relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-indigo-600/5 animate-pulse"></div>

      <div className="relative p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SFMS
            </h2>
            <div className="flex items-center space-x-1">
              <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" />
              <p className="text-sm text-gray-600 capitalize font-medium">{userRole}</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 relative">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <li
                key={item.id}
                className="animate-in slide-in-from-left duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start group relative overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transform scale-105"
                      : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 hover:scale-105"
                  }`}
                  onClick={() => setCurrentPage(item.id)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Icon
                    className={`mr-3 h-5 w-5 transition-all duration-300 ${isActive ? "animate-pulse" : "group-hover:scale-110"}`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-ping"></div>}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Decorative bottom gradient */}
      <div className="h-20 bg-gradient-to-t from-blue-600/10 to-transparent"></div>
    </div>
  )
}
