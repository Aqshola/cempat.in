export default function useRemoveDuplicate(
  old_array: any[],
  new_array: any[],
  duplicate_identifier: string
) {
  const oldArray = [...old_array].map((item) => item[duplicate_identifier]);
  const newArray = [...new_array];
  const pushedArray = [...old_array];

  newArray.forEach((el) => {
    if (!oldArray.includes(el.id)) {
      pushedArray.push(el);
    }
  });

  return pushedArray;
}
