
//objPropName - какое-нибудь свойство объекта
export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(item => {
        if (item[objPropName] === itemId) {
            return { ...item, ...newObjProps } //Изменять state нельзя, возвращаем копию
        }
        return item;
    })
}