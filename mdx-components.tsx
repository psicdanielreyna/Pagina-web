import Image from "next/image";
import Link from "next/link";

const MDXComponents = {
  img: (props: any) => (
    <Image
      {...props}
      alt={props.alt || ""}
      width={props.width || 1200}
      height={props.height || 630}
      className={"rounded-xl " + (props.className || "")}
    />
  ),
  a: (props: any) => (
    <Link href={props.href || "#"} target={props.target} rel={props.rel}>
      {props.children}
    </Link>
  ),
};

export default MDXComponents;
