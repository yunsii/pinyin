import React from 'react'
import { useBoolean } from 'ahooks'
import {
  CloudDownload,
  CloudUpload,
  Github,
  Loader2,
  Redo2,
  Settings,
} from 'lucide-react'

import useProfileBin from './useProfileBin'

import type { HanziCharConfig } from '@/core'

import { CharType, Registry } from '@/core'
import { Hanzi } from '@/components'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function Hero() {
  const schemaOptions = Registry.schema.getSchemaOptions()
  const textOptions = Registry.text.getTextOptions()

  const {
    bin,
    onChangeBin,
    detailLoading,
    updateLoading,
    onSignIn,
    onUpload,
    onDownload,
    onClearCache,
  } = useProfileBin({
    schemaType: schemaOptions[0]?.type,
    textKey: textOptions[0]?.key,
    inputTextIndex: 0,
    inputPinyin: '',
  })
  const [syncOpen, setSyncOpen] = React.useState(false)
  const [settingsOpen, { toggle: toggleSettings, set: setSettingsOpen }] =
    useBoolean(false)
  const [binIdInput, setBinIdInput] = React.useState('')
  const [nameInput, setNameInput] = React.useState('')

  const textConfig = React.useMemo(() => {
    return Registry.text.getTextConfig(bin?.textKey || textOptions[0]?.key)
  }, [bin.textKey, textOptions])

  const currentCharConfig = React.useMemo(() => {
    if (!textConfig) {
      return null
    }
    const text = textConfig.text.filter((item) => item.type === CharType.Hanzi)
    const index = bin.inputTextIndex! % text.length
    return text?.[index] as HanziCharConfig
  }, [textConfig, bin.inputTextIndex])

  const currentPinyin = React.useMemo(() => {
    if (currentCharConfig) {
      return Registry.schema.getPinyin(
        bin.schemaType!,
        currentCharConfig.quanpin,
      )
    }
  }, [currentCharConfig, bin.schemaType])

  React.useEffect(() => {
    if (bin.inputPinyin && bin.inputPinyin === currentPinyin) {
      // Functional update: otherwise inputPinyin clearing can race with index bump.
      onChangeBin({
        inputTextIndex: (bin?.inputTextIndex || 0) + 1,
        inputPinyin: '',
      })
    }
  }, [currentPinyin, bin.inputPinyin, bin.inputTextIndex, onChangeBin])

  return (
    <TooltipProvider delay={500}>
      <div className='relative flex h-svh w-svw items-center justify-center bg-muted/40'>
        <div>
          <Hanzi
            zi={currentCharConfig?.char}
            original={currentPinyin}
            modified={bin.inputPinyin}
            onChange={(value) => onChangeBin({ inputPinyin: value })}
          />
        </div>

        <div className='absolute bottom-1.5 mt-3 flex items-center gap-1'>
          <Button
            variant='outline'
            size='icon'
            onClick={() => toggleSettings()}
            aria-label='打开控制面板'
          >
            <Settings className='size-4' />
          </Button>

          <Select
            value={bin.schemaType}
            items={schemaOptions.map((item) => ({
              value: item.type,
              label: item.displayName,
            }))}
            onValueChange={(value) => {
              if (value != null) {
                onChangeBin({ schemaType: String(value) })
              }
            }}
          >
            <SelectTrigger className='w-[100px]'>
              <SelectValue placeholder='拼写方案' />
            </SelectTrigger>
            <SelectContent>
              {schemaOptions.map((item) => (
                <SelectItem key={item.type} value={item.type}>
                  {item.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={bin.textKey}
            items={textOptions.map((item) => ({
              value: item.key,
              label: item.title,
            }))}
            onValueChange={(value) => {
              if (value != null) {
                onChangeBin({ inputTextIndex: 0, textKey: String(value) })
              }
            }}
          >
            <SelectTrigger className='w-[130px]'>
              <SelectValue placeholder='拼写模板' />
            </SelectTrigger>
            <SelectContent>
              {textOptions.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => {
                    onChangeBin({ inputTextIndex: 0, inputPinyin: '' })
                  }}
                  aria-label='重置本地输入状态'
                />
              }
            >
              <Redo2 className='size-4' />
            </TooltipTrigger>
            <TooltipContent>重置本地输入状态</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => {
                    onUpload(() => setSyncOpen(true))
                  }}
                  aria-label='同步本地状态到云端'
                />
              }
            >
              {updateLoading ? (
                <Loader2 className='size-4 animate-spin' />
              ) : (
                <CloudUpload className='size-4' />
              )}
            </TooltipTrigger>
            <TooltipContent>同步本地状态到云端</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => {
                    onDownload(() => setSyncOpen(true))
                  }}
                  aria-label='同步云端状态到本地'
                />
              }
            >
              {detailLoading ? (
                <Loader2 className='size-4 animate-spin' />
              ) : (
                <CloudDownload className='size-4' />
              )}
            </TooltipTrigger>
            <TooltipContent>同步云端状态到本地</TooltipContent>
          </Tooltip>
        </div>

        <Dialog open={syncOpen} onOpenChange={setSyncOpen}>
          <DialogContent className='sm:max-w-md' showCloseButton>
            <DialogHeader>
              <DialogTitle>同步设置</DialogTitle>
              <DialogDescription>
                同步功能基于{' '}
                <a
                  href='https://jsonbin.io/'
                  target='_blank'
                  rel='noreferrer'
                  className='underline underline-offset-3 hover:text-foreground'
                >
                  JSONbin
                </a>{' '}
                实现，可自行注册并创建一个公开 BIN 后将 BIN_ID
                贴于此处确认即可。
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='bin-id'>BIN_ID</FieldLabel>
                <Input
                  id='bin-id'
                  value={binIdInput}
                  onChange={(event) => setBinIdInput(event.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor='user-name'>用户名</FieldLabel>
                <Input
                  id='user-name'
                  value={nameInput}
                  onChange={(event) => setNameInput(event.target.value)}
                />
                <FieldDescription>
                  默认使用云端用户名，如果没有用户名会根据当前值创建。
                </FieldDescription>
              </Field>
            </FieldGroup>
            <p className='text-sm text-muted-foreground'>
              当然，如果不想注册的话，可邮箱
              <a
                href='mailto:yuns.xie@qq.com'
                className='underline underline-offset-3 hover:text-foreground'
              >
                联系我
              </a>
              为你创建 BIN_ID。
            </p>
            <DialogFooter>
              <Button variant='outline' onClick={() => setSyncOpen(false)}>
                取消
              </Button>
              <Button
                onClick={() => {
                  onSignIn(binIdInput, nameInput, {
                    onOk: () => setSyncOpen(false),
                  })
                }}
              >
                确定
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
          <SheetContent side='right' className='w-[360px] sm:max-w-[360px]'>
            <SheetHeader>
              <SheetTitle>控制面板</SheetTitle>
            </SheetHeader>
            <div className='flex flex-1 flex-col gap-4 px-4'>
              <button
                type='button'
                className='rounded-lg border px-3 py-2 text-left text-sm hover:bg-muted'
                onClick={onClearCache}
              >
                清除缓存
              </button>
            </div>
            <div className='p-4'>
              <a
                href='https://github.com/yunsii/pinyin'
                target='_blank'
                rel='noreferrer'
                className={cn(buttonVariants(), 'w-full')}
              >
                <Github className='size-4' />
                Star
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  )
}
