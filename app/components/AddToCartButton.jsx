import {CartForm} from '@shopify/hydrogen';

export default function AddToCartButton({lines}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesAdd}
      inputs={
        {lines}
      }
    >
      <button>
        Add to cart
      </button>
    </CartForm>
  );
}
