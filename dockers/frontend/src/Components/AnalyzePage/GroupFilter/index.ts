

import { Order } from "../../../constant/TableInterfaces";


// 打勾邏輯
/**
 * 檢查兩個陣列是否包含相同的元素。
 * 
 * @param arr1 - 第一個陣列，型別為 string[] 或 undefined。
 * @param arr2 - 第二個陣列，型別為 string[] 或 undefined。
 * @returns 兩個陣列是否包含相同的元素，若其中任一陣列為 undefined 或是陣列長度為 0，則返回 false。
 */
export const areArraysIncluding = (arr1: readonly string[] | undefined, arr2: readonly string[] | undefined): boolean => { 
    // 如果其中任一陣列為 undefined，則返回 false
    if (!arr1 || !arr2) return false;

    // 如果其中任一陣列的長度為 0，則返回 false
    if (arr1.length === 0 || arr2.length === 0) return false;

    // 建立 arr1 的 Set，方便後續使用 Set 的快速查找功能
    const arr1Set = new Set(arr1);

    // 檢查 arr2 的每個元素是否都存在於 arr1 的 Set 中
    for (const elem of arr2) {
        // 如果 arr1 的 Set 中不包含 arr2 的元素，則返回 false
        if (!arr1Set.has(elem)) {
            return false;
        }
    }
    // 若全部元素都存在於 arr1 的 Set 中，則返回 true
    return true;
};


// 減號邏輯
/**
 * 檢查第一個陣列是否至少包含第二個陣列的一個元素（包含性檢查）。
 * 
 * @param arr1 - 第一個陣列，型別為 string[] 或 undefined。
 * @param arr2 - 第二個陣列，型別為 string[] 或 undefined。
 * @param status - 狀態，若為 true，則直接返回 false。
 * @returns 第一個陣列是否至少包含第二個陣列的一個元素，若其中任一陣列為 undefined、status 為 true 或是任一陣列長度為 0，則返回 false。
 */
export const areArraysHasOne = (arr1: readonly string[] | undefined, arr2: readonly string[] | undefined, status: boolean): boolean => {
    // 如果其中任一陣列為 undefined，則返回 false
    if (!arr1 || !arr2) return false;

    // 如果 status 為 true，則直接返回 false
    if (status) return false;

    // 如果其中任一陣列的長度為 0，則返回 false
    if (arr1.length === 0 || arr2.length === 0) return false;

    // 使用 some 方法檢查 arr2 的每個元素是否至少有一個存在於 arr1 中
    return arr2.some((item) => arr1.includes(item));
};


/**
 * 帶有泛型的比較函式，用於降冪排序。根據指定的鍵對兩個物件進行比較。
 * 
 * @param a - 第一個物件，型別為 T。
 * @param b - 第二個物件，型別為 T。
 * @param orderBy - 用於比較的鍵，必須是 T 的屬性。
 * @returns 若 b[orderBy] 小於 a[orderBy]，則返回 -1；若 b[orderBy] 大於 a[orderBy]，則返回 1；否則返回 0。
 */
export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

/**
 * 建立用於排序的比較函式。根據指定的排序順序和鍵創建比較函式。
 * 
 * @param order - 排序順序，可為 'asc' 或 'desc'。
 * @param orderBy - 用於排序的鍵，必須是物件屬性。
 * @returns 用於排序的比較函式。
 */

export function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}



/**
 * 使用穩定排序算法對陣列進行排序。
 * 
 * @param array - 要排序的陣列，型別為 readonly T[]。
 * @param comparator - 用於比較元素的函式，返回值應該是數字，指定排序順序。
 * @returns 排序後的陣列。
 */
export const stableSort = <T>(array: readonly T[], comparator: (a: T, b: T) => number) => {
    // 將陣列元素和索引組成二元組，以便在排序後恢復原始順序
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);

    // 使用穩定排序算法對穩定化陣列進行排序
    stabilizedThis.sort((a, b) => {
        // 用指定的比較函式比較元素 a 和 b 的順序
        const order = comparator(a[0], b[0]);

        // 如果比較結果不等於 0，返回比較結果作為排序順序
        if (order !== 0) {
            return order;
        }

        // 如果比較結果等於 0，則按照穩定化索引排序以保持原始順序
        return a[1] - b[1];
    });

    // 將排序後的二元組轉換回原始元素陣列，獲得排序後的陣列
    return stabilizedThis.map((el) => el[0]);
};

