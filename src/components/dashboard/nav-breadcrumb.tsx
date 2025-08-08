"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export default function NavBreadcrumb() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parts.map((part, index) => {
          // Replace "-" with " " and capitalize the first letter
          part = part.replace(/-/g, " ");

          // Using map to capitalize the first letter of each part
          // and handle the case where the part is empty (e.g., leading slash)
          if (part === "") {
            return null; // Skip empty parts
          }

          const capitalizedParts = part.split(" ").map((subPart) => {
            return subPart.charAt(0).toUpperCase() + subPart.slice(1) + " ";
          });

          const isLast = index === parts.length - 1;
          if (index === 0 && part === "") {
            return null;
          }
          return (
            <div key={index} className="flex items-center">
              <BreadcrumbItem className="text-base">
                {capitalizedParts}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator className="text-foreground" />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
