"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Bell, User, Settings, ChevronDown, Zap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

export default function Navbar({ userRole, setUserRole }) {
  const [open, setOpen] = useState(false) // controls dropdown visibility

  const getUserName = () => {
    switch (userRole) {
      case "admin":
        return "Admin User"
      case "accountant":
        return "John Accountant"
      case "student":
        return "Jane Student"
      default:
        return "User"
    }
  }

  const getUserEmail = () => {
    switch (userRole) {
      case "admin":
        return "admin@school.com"
      case "accountant":
        return "accountant@school.com"
      case "student":
        return "student@school.com"
      default:
        return "user@school.com"
    }
  }

  const getInitials = () => {
    return getUserName()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-200/50 px-4 sm:px-6 py-3 relative overflow-hidden z-40">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/3 via-purple-600/3 to-indigo-600/3 animate-pulse"></div>

      <div className="flex items-center justify-between relative">
        {/* Left Section */}
        <div className="animate-in slide-in-from-left duration-500 md:ml-0 ml-12">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
            Welcome back,
            <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}{getUserName().split(" ")[0]}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 flex items-center space-x-1 mt-1">
            <Zap className="h-3 w-3 text-yellow-500 animate-pulse flex-shrink-0" />
            <span className="hidden xs:inline">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="xs:hidden">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-3 animate-in slide-in-from-right duration-500">
          {/* Role Switcher - Desktop Only */}
          <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1.5 rounded-lg border border-blue-100/50 shadow-sm">
            <span className="text-xs font-medium text-gray-700">Role:</span>
            <Select value={userRole} onValueChange={setUserRole}>
              <SelectTrigger className="w-28 border-0 bg-white/80 shadow-sm hover:shadow-md transition-all duration-300 h-8 text-xs">
                <SelectValue />
                <ChevronDown className="h-3 w-3 ml-1 text-gray-500" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl min-w-[120px]">
                <SelectItem value="admin" className="hover:bg-blue-50 transition-colors duration-200 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    <span>Admin</span>
                  </div>
                </SelectItem>
                <SelectItem value="accountant" className="hover:bg-green-50 transition-colors duration-200 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Accountant</span>
                  </div>
                </SelectItem>
                <SelectItem value="student" className="hover:bg-purple-50 transition-colors duration-200 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span>Student</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notification Bell */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 hover:bg-blue-50 hover:scale-110 transition-all duration-300 group border border-transparent hover:border-blue-200"
          >
            <Bell className="h-4 w-4 group-hover:text-blue-600 transition-colors duration-300" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:scale-110 transition-all duration-300 group border border-transparent hover:border-blue-200"
              >
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9 ring-1 ring-blue-200 group-hover:ring-blue-400 transition-all duration-300">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xs sm:text-sm">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{getUserName()}</p>
                  <p className="text-xs leading-none text-muted-foreground">{getUserEmail()}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* When clicked, dropdown closes immediately */}
              <DropdownMenuItem
                className="hover:bg-blue-50 transition-colors duration-200 p-2"
                onSelect={(e) => {
                  e.preventDefault()
                  setOpen(false)
                }}
              >
                <User className="mr-2 h-4 w-4" />
                <span className="text-sm">Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="hover:bg-purple-50 transition-colors duration-200 p-2"
                onSelect={(e) => {
                  e.preventDefault()
                  setOpen(false)
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span className="text-sm">Settings</span>
              </DropdownMenuItem>

              {/* Mobile Role Switcher */}
              <div className="block md:hidden px-3 py-2 border-t border-gray-100 mt-1">
                <span className="text-sm font-medium text-gray-700 mb-2 block">Switch Role:</span>
                <Select
                  value={userRole}
                  onValueChange={(value) => {
                    setUserRole(value)
                    setOpen(false)
                  }}
                >
                  <SelectTrigger className="w-full border border-gray-200 bg-white/80 shadow-sm hover:shadow-md transition-all duration-300 h-8">
                    <SelectValue />
                    <ChevronDown className="h-3 w-3 ml-1 text-gray-500" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl">
                    <SelectItem value="admin" className="hover:bg-blue-50 transition-colors duration-200 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        <span>Admin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="accountant" className="hover:bg-green-50 transition-colors duration-200 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Accountant</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="student" className="hover:bg-purple-50 transition-colors duration-200 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        <span>Student</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
