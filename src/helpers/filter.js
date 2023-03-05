export const onSort = (filter, todos) => {
  let _todos = todos;

  if (filter === "Terbaru") {
    _todos = todos?.sort((a, b) => b.id - a.id);
  }
  if (filter === "Terlama") {
    _todos = todos?.sort((a, b) => a.id - b.id);
  }
  if (filter === "A - Z") {
    _todos = todos?.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (filter === "Z - A") {
    _todos = todos?.sort((a, b) => b.title.localeCompare(a.title));
  }
  if (filter === "Belum selesai") {
    _todos = todos?.sort((a, b) => b.is_active - a.is_active);
  }

  return _todos;
};
