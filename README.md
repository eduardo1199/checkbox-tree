# Tree Item

## Projeto voltado para desenvolvimento de uma árvore de seleção. Destinada para vaga de desenvolvedor front-end na Hi Platform.

## Iniciar projeto

primeiramente realize o fork ou clone do repositório, em seguida, realize o comando a seguir:

<aside>
💡 npm install

</aside>

Utilizei npm e a versão do node 20.9.0

## Start App

Para executar o projeto, utilize o comando:

<aside>
💡 npm run dev

</aside>

## Start Test

Os teste foram realizados com vitest, poderá ser executado rodando o comando

<aside>
💡 npm run test

</aside>

## Context

O contexto é formado por um estado para cada nó item que se encontra no estado inicial, guardando basicamente um objeto com chave sendo o ID do item e o valor um booleano.

```jsx
const [treeItems, setTreeItems] = useState<TreeItemType>({});
```

A função saveInStorage é responsável por salvar um elemento no localStorage, ele guarda o ID do elemento.

```jsx
 function saveInStorage(treeItemId: string, checked: boolean) {
    if(checked) {
      window.localStorage.setItem(treeItemId, treeItemId)
    } else {
      window.localStorage.removeItem(treeItemId)
    }
  }
```

A função Toggle é responsável por alterar de forma recursiva todos os elementos filhos do nó marcado anterior ou desmarcar todos os elementos. Ela não é compartilhada pelo contexto, apenas usada como auxiliar para função handleAddItems.

```jsx
 function handleChangeToggleChildren(items: TreeItemType, treeData: TreeData, checked: boolean): TreeItemType {
    if(Object.values(treeData.children).length > 0) {
      Object.entries(treeData.children).forEach(([_, value]) => {
        items[value.id] = checked
        saveInStorage(value.id, checked)

        items = handleChangeToggleChildren(items, value, checked)
      })
    }

    return items
  }
```

A função handleAddItems é usada para atualizar o nó pai e filho com o valor marcado no checkbox.

```jsx
  function handleAddItems(treeData: TreeData, checked: boolean, treeItemIdParent?: string): void {
    setTreeItems((state) => {
      state[treeData.id] = checked
      saveInStorage(treeData.id, checked)

      if(treeItemIdParent) {
        state[treeItemIdParent] = checked
        saveInStorage(treeItemIdParent, checked)
      }

      state = handleChangeToggleChildren(state, treeData, checked)

      return {
        ...state,
      }
    })
  }
```

A função Callback loadItemsToStorage é usada para carregar cada elemento que estava no localStorage para dentro do estado. Essa função é usada para caso aconteça um refresh, ela recuperar os itens da Storage.

```jsx
 const loadItemsToStorage = useCallback((treeItemId: string): void => {
    if(window.localStorage.getItem(treeItemId)) {
      setTreeItems((state) => {
        state[treeItemId] = Boolean(window.localStorage.getItem(treeItemId))
  
        return {
          ...state,
        }
      })
    }
  }, [])
```

A função checkIsIndeterminate vai verificar se existe algum elemento filho na árvore que está indeterminado, fazendo a operação de forma recursiva.

```
 function checkIsIndeterminate(treeData: TreeData[]): boolean {
    const hasChildren = treeData.length > 0;

    const amountChildrenChecked = treeData.reduce((amountChildrenChecked, treeChildren) => {
      if(Boolean(treeItems[treeChildren.id]) === true) {
        amountChildrenChecked++
      }
  
      return amountChildrenChecked
    }, 0)
  
    let isIndeterminate = hasChildren && !!amountChildrenChecked && amountChildrenChecked < treeData.length

    treeData.forEach((item) => {
      if(Object.values(item.children).length > 0) {
        isIndeterminate = isIndeterminate  || checkIsIndeterminate(Object.values(item.children))
      }
    })

    return isIndeterminate
  }
```# Tree Item

## Projeto voltado para desenvolvimento de uma árvore de seleção. Destinada para vaga de desenvolvedor front-end na Hi Platform.

## Iniciar projeto

primeiramente realize o fork ou clone do repositório, em seguida, realize o comando a seguir:

<aside>
💡 npm install

</aside>

Utilizei npm e a versão do node 20.9.0

## Start App

Para executar o projeto, utilize o comando:

<aside>
💡 npm run dev

</aside>

## Start Test

Os teste foram realizados com vitest, poderá ser executado rodando o comando

<aside>
💡 npm run test

</aside>

## Context

O contexto é formado por um estado para cada nó item que se encontra no estado inicial, guardando basicamente um objeto com chave sendo o ID do item e o valor um booleano.

```jsx
const [treeItems, setTreeItems] = useState<TreeItemType>({});
```

A função saveInStorage é responsável por salvar um elemento no localStorage, ele guarda o ID do elemento.

```jsx
 function saveInStorage(treeItemId: string, checked: boolean) {
    if(checked) {
      window.localStorage.setItem(treeItemId, treeItemId)
    } else {
      window.localStorage.removeItem(treeItemId)
    }
  }
```

A função Toggle é responsável por alterar de forma recursiva todos os elementos filhos do nó marcado anterior ou desmarcar todos os elementos. Ela não é compartilhada pelo contexto, apenas usada como auxiliar para função handleAddItems.

```jsx
 function handleChangeToggleChildren(items: TreeItemType, treeData: TreeData, checked: boolean): TreeItemType {
    if(Object.values(treeData.children).length > 0) {
      Object.entries(treeData.children).forEach(([_, value]) => {
        items[value.id] = checked
        saveInStorage(value.id, checked)

        items = handleChangeToggleChildren(items, value, checked)
      })
    }

    return items
  }
```

A função handleAddItems é usada para atualizar o nó pai e filho com o valor marcado no checkbox.

```jsx
  function handleAddItems(treeData: TreeData, checked: boolean, treeItemIdParent?: string): void {
    setTreeItems((state) => {
      state[treeData.id] = checked
      saveInStorage(treeData.id, checked)

      if(treeItemIdParent) {
        state[treeItemIdParent] = checked
        saveInStorage(treeItemIdParent, checked)
      }

      state = handleChangeToggleChildren(state, treeData, checked)

      return {
        ...state,
      }
    })
  }
```

A função Callback loadItemsToStorage é usada para carregar cada elemento que estava no localStorage para dentro do estado. Essa função é usada para caso aconteça um refresh, ela recuperar os itens da Storage.

```jsx
 const loadItemsToStorage = useCallback((treeItemId: string): void => {
    if(window.localStorage.getItem(treeItemId)) {
      setTreeItems((state) => {
        state[treeItemId] = Boolean(window.localStorage.getItem(treeItemId))
  
        return {
          ...state,
        }
      })
    }
  }, [])
```

A função checkIsIndeterminate vai verificar se existe algum elemento filho na árvore que está indeterminado, fazendo a operação de forma recursiva.

```
 function checkIsIndeterminate(treeData: TreeData[]): boolean {
    const hasChildren = treeData.length > 0;

    const amountChildrenChecked = treeData.reduce((amountChildrenChecked, treeChildren) => {
      if(Boolean(treeItems[treeChildren.id]) === true) {
        amountChildrenChecked++
      }
  
      return amountChildrenChecked
    }, 0)
  
    let isIndeterminate = hasChildren && !!amountChildrenChecked && amountChildrenChecked < treeData.length

    treeData.forEach((item) => {
      if(Object.values(item.children).length > 0) {
        isIndeterminate = isIndeterminate  || checkIsIndeterminate(Object.values(item.children))
      }
    })

    return isIndeterminate
  }
```