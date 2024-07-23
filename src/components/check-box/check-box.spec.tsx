import { Checkbox } from './index'

import { fireEvent, render } from '@testing-library/react'

describe('check box', () => {
  it('should be checked the item', () => {
    const onCheckElement = vi.fn()

    const wrapper = render(
      <Checkbox 
        children='item-1' 
        isChecked={true} 
        onCheckElement={onCheckElement} 
        isIndeterminate={false}
      />
    )

    expect(wrapper.getByText('item-1')).toBeInTheDocument()
    expect(wrapper.getByText('item-1')).toHaveStyle({ color: '#d1f08a' })
  })

  it('should be change element checkbox state', () => {
    const onCheckElement = vi.fn()

    const wrapper = render(
      <Checkbox 
        children='item-1' 
        isChecked={false} 
        onCheckElement={onCheckElement} 
        isIndeterminate={false}
      />
    )

    fireEvent.click(wrapper.getByTestId('check-box'));

    expect(wrapper.getByTestId('check-box')).toBeInTheDocument()
    expect(onCheckElement).toHaveBeenCalledWith(true, expect.any(Number))
  })

  it('should be indeterminate check box state', () => {
    const onCheckElement = vi.fn()

    const wrapper = render(
      <Checkbox 
        children='item-1' 
        isChecked={false} 
        onCheckElement={onCheckElement} 
        isIndeterminate={true}
      />
    )

    expect(wrapper.getByTestId('check-box-indeterminate')).toBeInTheDocument()
  })
})