# lucide-taro-react

Lucide icons for Taro React - 为 Taro 框架封装的 Lucide 图标库

## Installation

```bash
# 使用 npm
npm install lucide-taro-react

# 使用 yarn
yarn add lucide-taro-react

# 使用 pnpm
pnpm add lucide-taro-react
```

## Usage

### 基础使用

```tsx
import { Search, Heart, User } from 'lucide-taro-react'

function MyComponent() {
  return (
    <View className="flex gap-2">
      <Search size={32} color="#f00" />
      <Heart size={28} color="#0f0" />
      <User size={24} color="#00f" />
    </View>
  )
}
```

### 使用 Tailwind 类名

支持从 Tailwind 类名中自动提取尺寸和颜色：

```tsx
import { Search } from 'lucide-taro-react'

// 使用 Tailwind 类名
<Search className="w-8 h-8 text-red-500" />

// 混合使用 props 和 className
<Search size={32} className="text-blue-600" />
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

## Props

所有图标组件都支持以下属性：

- `size?: number | string` - 图标大小（默认: 24），支持数字或字符串（如 "24px"）
- `color?: string` - 图标颜色（默认: 'currentColor'）
- `className?: string` - 支持 Tailwind 类名，会自动提取 `w-*`、`h-*`、`text-*` 等类名
- `style?: any` - 自定义样式
- 其他 `@tarojs/components/Image` 支持的属性

### Tailwind 类名支持

- **尺寸**: `w-4`, `w-5`, `w-6`, `w-8`, `w-10`, `w-12`, `w-16` 或对应的 `h-*` 类名
- **颜色**: `text-*` 类名（如 `text-red-500`, `text-blue-600`, `text-primary-500` 等）

## 动态访问图标

如果需要使用未导出的图标，可以使用 `Icons` 对象：

```tsx
import { Icons } from 'lucide-taro-react'

<Icons.Trash size={24} />
<Icons.Edit className="w-6 h-6 text-blue-500" />
```

## Development

### 构建

```bash
npm run build
```

### 本地测试

```bash
# 在包目录
npm link

# 在你的 Taro 项目中
npm link lucide-taro-react
```

## 发布

查看 [PUBLISH.md](./PUBLISH.md) 了解详细的发布步骤。

## 更多信息

- 查看 [USAGE.md](./USAGE.md) 了解详细的使用指南
- 查看 [lucide-static](https://www.npmjs.com/package/lucide-static) 了解可用的图标列表

## License

MIT

