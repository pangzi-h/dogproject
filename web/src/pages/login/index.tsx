import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { Eye, EyeOff, PawPrint } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
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
import { cn } from '@/lib/utils'

const loginSchema = z.object({
  username: z.string().min(1, '请输入账号'),
  password: z.string().min(6, '密码不能少于 6 位'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  const password = form.watch('password')

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      setIsLoading(true)
      setError('')
      try {
        // TODO: 调用管理员登录接口 POST /api/v1/admin/auth/login
        console.log('管理员登录', values, { remember })
        navigate('/')
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : '账号或密码错误，请重试'
        setError(msg)
      } finally {
        setIsLoading(false)
      }
    },
    [navigate, remember],
  )

  return (
    <div className="min-h-screen max-h-screen overflow-hidden grid lg:grid-cols-2">
      {/* ── Left: animated characters ── */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 p-12 text-white overflow-hidden">
        {/* Logo */}
        <div className="relative z-20 flex items-center gap-2 text-lg font-semibold">
          <div className="bg-white/10 backdrop-blur-sm p-1.5 rounded-lg">
            <PawPrint className="h-5 w-5" />
          </div>
          <span>边牧寄养 · 管理后台</span>
        </div>

        {/* Animated characters */}
        <div className="relative z-20 flex items-end justify-center h-[500px]">
          <AnimatedCharacters
            isTyping={isTyping}
            showPassword={showPassword}
            passwordLength={password.length}
          />
        </div>

        {/* Bottom links */}
        <div className="relative z-20 flex items-center gap-8 text-sm text-gray-200">
          {/* <a href="#" className="hover:text-white transition-colors">隐私政策</a>
          <a href="#" className="hover:text-white transition-colors">服务条款</a> */}
          <a href="#" className="hover:text-white transition-colors">专业宠物寄养管理平台,让每一次寄养都有迹可循</a>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[size:20px_20px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-gray-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-gray-300/20 rounded-full blur-3xl" />
      </div>

      {/* ── Right: login form ── */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-12 text-lg font-semibold">
            <PawPrint className="h-6 w-6 text-primary" />
            <span>边牧寄养 · 管理后台</span>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">欢迎回来！</h1>
            <p className="text-muted-foreground text-sm">请输入您的管理员账号</p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <Label className="text-sm font-medium">账号</Label>
                    <FormControl>
                      <Input
                        placeholder="请输入手机号或账号"
                        autoComplete="username"
                        className="h-12 bg-background border-border/60 focus:border-primary"
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
                  <FormItem className="space-y-2">
                    <Label className="text-sm font-medium">密码</Label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          className="h-12 pr-10 bg-background border-border/60 focus:border-primary"
                          {...field}
                          onFocus={() => setIsTyping(true)}
                          onBlur={() => { setIsTyping(false); field.onBlur() }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword
                            ? <EyeOff className="size-5" />
                            : <Eye className="size-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-sm font-normal text-foreground">记住登录 30 天</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  忘记密码？
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className={cn('w-full h-12 text-base font-medium')}
                disabled={isLoading}
              >
                {isLoading ? '登录中...' : '登 录'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
