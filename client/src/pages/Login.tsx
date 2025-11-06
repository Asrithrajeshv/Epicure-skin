import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/useToast"
import {
  LogIn,
  User,
  Stethoscope
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

type LoginForm = {
  email: string
  password: string
  role: 'patient' | 'doctor'
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'patient' | 'doctor'>('patient')
  const { toast } = useToast()
  const { login, authStrategy, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue } = useForm<LoginForm>()

  // Update role when tab changes
  useEffect(() => {
    setValue('role', activeTab)
  }, [activeTab, setValue])

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true)
      const role = activeTab
      await login(data.email, data.password);
      
      // Check user role after login
      const userData = JSON.parse(localStorage.getItem("userData") || '{}')
      if (userData.role !== role) {
        // Reset auth if role doesn't match
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("userData")
        toast({
          variant: "destructive",
          title: "Error",
          description: `This account is registered as ${userData.role}. Please use the ${userData.role} login.`,
        })
        return
      }

      toast({
        title: "Success",
        description: "Logged in successfully",
      })
      
      // Navigate based on role
      if (role === 'doctor') {
        navigate("/doctor/dashboard")
      } else {
        navigate("/")
      }
    } catch (error: any) {
      console.error("Login error:", error.message)
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  // Don't show loading - authStrategy is already initialized to 'email'
  // if (authStrategy === null) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
  //       <Card className="w-full max-w-md">
  //         <CardContent className="flex items-center justify-center py-8">
  //           <div className="text-muted-foreground">Loading...</div>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'patient' | 'doctor')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="patient" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Patient
              </TabsTrigger>
              <TabsTrigger value="doctor" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                Doctor
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="patient">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...register("role")} value="patient" />
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", { required: true })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    "Loading..."
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In as Patient
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="doctor">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...register("role")} value="doctor" />
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", { required: true })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    "Loading..."
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In as Doctor
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            className="text-sm text-muted-foreground"
            onClick={() => navigate("/register")}
          >
            Don't have an account? Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}