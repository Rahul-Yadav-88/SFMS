"use client"

import { useState } from "react"
import AdminDashboard from "./components/dashboards/AdminDashboard"
import AccountantDashboard from "./components/dashboards/AccountantDashboard"
import StudentDashboard from "./components/dashboards/StudentDashboard"
import Sidebar from "../app/layout/Sidebar"
import Navbar from "../app/layout/Navbar"
import StudentManagement from "./components/students/StudentManagement"
import FeeStructureManagement from "./components/fees/FeeStructureManagement"
import FeeCollection from "./components/fees/FeeCollection"
import PaymentHistory from "./components/payments/paymentHistory"
import FeeDues from "./components/fees/FeesDues"

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [userRole, setUserRole] = useState("admin")

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        if (userRole === "admin") return <AdminDashboard />
        if (userRole === "accountant") return <AccountantDashboard />
        return <StudentDashboard />
      case "students":
        return <StudentManagement />
      case "fee-structures":
        return <FeeStructureManagement />
      case "fee-collection":
        return <FeeCollection />
      case "payment-history":
        return <PaymentHistory />
      case "dues":
        return <FeeDues />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar userRole={userRole} setUserRole={setUserRole} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="animate-in fade-in-50 duration-500">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
