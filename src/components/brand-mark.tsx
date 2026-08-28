export function BrandMark({
  inverse = false,
}: {
  inverse?: boolean;
}) {
  return (
    <img
      src={inverse ? "/suchio-logo-dark.svg" : "/suchio-logo-light.svg"}
      alt="Suchio"
      width={729}
      height={223}
      className="block h-7 w-auto"
      draggable={false}
    />
  );
}
