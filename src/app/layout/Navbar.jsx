"use client"

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

  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 px-6 py-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 animate-pulse"></div>

      <div className="flex items-center justify-between relative">
        <div className="animate-in slide-in-from-left duration-500">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Welcome back, {getUserName()}
          </h1>
          <p className="text-sm text-gray-500 flex items-center space-x-1">
            <Zap className="h-3 w-3 text-yellow-500 animate-pulse" />
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </div>

        <div className="flex items-center space-x-4 animate-in slide-in-from-right duration-500">
          <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl border border-blue-100 shadow-sm">
            <span className="text-sm font-medium text-gray-700">Switch Role:</span>
            <Select value={userRole} onValueChange={setUserRole}>
              <SelectTrigger className="w-32 border-0 bg-white/80 shadow-sm hover:shadow-md transition-all duration-300">
                <SelectValue />
                <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl">
                <SelectItem value="admin" className="hover:bg-blue-50 transition-colors duration-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Admin</span>
                  </div>
                </SelectItem>
                <SelectItem value="accountant" className="hover:bg-green-50 transition-colors duration-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Accountant</span>
                  </div>
                </SelectItem>
                <SelectItem value="student" className="hover:bg-purple-50 transition-colors duration-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Student</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-blue-50 hover:scale-110 transition-all duration-300 group"
          >
            <Bell className="h-5 w-5 group-hover:text-blue-600 transition-colors duration-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:scale-110 transition-all duration-300 group"
              >
                <Avatar className="h-10 w-10 ring-2 ring-blue-200 group-hover:ring-blue-400 transition-all duration-300">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                    {getUserName()
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{getUserName()}</p>
                  <p className="text-xs leading-none text-muted-foreground">{getUserEmail()}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-blue-50 transition-colors duration-200">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-purple-50 transition-colors duration-200">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
