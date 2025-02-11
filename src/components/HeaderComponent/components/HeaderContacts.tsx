export default function HeaderContacts() {
  return (
    <div className="justify-end header-grid-aria-contacts flex gap-x-6">
      <button className="underline text-xs uppercase decoration-1 whitespace-nowrap">
        Обратный звонок
      </button>
      <a
        href="tel:+74957909455"
        className="whitespace-nowrap text-lg font-semibold"
      >
        +7 (495) 790-94-55
      </a>
    </div>
  );
}
