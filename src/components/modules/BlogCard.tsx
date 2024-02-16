import Image from "next/image";
import { Blog } from "@/types/Blogs";
import { BlogLink } from "./BlogLink";

export const BlogCard = ({ image, title, description, author, _id }: Blog) => {
  return (
    <div className="mx-auto  h-full min-h-[372px] w-4/5 max-w-[350px] md:w-full">
      <BlogLink id={_id}>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[30px]">
          <Image
            src={image}
            alt={title}
            height={370}
            width={300}
            className="object-contian h-full w-full"
          />
          {/* <div className="absolute bottom-5 left-1/2 flex w-full max-w-[170px] -translate-x-1/2 items-center justify-center gap-2.5 rounded-[20px] bg-white px-4 py-2.5">
            <Image
              src={"/logos/avatar/kunalsingh.webp"}
              alt={author}
              width={30}
              height={30}
              className="h-[30px] w-[30px] rounded-full object-cover"
            />
            <p className="w-full font-semibold text-primary">{author}</p>
          </div> */}
        </div>
        <div className="bg- red-400 mt-11 flex flex-col gap-6 md:h-[304px] md:justify-between md:gap-0">
          <h3
            className="font-blod text-xl leading-8 tracking-wide"
            style={{
              fontWeight: 600,
            }}
          >
            {title.length > 60 ? `${title.slice(0, 60)}...` : title}
          </h3>
          <p className="font-medium leading-6 text-[#9E9E9E]">
            {description.length > 123
              ? `${description.slice(0, 123)}...`
              : description}
          </p>
          <div className="w-full rounded-[20px] border border-[#0F937C] bg-transparent px-5 py-[14px]">
            <p className="text-center">Read More</p>
          </div>
        </div>
      </BlogLink>
    </div>
  );
};
