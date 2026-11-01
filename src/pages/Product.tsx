import { useState } from "react";
import { getProduct, products } from "../data/products";
import { useRouter } from "../lib/router";
import { PrimaryButton } from "../components/Buttons";
import { SizePills } from "../components/SizePills";
import { waLink, productOrderText } from "../lib/whatsapp";
import { getProductImages } from "../lib/images";
import { SafeImage } from "../components/SafeImage";

function Expand({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[#E5DED3] py-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left text-sm font-medium text-[#141414] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F1F]"
        aria-expanded={open}
      >
        {title}
        <span className="text-[#6B6460]">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="mt-3 text-sm text-[#6B6460]">{children}</div>}
    </div>
  );
}

export function ProductPage({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const product = getProduct(slug);
  const [size, setSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-24 text-center">
        <p className="text-[#141414]">We couldn't find that product.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-[#7A1F1F] underline underline-offset-4"
        >
          Back to the drop
        </button>
      </div>
    );
  }

  const related = products.find((p) => p.slug === product.relatedSlug && p.slug !== product.slug);
  const gallery = getProductImages(product);

  const orderHref = waLink(productOrderText(product.name, product.color, size ?? "", product.price));

  return (
    <div className="pb-28 sm:pb-0">
      <div className="mx-auto max-w-[1200px] px-4 pt-6 sm:px-6">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="text-sm text-[#6B6460] hover:text-[#7A1F1F]"
        >
          ← The drop
        </a>
      </div>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#EFE8DB]">
            {gallery[activeImage]?.src ? (
              <SafeImage
                src={gallery[activeImage].src}
                alt={gallery[activeImage].alt}
                className="h-full w-full object-cover"
                fallbackClassName="flex h-full w-full items-center justify-center text-sm text-[#6B6460]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-[#6B6460]">
                Photo soon
              </div>
            )}
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {gallery.map((img, i) => (
              <button
                key={img.role + i}
                onClick={() => setActiveImage(i)}
                className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F1F] ${
                  activeImage === i ? "border-[#141414]" : "border-[#E5DED3]"
                }`}
                aria-label={img.alt}
              >
                {img.src ? (
                  <SafeImage
                    src={img.src}
                    alt=""
                    className="h-full w-full object-cover"
                    fallbackClassName="flex h-full w-full items-center justify-center text-[10px] text-[#6B6460]"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-[10px] text-[#6B6460]">
                    Photo soon
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#141414]">{product.name}</h1>
          <p className="mt-1 text-[#6B6460]">{product.color}</p>
          <p className="mt-3 text-xl font-medium text-[#141414]">₹{product.price}</p>

          <p className="mt-4 text-sm text-[#6B6460]">
            {product.gsm} GSM · Drop-shoulder oversized · Unisex
          </p>

          <div className="mt-6 space-y-2">
            {product.description.map((line, i) => (
              <p key={i} className="text-[#141414]">
                {line}
              </p>
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-2 text-sm font-medium text-[#141414]">Size</p>
            <SizePills sizes={product.sizes} selected={size} onSelect={setSize} />
            {!size && <p className="mt-2 text-xs text-[#6B6460]">Select a size before ordering on WhatsApp.</p>}
          </div>

          <p className="mt-5 text-sm text-[#6B6460]">Made to order · usually 2–5 days after payment</p>

          <div className="mt-6 hidden sm:block">
            <PrimaryButton
              href={!product.soldOut && size ? orderHref : undefined}
              disabled={product.soldOut || !size}
              className="w-full sm:w-auto"
            >
              {product.soldOut ? "Sold out" : size ? "Order on WhatsApp" : "Select size"}
            </PrimaryButton>
          </div>

          <div className="mt-8">
            <Expand title="Size chart">
              <p className="mb-3">
                Indian chest size in inches (40–42 ≈ L, 42–44 ≈ XL). Oversized drop-shoulder — if between sizes, size up.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#E5DED3] text-[#141414]">
                      <th className="py-2 pr-4 font-medium">Size</th>
                      <th className="py-2 font-medium">Chest (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizes.map((s) => (
                      <tr key={s} className="border-b border-[#E5DED3]/60">
                        <td className="py-2 pr-4">{s}</td>
                        <td className="py-2 text-[#6B6460]">
                          {{ S: 38, M: 40, L: 42, XL: 44, XXL: 46 }[s as "S" | "M" | "L" | "XL" | "XXL"] ?? "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Expand>
            <Expand title="Care">
              <p>Wash inside-out, cold. No iron on print. Hang dry recommended.</p>
            </Expand>
          </div>

          {related && (
            <p className="mt-8 text-sm text-[#141414]">
              Also in{" "}
              <a
                href={`#/p/${related.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/p/${related.slug}`);
                  window.scrollTo({ top: 0 });
                }}
                className="text-[#7A1F1F] underline underline-offset-4"
              >
                {related.color}
              </a>
            </p>
          )}

          <p className="mt-6 text-xs text-[#6B6460]">
            Defect or wrong item: tell us within 48 hours with a photo and we'll replace it. No
            returns on print, size choice, or custom orders.
          </p>
        </div>
      </div>

      {/* Sticky mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-[#E5DED3] bg-[#FFFCF7] px-4 py-3 sm:hidden">
        <div>
          <p className="text-xs text-[#6B6460]">{product.name}</p>
          <p className="text-base font-medium text-[#141414]">₹{product.price}</p>
        </div>
        <PrimaryButton
          href={!product.soldOut && size ? orderHref : undefined}
          disabled={product.soldOut || !size}
        >
          {product.soldOut ? "Sold out" : size ? "Order on WhatsApp" : "Select size"}
        </PrimaryButton>
      </div>
    </div>
  );
}
