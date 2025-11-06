# 使用指南

## 安装

```bash
npm install lucide-taro-react
# 或
yarn add lucide-taro-react
# 或
pnpm add lucide-taro-react
```

## 基础使用

### 导入图标

```tsx
import { Search, Heart, User } from 'lucide-taro-react'

function MyComponent() {
  return (
    <View>
      <Search size={32} color="#f00" />
      <Heart size={28} color="#0f0" />
      <User size={24} color="#00f" />
    </View>
  )
}
```

### 使用 Props

```tsx
import { Search } from 'lucide-taro-react'

<Search 
  size={32}           // 图标大小（数字或字符串，如 "32px"）
  color="#ff0000"     // 图标颜色
  className="..."     // 支持 Tailwind 类名
  style={{ ... }}     // 自定义样式
/>
```

### 使用 Tailwind 类名

```tsx
import { Search } from 'lucide-taro-react'

// 从类名中自动提取尺寸和颜色
<Search className="w-8 h-8 text-red-500" />

// 混合使用 props 和 className
<Search size={32} className="text-blue-600" />
```

### 动态访问图标

如果需要使用未直接导出的图标：

```tsx
import { Icons } from 'lucide-taro-react'

<Icons.Trash size={24} />
<Icons.Edit className="w-6 h-6 text-blue-500" />
<Icons.ArrowUp size={20} color="#333" />
```

### 自定义创建图标

```tsx
import { createLucideIcon } from 'lucide-taro-react'
import { CustomIcon } from 'lucide-static'

const MyIcon = createLucideIcon(CustomIcon, 'MyIcon')

<MyIcon size={24} color="#000" />
```

### 批量创建图标

```tsx
import { createLucideIcons } from 'lucide-taro-react'
import { Search, Home, User } from 'lucide-static'

const Icons = createLucideIcons({
  Search,
  Home,
  User,
})

<Icons.Search size={24} />
<Icons.Home size={32} color="#ff0000" />
```

## 支持的 Props

所有图标组件都支持以下属性：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `number \| string` | `24` | 图标大小，支持数字或字符串（如 "24px"） |
| `color` | `string` | `'currentColor'` | 图标颜色 |
| `className` | `string` | - | 支持 Tailwind 类名，自动提取 `w-*`、`h-*`、`text-*` 等 |
| `style` | `object` | - | 自定义样式 |
| 其他 | - | - | 支持所有 `@tarojs/components/Image` 的属性 |

## 支持的 Tailwind 类名

### 尺寸类名

- `w-4`, `h-4` → 16px
- `w-5`, `h-5` → 20px
- `w-6`, `h-6` → 24px
- `w-8`, `h-8` → 32px
- `w-10`, `h-10` → 40px
- `w-12`, `h-12` → 48px
- `w-16`, `h-16` → 64px

### 颜色类名

支持所有 Tailwind 默认颜色，例如：
- `text-red-500`, `text-blue-600`, `text-green-400`
- `text-slate-700`, `text-indigo-300`, `text-rose-900`
- `text-primary-500`, `text-success-600` (自定义颜色)

## 完整示例

```tsx
import { View } from '@tarojs/components'
import { Search, Heart, User, Icons } from 'lucide-taro-react'

export default function IconExample() {
  return (
    <View className="p-4">
      {/* 基础使用 */}
      <Search size={24} color="#333" />
      
      {/* Tailwind 类名 */}
      <Heart className="w-8 h-8 text-red-500" />
      
      {/* 混合使用 */}
      <User size={32} className="text-blue-600" />
      
      {/* 动态图标 */}
      <Icons.Trash size={20} color="#ff0000" />
      
      {/* 自定义样式 */}
      <Search 
        size={40}
        style={{ 
          borderRadius: '8px',
          backgroundColor: '#f0f0f0',
          padding: '8px'
        }}
      />
    </View>
  )
}
```

## 注意事项

1. **依赖要求**：确保项目中已安装 `@tarojs/components`、`@tarojs/runtime` 和 `react`
2. **Tree-shaking**：直接导入的图标（如 `import { Search }`）会被 tree-shake，只打包使用的图标
3. **动态图标**：使用 `Icons` 对象访问的图标会在运行时加载，可能略微增加包体积
4. **颜色处理**：如果 SVG 中使用 `currentColor`，会自动替换为指定的颜色值

