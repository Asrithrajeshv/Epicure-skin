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
  UserPlus,
  User,
  Stethoscope
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

type RegisterForm = {
  email: string
  password: string
  role: 'patient' | 'doctor'
}

export function Register() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'patient' | 'doctor'>('patient')
  const { toast } = useToast()
  const { register: registerUser, authStrategy } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue } = useForm<RegisterForm>()

  // Update role when tab changes
  useEffect(() => {
    setValue('role', activeTab)
  }, [activeTab, setValue])

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

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true)
      const role = activeTab
      await registerUser(data.email, data.password, role);
      toast({
        title: "Success",
        description: "Account created successfully",
      })
      navigate("/login")
    } catch (error: any) {
      console.log("Register error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
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
                    placeholder="Choose a password"
                    {...register("password", { required: true })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    "Loading..."
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Patient Account
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
                    placeholder="Choose a password"
                    {...register("password", { required: true })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    "Loading..."
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Doctor Account
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
            onClick={() => navigate("/login")}
          >
            Already have an account? Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
