import { describe, expect, it } from 'vitest'

import { Registry } from '@/core'
import { type as quanpinType } from '@/core/registers/PinyinSchemaRegister/Quanpin'
import { type as xianHeType } from '@/assets/schemes/XianHe'

// Side-effect registration of shipped shuangpin schemes (including XianHe).
import '@/assets/schemes'

describe('Registry.schema.getPinyin (shipped schemas)', () => {
  it('returns quanpin unchanged under QuanPin schema', () => {
    expect(Registry.schema.getPinyin(quanpinType, 'xian')).toBe('xian')
    expect(Registry.schema.getPinyin(quanpinType, 'di')).toBe('di')
  })

  it('maps xian to xm under XianHe shuangpin', () => {
    expect(Registry.schema.getPinyin(xianHeType, 'xian')).toBe('xm')
  })

  it('maps zero-shengmu ang to ah under XianHe', () => {
    expect(Registry.schema.getPinyin(xianHeType, 'ang')).toBe('ah')
  })
})
