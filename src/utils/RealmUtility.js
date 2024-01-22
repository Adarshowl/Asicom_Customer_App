import Realm from 'realm';
import {
  APP_IMAGE,
  SAVE_IMAGE,
  SAVE_PRODUCT_FAVORITE,
  SAVE_PRODUCT_TO_CART,
  SaveAppImageSchema,
  SaveCartSchema,
  SaveImageSchema,
  SaveOfferSchema,
} from '../realm/allSchemas';

const saveProductToCartOptions = {
  path: 'saveCartTable',
  schema: [SaveCartSchema],
  schemaVersion: 0,
};

const saveFavoriteProductDatabaseOptions = {
  path: 'saveProductTable',
  schema: [SaveOfferSchema],
  schemaVersion: 0,
};

const saveImageDatabaseOptions = {
  path: 'saveImageTable',
  schema: [SaveImageSchema],
  schemaVersion: 0,
};
const saveAppImageDatabaseOptions = {
  path: 'saveAppImageTable',
  schema: [SaveAppImageSchema],
  schemaVersion: 0,
};
// realm setup to save product to cart

export let doSaveOfferOfflineRealm = (id, image, name, amount) => {
  try {
    Realm.open(saveFavoriteProductDatabaseOptions).then(realm => {
      let obj = {
        id: id + '',
        listID: id + '',
        _id: id + '',
        thumbnail_image: image + '',
        product_name: name + '',
        amount: amount + '',
        fav: true,
      };
      realm.write(() => {
        realm.create(SAVE_PRODUCT_FAVORITE, obj);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// export let doSaveProductCart = (
//   id,
//   amount,
//   quantity,
//   color,
//   size,
//   name,
//   image,
// ) => {
//   try {
//     Realm.open(saveProductToCartOptions).then(realm => {
//       let obj = {
//         id: id + '',
//         listID: id + '',
//         amount: amount,
//         quantity: quantity,
//         color: color,
//         size: size,
//         product_name: name,
//         thumbnail_image: image,
//       };
//       console.log('saving to realm-> ', obj);
//       realm.write(() => {
//         realm.create(SAVE_PRODUCT_TO_CART, obj);
//       });
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const doSaveImage = (id, image) => {
  try {
    const primaryKey = `${id}`;
    Realm.open(saveImageDatabaseOptions).then(realm => {
      realm.write(() => {
        // Query the existing object by id
        const existingProduct = realm
          .objects(SAVE_IMAGE)
          .filtered(`id == '${primaryKey}'`);

        if (existingProduct.length > 0) {
          // ShowConsoleLogMessage('if part' + existingProduct[0]);
          // If the object exists, update the quantity and amount
          existingProduct[0].image = image;
        } else {
          // ShowConsoleLogMessage('else part');

          // If the object does not exist, create a new one
          const newObj = {
            id: primaryKey + '',
            image: image,
          };
          realm.create(SAVE_IMAGE, newObj);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const doSaveAppImage = (id, image) => {
  try {
    const primaryKey = `${id}`;
    Realm.open(saveAppImageDatabaseOptions).then(realm => {
      realm.write(() => {
        // Query the existing object by id
        const existingProduct = realm
          .objects(APP_IMAGE)
          .filtered(`id == '${primaryKey}'`);

        if (existingProduct.length > 0) {
          existingProduct[0].image = image;
        } else {
          const newObj = {
            id: primaryKey + '',
            image: image,
          };
          realm.create(APP_IMAGE, newObj);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const doSaveProductCart = (
  id,
  originalAmount,
  originalQuantity,
  amount,
  quantity,
  color,
  size,
  sold,
  name,
  image,
) => {
  try {
    const primaryKey = `${id}-${size}-${color}`;
    Realm.open(saveProductToCartOptions).then(realm => {
      realm.write(() => {
        // Query the existing object by id
        const existingProduct = realm
          .objects(SAVE_PRODUCT_TO_CART)
          .filtered(`id == '${primaryKey}'`);

        if (existingProduct.length > 0) {
          // If the object exists, update the quantity and amount
          if (
            existingProduct[0].color == color &&
            existingProduct[0].size == size
          ) {
            // ShowConsoleLogMessage('if part');
            existingProduct[0].quantity = quantity;
            existingProduct[0].amount = amount;
          } else {
            // ShowConsoleLogMessage('else part -> ' + primaryKey);
            // If the size or color is different, create a new entry
            const newObj = {
              id: primaryKey + '',
              listID: id + '',
              amount: amount,
              quantity: quantity,
              original_quantity: originalQuantity,
              color: color,
              size: size,
              product_name: name,
              thumbnail_image: image,
              original_amount: originalAmount,
              sold: sold,
            };
            realm.create(SAVE_PRODUCT_TO_CART, newObj);
          }
        } else {
          // ShowConsoleLogMessage('else part outer -> ' + primaryKey);
          // If the object does not exist, create a new one
          const newObj = {
            id: primaryKey + '',
            listID: id + '',
            amount: amount,
            quantity: quantity,
            color: color,
            size: size,
            original_quantity: originalQuantity,
            product_name: name,
            thumbnail_image: image,
            original_amount: originalAmount,
            sold: sold,
          };
          realm.create(SAVE_PRODUCT_TO_CART, newObj);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export let getSavedFavoriteProduct = async () => {
  let product = [];
  await Realm.open(saveFavoriteProductDatabaseOptions).then(realm => {
    if (realm.objects(SAVE_PRODUCT_FAVORITE).length > 0) {
      product = realm.objects(SAVE_PRODUCT_FAVORITE);
    }
  });
  return product;
};

export let getSavedImage = async () => {
  let product = [];
  await Realm.open(saveImageDatabaseOptions).then(realm => {
    if (realm.objects(SAVE_IMAGE).length > 0) {
      product = realm.objects(SAVE_IMAGE);
    }
  });
  return product;
};
export let getSavedAppImage = async () => {
  let product = [];
  await Realm.open(saveAppImageDatabaseOptions).then(realm => {
    if (realm.objects(APP_IMAGE).length > 0) {
      product = realm.objects(APP_IMAGE);
    }
  });
  return product;
};

export let getSavedCartProduct = async () => {
  let product = [];
  await Realm.open(saveProductToCartOptions).then(realm => {
    if (realm.objects(SAVE_PRODUCT_TO_CART).length > 0) {
      product = realm.objects(SAVE_PRODUCT_TO_CART);
    }
  });
  return product;
};

export let removeFromFavoriteRealm = id => {
  try {
    Realm.open(saveFavoriteProductDatabaseOptions).then(realm => {
      realm.write(() => {
        var obj = realm
          .objects(SAVE_PRODUCT_FAVORITE)
          .filtered(`listID == '${id}'`);

        if (obj?.length > 0) {
          realm.delete(obj[0]);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export let removeFromCartRealm = id => {
  try {
    Realm.open(saveProductToCartOptions).then(realm => {
      realm.write(() => {
        var obj = realm
          .objects(SAVE_PRODUCT_TO_CART)
          .filtered(`listID == '${id}'`);
        if (obj?.length > 0) {
          realm.delete(obj[0]);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export let isProductSavedFavorite = async id => {
  let isAvail = false;
  await Realm.open(saveFavoriteProductDatabaseOptions).then(realm => {
    realm.write(() => {
      var obj = realm
        .objects(SAVE_PRODUCT_FAVORITE)
        .filtered(`listID == '${id}'`);
      if (obj?.length == 1) {
        isAvail = true;
      } else {
        isAvail = false;
      }
    });
  });
  return isAvail;
};

export let getSavedFavoriteProductString = async () => {
  let ids = '';
  await Realm.open(saveFavoriteProductDatabaseOptions).then(realm => {
    if (realm.objects(SAVE_PRODUCT_FAVORITE).length > 0) {
      realm.objects(SAVE_PRODUCT_FAVORITE).forEach((obj, index) => {
        if (index == 0) {
          ids = '' + obj?.listID;
        } else {
          ids = ids + ',' + obj?.listID;
        }
      });
    }
  });

  return ids;
};

export let clearRealm = async () => {
  // ShowConsoleLogMessage('hu');
  await Realm.open(saveProductToCartOptions).then(realm => {
    realm.write(() => {
      const allEvents = realm.objects(SAVE_PRODUCT_TO_CART);
      realm.delete(allEvents);
    });
  });

  await Realm.open(saveFavoriteProductDatabaseOptions).then(realm => {
    realm.write(() => {
      const allEvents = realm.objects(SAVE_PRODUCT_FAVORITE);
      realm.delete(allEvents);
    });
  });
  await Realm.open(saveImageDatabaseOptions).then(realm => {
    realm.write(() => {
      const allEvents = realm.objects(SAVE_IMAGE);
      realm.delete(allEvents);
    });
  });
};
