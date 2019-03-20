# use-doc-title

A pretty custom hooks for css variable and react.

- type-safe!

# Install

```cmd
// npm
npm install --save use-document-title

// yarn
yarn add use-document-title
```

# Usage

```tsx
import React, { FC } from 'react'
import { useDocumentTitle } from 'use-doc-title'

export const Component: FC = () => {
  const [foo, setFoo] = useDocumentTitle('foo')
}
```

# Lincense

[MIT](./LICENSE)
