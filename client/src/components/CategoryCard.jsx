function CategoryCard({ category }) {
  return (
    <div className="cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(37,99,235,0.18)] dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-[0_12px_30px_rgba(2,6,23,0.45)]">
      <img src={category.image || "https://picsum.photos/300?10"} alt={category.name} className="h-44 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-center text-lg font-semibold text-slate-900 dark:text-slate-100">{category.name}</h2>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-300">{category.description || "Fresh picks for every need"}</p>
      </div>
    </div>
  );
}

export default CategoryCard;