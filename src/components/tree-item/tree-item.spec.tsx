import { TreeData } from '../../App'
import { TreeItemContext } from '../../context/TreeItemContext'
import { TreeItem } from './index'

import { fireEvent, render } from '@testing-library/react'

const fakeData = {
  "id": "3bfdf6e6-8a30-4bc3-892d-8d5773ee6bf5",
  "name": "Guglielmo Hendrik Antoon",
  "children": {},
}

const checkIsIndeterminate = vi.fn().mockResolvedValueOnce(false)
const handleAddItems = vi.fn()
const loadItemsToStorage = vi.fn()
const saveInStorage = vi.fn()

describe('Tree item', () => {
  beforeEach(() => {
    checkIsIndeterminate.mockClear()
    handleAddItems.mockClear()
  })

  it('should be render items tree', () => {
    const treeItems = {}

    const wrapper = render(
      <TreeItemContext.Provider value={{ checkIsIndeterminate, handleAddItems, loadItemsToStorage, saveInStorage , treeItems }}>
        <TreeItem 
          treeData={fakeData}
          treeParentData={{} as TreeData}
        />
      </TreeItemContext.Provider>
    )

    expect(wrapper.getAllByTestId('check-box')).toHaveLength(1)
  })

  it('should be called toggle item when click', () => {
    const treeItems = {}

    const wrapper = render(
      <TreeItemContext.Provider value={{ checkIsIndeterminate, handleAddItems, loadItemsToStorage, saveInStorage , treeItems }}>
        <TreeItem 
          treeData={fakeData}
          treeParentData={{} as TreeData}
        />
      </TreeItemContext.Provider>
    )

    const firstElement = wrapper.getByTestId('check-box')

    expect(firstElement).toHaveTextContent('Guglielmo Hendrik Antoon')

    fireEvent.click(firstElement)

    expect(handleAddItems).toHaveBeenCalledWith(fakeData, expect.any(Boolean), undefined)
  })

  it('should be called checkIsIndeterminate', () => {
    const treeItems = {}

    const wrapper = render(
      <TreeItemContext.Provider value={{ checkIsIndeterminate, handleAddItems, loadItemsToStorage, saveInStorage , treeItems }}>
        <TreeItem 
          treeData={fakeData}
          treeParentData={{} as TreeData}
        />
      </TreeItemContext.Provider>
    )

    expect(checkIsIndeterminate).toHaveBeenCalled();

    const element = wrapper.getByTestId('check-box')

    expect(element).toBeInTheDocument()
  })

  it('should be called checkIsIndeterminate', () => {
    const treeItems = {}

    const wrapper = render(
      <TreeItemContext.Provider value={{ checkIsIndeterminate, handleAddItems, loadItemsToStorage, saveInStorage , treeItems }}>
        <TreeItem 
          treeData={fakeData}
          treeParentData={{} as TreeData}
        />
      </TreeItemContext.Provider>
    )

    expect(checkIsIndeterminate).toHaveBeenCalled();

    const element = wrapper.getByTestId('check-box')

    expect(element).toBeInTheDocument()
  })
})
