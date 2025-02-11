import IconSearch from '@/shared/assets/svg/search.svg';

export default function HeaderSearch() {
  return (
    <div className="header-grid-aria-search">
      <label className="bg-white px-4 py-3.5 flex rounded-lg w-11/12">
        <input
          className="w-full bg-white"
          type="search"
          placeholder="Найти что-нибудь..."
        />
        <IconSearch className="min-w-5" />
      </label>
    </div>
  );
}

// "nodes": [
//     {
//         "id": "cG9zdDoyOA==",
//         "title": "main",
//         "uri": "/"
//     },
//     {
//         "id": "cG9zdDoxMA==",
//         "title": "Мой аккаунт",
//         "uri": "/my-account/"
//     },
//     {
//         "id": "cG9zdDo5",
//         "title": "Оформление заказа",
//         "uri": "/checkout/"
//     },
//     {
//         "id": "cG9zdDo4",
//         "title": "Корзина",
//         "uri": "/cart/"
//     },
//     {
//         "id": "cG9zdDo3",
//         "title": "Магазин",
//         "uri": "/shop/"
//     },
//     {
//         "id": "cG9zdDoy",
//         "title": "Пример страницы",
//         "uri": "/sample-page/"
//     }
// ]
