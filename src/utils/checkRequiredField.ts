type UserField = {
  name: string,
  price: string,
};

const checkRequiredField = (object: UserField, arrRequireFields: string[]): string | undefined => {
  for (let i = 0; i < arrRequireFields.length; i += 1) {
    const currentField = arrRequireFields[i];
    if (!(currentField in object)) {
      return `"${currentField}" is required`;
    }
  }
};

export default {
  checkRequiredField,
};
