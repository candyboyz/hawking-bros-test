import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import React from "react";
import { cn } from "@/shared/lib/utils";

const data = [
  { id: 1, name: "Главная", url: "/" },
  { id: 2, name: "О нас", url: "/" },
  { id: 3, name: "Категории", subMenu: true },
  { id: 4, name: "Контакты", url: "/" },
];

const subMenuData = [
  { id: 1, name: "Товар 1", doc_count: 11 },
  { id: 2, name: "Товар 2", doc_count: 8 },
  { id: 3, name: "Товар 3", doc_count: 64 },
  { id: 4, name: "Товар 4", doc_count: 107 },
];

type Props = {
  showCatMenu: boolean;
  setShowCatMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMenu: boolean;
};

export const Navigation: React.FC<Props> = ({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  mobileMenu,
}) => {
  return (
    <nav>
      <ul
        className={cn(
          "hidden md:flex items-center gap-8 font-medium",
          mobileMenu &&
            "flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white dark:bg-[#121212] border-t dark:border-white/[0.03]",
        )}>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            {mobileMenu ? (
              <>
                {item?.subMenu ? (
                  <li
                    className="cursor-pointer py-4 px-5 flex flex-col relative"
                    onClick={() => setShowCatMenu((prev) => !prev)}>
                    <div className="flex gap-1 justify-center items-center">
                      {item.name}
                      <BsChevronDown className="text-[14px]" />
                    </div>

                    {showCatMenu && (
                      <ul className="-mx-5 mt-4 -mb-4">
                        {subMenuData.map((category) => {
                          return (
                            <Link
                              key={category?.id}
                              href="/"
                              onClick={() => {
                                setShowCatMenu(false);
                                setMobileMenu(false);
                              }}>
                              <li className="py-4 px-8 flex justify-between">
                                {category.name}
                                <span className="opacity-50 text-sm">
                                  {`(${category.doc_count})`}
                                </span>
                              </li>
                            </Link>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li className="py-4 px-5">
                    <Link href="/" onClick={() => setMobileMenu(false)}>
                      {item.name}
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <>
                {item?.subMenu ? (
                  <li
                    className="cursor-pointer flex items-center gap-2 relative"
                    onMouseEnter={() => setShowCatMenu(true)}
                    onMouseLeave={() => setShowCatMenu(false)}>
                    <div className="flex gap-1 items-center">
                      {item.name}
                      <BsChevronDown className="text-[14px]" />
                    </div>

                    {showCatMenu && (
                      <ul
                        className={cn(
                          "absolute top-6 left-0 min-w-[250px] p-1 dark:bg-[#1e1e1e] bg-[#f2f2f2] rounded-md shadow-lg",
                          mobileMenu && " -mx-5 mt-4 -mb-4",
                        )}>
                        {subMenuData?.map((category) => {
                          return (
                            <Link
                              key={category.id}
                              href="/"
                              onClick={() => setShowCatMenu(false)}>
                              <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                                {category.name}
                                <span className="opacity-50 text-sm">
                                  {`(${category.doc_count})`}
                                </span>
                              </li>
                            </Link>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li>
                    <Link href={item.url || "/"}>{item.name}</Link>
                  </li>
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};
