import {CartForm} from '@shopify/hydrogen';

export default function UpdateCartItemsButton({lines}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={
        {lines}
      }
    >
      <button>
        Update cart
      </button>
    </CartForm>
  );
}
