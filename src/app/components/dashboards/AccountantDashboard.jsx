"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DollarSign, AlertCircle, CheckCircle, Clock, Search, Sparkles, ArrowUp, TrendingUp } from "lucide-react"

export default function AccountantDashboard() {
  const stats = [
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
      value: "8",
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
      title: "Outstanding Dues",
      value: "₹2,34,000",
      description: "Total pending",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      change: "-8%",
      trend: "down",
    },
  ]

  const pendingPayments = [
    { id: 1, student: "Alice Brown", class: "10-A", amount: "₹5,000", mode: "UPI", time: "2 hours ago" },
    { id: 2, student: "Bob Wilson", class: "9-B", amount: "₹4,500", mode: "Bank Transfer", time: "3 hours ago" },
    { id: 3, student: "Carol Davis", class: "11-C", amount: "₹5,500", mode: "Cash", time: "4 hours ago" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center animate-in slide-in-from-top duration-500">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Accountant Dashboard
          </h2>
          <p className="text-gray-600 mt-2 flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-green-500 animate-pulse" />
            <span>Monitor and verify financial transactions</span>
          </p>
        </div>
        <div className="flex space-x-2">
          <div className="relative animate-in slide-in-from-right duration-500">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search payments..."
              className="pl-10 w-64 border-2 focus:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group animate-in slide-in-from-bottom "
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
              ></div>
              <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
                <div
                  className={`w-full h-full bg-gradient-to-br ${stat.color} opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500`}
                ></div>
              </div>

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Pending Verifications */}
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all  animate-in slide-in-from-left duration-700">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg animate-pulse">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <span>Pending Verifications</span>
            </CardTitle>
            <CardDescription>Payments awaiting verification</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {pendingPayments.map((payment, index) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 hover:from-yellow-100 hover:to-orange-100 border-b border-yellow-200 last:border-b-0 transition-all  group animate-in slide-in-from-right duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                      {payment.student
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{payment.student}</p>
                      <p className="text-sm text-gray-500">
                        Class {payment.class} • {payment.mode}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-600">{payment.amount}</p>
                    <p className="text-sm text-gray-500 mb-2">{payment.time}</p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                      >
                        Verify
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Quick Actions */}
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all  animate-in slide-in-from-right duration-700">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Common accounting tasks</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
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
                    className={`w-full justify-start h-14 bg-gradient-to-r ${action.bgColor} hover:${action.bgColor} border-0 shadow-md hover:shadow-xl transition-all  hover:scale-105 group animate-in slide-in-from-bottom duration-500`}
                    style={{ animationDelay: `${index * 150}ms` }}
                    variant="outline"
                  >
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${action.color} mr-3 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">{action.label}</span>
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
