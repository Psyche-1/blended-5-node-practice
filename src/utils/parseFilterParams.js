const parseCategory = (category) => {
    const isString = typeof category === 'string';
    if (!isString) return;
    const isCategory = (category) => ['books', 'electronics', 'clothing', 'other'].includes(category);
  
    if (isCategory(category)) return category;
  };
  
  const parseNumber = (number) => {
    const isString = typeof number === 'string';
    if (!isString) return;
  
    const parsedNumber = parseInt(number);
    if (Number.isNaN(parsedNumber)) {
      return;
    }
  
    return parsedNumber;
  };

export const parseFilterParams = (query) =>{
    const {category, maxPrice, minPrice} = query;
    const parsedMaxPrice = parseNumber(maxPrice);
    const parsedMinPrice = parseNumber(minPrice);
    const parsedCategory = parseCategory(category);
    return {maxPrice:parsedMaxPrice,
        minPrice: parsedMinPrice,
        category: parsedCategory
    };
};