import { Accordion } from './index'

import { fireEvent, render } from '@testing-library/react'

describe('Accordion', () => {
  it('should be change status accordion when click', () => {
    const onCheckElement = vi.fn()

    const wrapper = render(
      <Accordion 
        children='item-1' 
        expanded={false} 
        checkBoxContent={<></>}
        onChangeExpanded={onCheckElement}
        visibilityExpandIcon={true}
      />
    )

    expect(wrapper.getByTestId('accordion-button')).toBeInTheDocument()

    fireEvent.click(wrapper.getByTestId('accordion-button'));
    expect(onCheckElement).toHaveBeenCalledWith(true)
  })

  it('should be not visible icon expand when not have children', () => {
    const onCheckElement = vi.fn()

    const wrapper = render(
      <Accordion 
        children='item-1' 
        expanded={false} 
        checkBoxContent={<></>}
        onChangeExpanded={onCheckElement}
        visibilityExpandIcon={false}
      />
    )

    expect(wrapper.getByTestId('accordion-button')).not.toBeVisible()
  })
})