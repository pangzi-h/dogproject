import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { Eye, EyeOff, PawPrint } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { AnimatedCharacters } from '@/components/ui/animated-characters'

const loginSchema = z.object({
  username: z.string().min(1, '请输入账号'),
  password: z.string().min(6, '密码不能少于 6 位'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  const password = form.watch('password')

  const onSubmit = useCallback((values: LoginFormValues) => {
    // TODO: 调用管理员登录接口 POST /api/v1/admin/auth/login
    console.log('管理员登录', values)
  }, [])

  return (
    <div className="min-h-screen max-h-screen overflow-hidden grid lg:grid-cols-2">
      {/* Left — animated characters */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary/70 via-primary to-primary/90 p-12 text-primary-foreground overflow-hidden">
        {/* Logo */}
        <div className="relative z-20 flex items-center gap-2 text-lg font-semibold">
          <PawPrint className="h-7 w-7" />
          <span>边牧寄养 · 管理后台</span>
        </div>

        {/* Characters */}
        <div className="relative z-20 flex items-end justify-center h-[460px]">
          <AnimatedCharacters
            isTyping={isTyping}
            showPassword={showPassword}
            passwordLength={password.length}
          />
        </div>

        {/* Slogan */}
        <div className="relative z-20">
          <p className="text-sm opacity-70">专业宠物寄养管理平台，让每一次寄养都有迹可循。</p>
        </div>

        {/* Decorative blobs */}
        <div className="absolute inset-0 bg-[size:20px_20px] bg-grid-white/5" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Right — login form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-10 text-lg font-semibold">
            <PawPrint className="h-6 w-6 text-primary" />
            <span>边牧寄养 · 管理后台</span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-1">欢迎回来</h1>
            <p className="text-sm text-muted-foreground">请输入您的管理员账号</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <Label>账号</Label>
                    <FormControl>
                      <Input
                        placeholder="请输入手机号或账号"
                        autoComplete="username"
                        className="h-12"
                        {...field}
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => { setIsTyping(false); field.onBlur() }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>密码</Label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="请输入密码"
                          autoComplete="current-password"
                          className="h-12 pr-10"
                          {...field}
                          onFocus={() => setIsTyping(true)}
                          onBlur={() => { setIsTyping(false); field.onBlur() }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-base mt-2"
                disabled={form.formState.isSubmitting}
              >
                登 录
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
