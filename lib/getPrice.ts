// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculatePrice = (product: any, vendor: any): number | undefined => {
  if (product && vendor) {
    const goldKarat = product.goldKarat;
    const goldKaratPrice = vendor.goldCarats[goldKarat];
    const silverKaratPrice = vendor.silverCarats["925 Sterlings"];
    const weight = product.weight;
    const basePrice = product.basePrice;
    let price;

    if (product.pricingMethod === "Automatic (Daily Price)") {
      if (product.metal === "Gold" || product.metal === "Diamond") {
        price = (goldKaratPrice * weight) + basePrice;
      } else if (product.metal === "Silver") {
        price = (silverKaratPrice * weight) + basePrice;
      }
    } else {
      price = product.price;
    }

    return Math.round(price);
  }
}

export default calculatePrice;