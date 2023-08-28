export type Order = 'asc' | 'desc';

export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export const getComparator = <Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): ((a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };
  
export const stableSort = <T>(array: readonly T[], comparator: (a: T, b: T) => number) => {
    return ((): T[] => {
      const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
          return order;
        }
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    })();
};

export const fixPaginationNumber = (totalPages: number) => {
  if (totalPages === 0) {
    return [5];
  } else if (totalPages > 100) {
    return [5, 25, 50, 100];
  } else if (totalPages > 50) {
    return [5, 25, 50];
  } else if (totalPages > 20) {
    return [5, 25];
  } else {
    return [5];
  }
};