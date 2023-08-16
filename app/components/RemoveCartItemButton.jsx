import {CartForm} from '@shopify/hydrogen';

export default function RemoveCartItemButton({lineIds}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={
        {lineIds}
      }
    >
      <button>
        Remove items
      </button>
    </CartForm>
  );
}
