import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { MessageCircle, PawPrint } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'

const loginSchema = z.object({
  phone: z
    .string()
    .min(1, '请输入手机号')
    .regex(/^1[3-9]\d{9}$/, '请输入有效的手机号'),
  password: z.string().min(6, '密码不能少于 6 位'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [phoneFormVisible, setPhoneFormVisible] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: '', password: '' },
  })

  const onWechatLogin = useCallback(() => {
    if (!agreed) {
      alert('请先阅读并同意服务条款和隐私政策')
      return
    }
    // TODO: 调用微信授权登录接口 POST /api/v1/auth/login
    console.log('微信授权登录')
  }, [agreed])

  const onPhoneLogin = useCallback(
    (values: LoginFormValues) => {
      if (!agreed) {
        alert('请先阅读并同意服务条款和隐私政策')
        return
      }
      // TODO: 调用手机号登录接口
      console.log('手机号登录', values)
    },
    [agreed],
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* 顶部品牌区 */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-8">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <PawPrint className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              边牧寄养
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              专业宠物寄养平台
            </p>
          </div>
        </div>

        {/* 登录操作区 */}
        <div className="w-full max-w-sm space-y-4">
          {/* 微信授权登录 */}
          <Button
            className="w-full h-12 gap-2 bg-[#07c160] hover:bg-[#06ad56] text-white text-base font-medium"
            onClick={onWechatLogin}
          >
            <MessageCircle className="w-5 h-5" />
            微信授权快速登录
          </Button>

          {/* 分隔线 */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">或</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* 手机号登录入口 */}
          {!phoneFormVisible ? (
            <Button
              variant="outline"
              className="w-full h-12 text-base"
              onClick={() => setPhoneFormVisible(true)}
            >
              手机号登录
            </Button>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onPhoneLogin)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="请输入手机号"
                          type="tel"
                          className="h-12 text-base"
                          {...field}
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
                      <FormControl>
                        <Input
                          placeholder="请输入密码"
                          type="password"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-12 text-base"
                  disabled={form.formState.isSubmitting}
                >
                  登 录
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>

      {/* 底部协议 */}
      <div className="px-6 pb-10 flex flex-col items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 rounded accent-primary"
          />
          <span className="text-xs text-muted-foreground">
            已阅读并同意{' '}
            <button
              type="button"
              className={cn('text-primary underline underline-offset-2')}
            >
              《服务条款》
            </button>
            {' 和 '}
            <button
              type="button"
              className={cn('text-primary underline underline-offset-2')}
            >
              《隐私政策》
            </button>
          </span>
        </label>
      </div>
    </div>
  )
}
