export interface DynamicObject {
  [key: string]: any;
  date: number| string;
}

export interface IelasticQuery{
  uuid: string;
  index: string;
}

export const excludingList = ['agent'] //排除不需要被放到grid的欄位

/**
 * 過濾字串陣列，排除指定的字串元素，並返回新的過濾後陣列。
 *
 * @param arr - 原始的字串陣列。
 * @param excludingList - 需要排除的字串元素組成的陣列。
 * @returns 過濾後的新陣列，不包含指定的字串元素。
 */
export const filterExcludingList = (arr: string[], excludingList: string[]): string[] => {
    // 如果原始陣列為空，直接返回原始陣列，無需進行過濾。
    if (arr.length === 0) return arr;
    // filter 方法會遍歷陣列中的每個元素，傳遞給回調函數 (item) => excludingList.indexOf(item) === -1。
    return arr.filter((item) => excludingList.indexOf(item) === -1);
  };
  


/**
 * 過濾物件的屬性，排除指定的屬性名稱，並返回新的過濾後物件。
 *
 * @param obj - 原始的物件。
 * @param excludingList - 需要排除的屬性名稱組成的陣列。
 * @returns 過濾後的新物件，不包含指定的屬性名稱。
 */
export const filterExcludingObj = (obj: DynamicObject, excludingList: string[]): DynamicObject => {
    // 創建一個新的物件 filteredObj 用於存儲過濾後的屬性。
    // 初始時，給 filteredObj 一個名為 'date' 的屬性，值為 0，這是為了保留一個固定屬性，以便確保 filteredObj 為非空物件。
    const filteredObj: DynamicObject = {
      date: 0,
    };
  
    // 使用 for...in 迴圈遍歷原始物件 obj 的每個屬性名稱。
    // 在每次迴圈中，使用 obj.hasOwnProperty(key) 檢查該屬性是否為 obj 自身的屬性，而不是繼承自原型鏈。
    // 同時檢查該屬性名稱是否在 excludingList 中，如果不在，則將該屬性及其值存入 filteredObj 中。
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && !excludingList.includes(key)) {
        filteredObj[key] = obj[key];
      }
    }
    return filteredObj;
  };
  