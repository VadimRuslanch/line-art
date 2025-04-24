// 'use client';
//
// import { useDetailsProduct } from '@/app/features/product/details/hook/useDetailsProduct';
// import Image from 'next/image';
// import { GetDetailsProductQuery } from '@/generated/graphql';
//
// export default function ProductDetails({ slug }: { slug: string }) {
//   const { product }: { product: GetDetailsProductQuery | null } =
//     useDetailsProduct(slug);
//
//   console.log(product);
//
//   if (!product) return <p>Товар не найден</p>;
//
//   return (
//     <div className="space-y-4">
//       {/* пример вывода картинок галереи */}
//       {product.galleryImages?.nodes?.length ? (
//         <div className="flex gap-2 overflow-x-auto">
//           {product.galleryImages.nodes.map((img) => (
//             <Image
//               key={img?.id}
//               src={img?.sourceUrl ?? ''}
//               alt={img?.altText ?? ''}
//               width={300}
//               height={300}
//               className="rounded-xl"
//             />
//           ))}
//         </div>
//       ) : null}
//
//       <h1 className="text-2xl font-bold">{product.name}</h1>
//
//       {product.salePrice && (
//         <p className="text-red-600">
//           {product.salePrice} €
//           {product.regularPrice && (
//             <span className="line-through ml-2 opacity-60">
//               {product.regularPrice} €
//             </span>
//           )}
//         </p>
//       )}
//
//       <div
//         className="prose max-w-none"
//         dangerouslySetInnerHTML={{ __html: product.description ?? '' }}
//       />
//     </div>
//   );
// }
